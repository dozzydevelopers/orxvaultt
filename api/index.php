<?php
require_once __DIR__ . '/utils.php';
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$path = $_SERVER['REQUEST_URI'] ?? '/api';

// Normalize to path after /api
$prefixPos = strpos($path, '/api');
$sub = $prefixPos !== false ? substr($path, $prefixPos + 4) : $path; // starts with e.g. /users
$sub = strtok($sub, '?') ?: '/';

// Helper: simple JWT (HS256)
function jwt_sign(array $payload): string {
    $header = ['alg' => 'HS256', 'typ' => 'JWT'];
    $segments = [];
    $segments[] = rtrim(strtr(base64_encode(json_encode($header)), '+/', '-_'), '=');
    $segments[] = rtrim(strtr(base64_encode(json_encode($payload)), '+/', '-_'), '=');
    $signing_input = implode('.', $segments);
    $signature = hash_hmac('sha256', $signing_input, JWT_SECRET, true);
    $segments[] = rtrim(strtr(base64_encode($signature), '+/', '-_'), '=');
    return implode('.', $segments);
}

function jwt_verify(string $jwt): ?array {
    $parts = explode('.', $jwt);
    if (count($parts) !== 3) return null;
    [$h64, $p64, $s64] = $parts;
    $sig = base64_decode(strtr($s64, '-_', '+/'));
    $valid = hash_hmac('sha256', $h64 . '.' . $p64, JWT_SECRET, true);
    if (!hash_equals($valid, $sig)) return null;
    $payload = json_decode(base64_decode(strtr($p64, '-_', '+/')), true);
    if (!is_array($payload)) return null;
    if (isset($payload['exp']) && time() > (int)$payload['exp']) return null;
    return $payload;
}

function current_user(): ?array {
    $token = bearer_token();
    if (!$token) return null;
    $payload = jwt_verify($token);
    if (!$payload || empty($payload['sub'])) return null;
    $stmt = db()->prepare('SELECT id, email, username, wallet_address AS walletAddress, role, avatar_url AS avatarUrl, bio, is_verified AS isVerified FROM users WHERE id = ? LIMIT 1');
    $stmt->execute([$payload['sub']]);
    $user = $stmt->fetch();
    return $user ?: null;
}

switch (true) {
    // Auth endpoints (mock)
    case $sub === '/auth/login' && $method === 'POST':
        $body = read_body_json();
        $email = strtolower(trim($body['email'] ?? ''));
        $password = (string)($body['password'] ?? '');
        if (!$email || !$password) bad_request('Email and password required');
        $stmt = db()->prepare('SELECT id, email, username, password_hash, wallet_address AS walletAddress, role, avatar_url AS avatarUrl, bio, is_verified AS isVerified FROM users WHERE email = ? LIMIT 1');
        $stmt->execute([$email]);
        $u = $stmt->fetch();
        if (!$u || empty($u['password_hash']) || !password_verify($password, $u['password_hash'])) {
            bad_request('Invalid credentials');
        }
        if ((int)$u['isVerified'] !== 1) {
            send_json(['error' => 'email_not_verified', 'message' => 'Please verify your email address.'], 403);
        }
        unset($u['password_hash']);
        $payload = ['sub' => $u['id'], 'iat' => time(), 'exp' => time() + 60 * 60 * 24 * 7];
        $token = jwt_sign($payload);
        send_json(['token' => $token, 'user' => $u]);
        break;

    case $sub === '/auth/signup' && $method === 'POST':
        $body = read_body_json();
        $email = strtolower(trim($body['email'] ?? ''));
        $username = trim($body['username'] ?? '');
        $password = (string)($body['password'] ?? '');
        if (!$email || !$username || !$password) bad_request('username, email and password required');
        $id = strtolower(bin2hex(random_bytes(8)));
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = db()->prepare('INSERT INTO users (id, email, username, password_hash, role, is_verified) VALUES (?, ?, ?, ?, ?, 0)');
        try {
            $stmt->execute([$id, $email, $username, $hash, 'User']);
        } catch (Throwable $e) {
            bad_request('Email already exists');
        }
        // Create verification token
        $token = bin2hex(random_bytes(24));
        $vs = db()->prepare('INSERT INTO verification_tokens (user_id, token, created_at) VALUES (?, ?, NOW())');
        $vs->execute([$id, $token]);
        // TODO: send email with APP_URL . '/verify-email?token=' . $token
        send_json(['success' => true, 'message' => 'Signup successful. Please verify your email.']);
        break;

    case $sub === '/auth/me' && $method === 'GET':
        $u = current_user();
        if (!$u) bad_request('Invalid or missing token');
        send_json(['user' => $u]);
        break;

    case $sub === '/auth/verify-email' && $method === 'POST':
        $body = read_body_json();
        $token = (string)($body['token'] ?? '');
        if (!$token) bad_request('Token required');
        $vs = db()->prepare('SELECT user_id FROM verification_tokens WHERE token = ? LIMIT 1');
        $vs->execute([$token]);
        $row = $vs->fetch();
        if (!$row) bad_request('Invalid token');
        db()->prepare('UPDATE users SET is_verified = 1 WHERE id = ?')->execute([$row['user_id']]);
        db()->prepare('DELETE FROM verification_tokens WHERE token = ?')->execute([$token]);
        send_json(['success' => true, 'message' => 'Email verified.']);
        break;

    case $sub === '/auth/resend-verification' && $method === 'POST':
        $body = read_body_json();
        $email = strtolower(trim($body['email'] ?? ''));
        if (!$email) bad_request('Email required');
        $u = db()->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
        $u->execute([$email]);
        $row = $u->fetch();
        if (!$row) bad_request('User not found');
        $token = bin2hex(random_bytes(24));
        db()->prepare('INSERT INTO verification_tokens (user_id, token, created_at) VALUES (?, ?, NOW())')->execute([$row['id'], $token]);
        // TODO: send email with APP_URL . '/verify-email?token=' . $token
        send_json(['success' => true, 'message' => 'Verification email sent.']);
        break;

    // Users endpoints
    case $sub === '/users' && $method === 'GET':
        $rows = db()->query('SELECT id, email, username, wallet_address AS walletAddress, role, avatar_url AS avatarUrl, bio, is_verified AS isVerified FROM users ORDER BY id DESC')->fetchAll();
        send_json($rows);
        break;

    case $sub === '/users' && $method === 'POST':
        $body = read_body_json();
        $id = $body['id'] ?? strtolower(bin2hex(random_bytes(8)));
        $email = $body['email'] ?? null;
        $username = $body['username'] ?? '';
        $role = $body['role'] ?? 'User';
        $stmt = db()->prepare('INSERT INTO users (id, email, username, role, is_verified) VALUES (?, ?, ?, ?, 1)');
        $stmt->execute([$id, $email, $username, $role]);
        $row = db()->prepare('SELECT id, email, username, wallet_address AS walletAddress, role, avatar_url AS avatarUrl, bio, is_verified AS isVerified FROM users WHERE id = ?');
        $row->execute([$id]);
        send_json($row->fetch(), 201);
        break;

    case preg_match('#^/users/([^/]+)$#', $sub, $m) && $method === 'GET':
        $id = strtolower($m[1]);
        $stmt = db()->prepare('SELECT id, email, username, wallet_address AS walletAddress, role, avatar_url AS avatarUrl, bio, is_verified AS isVerified FROM users WHERE id = ? LIMIT 1');
        $stmt->execute([$id]);
        $user = $stmt->fetch();
        if (!$user) not_found('User not found');
        send_json($user);
        break;

    case preg_match('#^/users/([^/]+)$#', $sub, $m) && $method === 'PUT':
        $id = strtolower($m[1]);
        $body = read_body_json();
        $fields = ['email', 'username', 'wallet_address', 'role', 'avatar_url', 'bio'];
        $set = [];$vals=[];
        foreach ($fields as $f) if (isset($body[$f])) { $set[] = "$f = ?"; $vals[] = $body[$f]; }
        if (!$set) bad_request('No changes');
        $vals[] = $id;
        db()->prepare('UPDATE users SET ' . implode(',', $set) . ' WHERE id = ?')->execute($vals);
        $stmt = db()->prepare('SELECT id, email, username, wallet_address AS walletAddress, role, avatar_url AS avatarUrl, bio, is_verified AS isVerified FROM users WHERE id = ?');
        $stmt->execute([$id]);
        send_json($stmt->fetch());
        break;

    case preg_match('#^/users/([^/]+)$#', $sub, $m) && $method === 'DELETE':
        $id = strtolower($m[1]);
        db()->prepare('DELETE FROM users WHERE id = ?')->execute([$id]);
        send_json(['success' => true]);
        break;

    case $sub === '/users/link-wallet' && $method === 'POST':
        $u = current_user();
        if (!$u) bad_request('Invalid or missing token');
        $body = read_body_json();
        $wallet = $body['walletAddress'] ?? '';
        if (!$wallet) bad_request('walletAddress required');
        db()->prepare('UPDATE users SET wallet_address = ? WHERE id = ?')->execute([$wallet, $u['id']]);
        $stmt = db()->prepare('SELECT id, email, username, wallet_address AS walletAddress, role, avatar_url AS avatarUrl, bio, is_verified AS isVerified FROM users WHERE id = ?');
        $stmt->execute([$u['id']]);
        send_json(['user' => $stmt->fetch()]);
        break;

    // Categories
    case $sub === '/categories' && $method === 'GET':
        $rows = db()->query('SELECT name, image_url AS imageUrl FROM categories ORDER BY name')->fetchAll();
        send_json($rows);
        break;

    // Collections
    case $sub === '/collections' && $method === 'GET':
        $rows = db()->query('SELECT id, name, description, creator, cover_image_url AS coverImageUrl, item_count AS itemCount, is_featured AS isFeatured FROM collections ORDER BY id DESC')->fetchAll();
        send_json($rows);
        break;

    case $sub === '/collections' && $method === 'POST':
        $body = read_body_json();
        $id = $body['id'] ?? strtolower(bin2hex(random_bytes(8)));
        $stmt = db()->prepare('INSERT INTO collections (id, name, description, creator, cover_image_url, item_count, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([$id, $body['name'] ?? '', $body['description'] ?? '', $body['creator'] ?? '', $body['coverImageUrl'] ?? '', (int)($body['itemCount'] ?? 0), (int)($body['isFeatured'] ?? 0)]);
        $row = db()->prepare('SELECT id, name, description, creator, cover_image_url AS coverImageUrl, item_count AS itemCount, is_featured AS isFeatured FROM collections WHERE id = ?');
        $row->execute([$id]);
        send_json($row->fetch(), 201);
        break;

    // NFTs
    case $sub === '/nfts' && $method === 'GET':
        $rows = db()->query('SELECT id, token_id AS tokenId, nft_contract AS nftContract, name, creator, owner, price_eth AS priceEth, price_usd AS priceUsd, image_url AS imageUrl, category, is_verified AS isVerified, description, created_at AS createdAt, collection_id AS collectionId, is_auction AS isAuction, auction_end AS auctionEnd, current_bid_eth AS currentBidEth, token_uri AS tokenURI FROM nfts ORDER BY created_at DESC')->fetchAll();
        send_json($rows);
        break;

    case $sub === '/nfts' && $method === 'POST':
        $u = current_user();
        if (!$u) bad_request('Invalid or missing token');
        $b = read_body_json();
        $id = $b['itemId'] ?? $b['id'] ?? strtolower(bin2hex(random_bytes(8)));
        $stmt = db()->prepare('INSERT INTO nfts (id, token_id, nft_contract, name, creator, owner, price_eth, price_usd, image_url, category, is_verified, description, created_at, collection_id, is_auction, auction_end, current_bid_eth, token_uri) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?)');
        $stmt->execute([
            $id,
            $b['tokenId'] ?? null,
            $b['nftContract'] ?? null,
            $b['name'] ?? '',
            $b['creatorAddress'] ?? $b['creator'] ?? '',
            $b['ownerAddress'] ?? $b['owner'] ?? '',
            (float)($b['priceEth'] ?? 0),
            (float)($b['priceUsd'] ?? 0),
            $b['imageUrl'] ?? '',
            $b['category'] ?? '',
            (int)($b['isVerified'] ?? 0),
            $b['description'] ?? '',
            $b['collectionId'] ?? null,
            (int)($b['isAuction'] ?? 0),
            $b['auctionEnd'] ?? null,
            isset($b['currentBidEth']) ? (float)$b['currentBidEth'] : null,
            $b['tokenURI'] ?? null,
        ]);
        send_json(['success' => true, 'id' => $id]);
        break;

    case $sub === '/nfts/purchase' && $method === 'POST':
        $u = current_user();
        if (!$u) bad_request('Invalid or missing token');
        $b = read_body_json();
        $itemId = $b['itemId'] ?? $b['id'] ?? '';
        $buyer = $b['buyerAddress'] ?? '';
        if (!$itemId || !$buyer) bad_request('itemId and buyerAddress required');
        db()->prepare('UPDATE nfts SET owner = ? WHERE id = ?')->execute([$buyer, $itemId]);
        send_json(['success' => true]);
        break;

    case preg_match('#^/nfts/([^/]+)$#', $sub, $m) && $method === 'PUT':
        $u = current_user();
        if (!$u) bad_request('Invalid or missing token');
        $id = strtolower($m[1]);
        $b = read_body_json();
        $map = [
            'name'=>'name','priceEth'=>'price_eth','priceUsd'=>'price_usd','imageUrl'=>'image_url','category'=>'category','isVerified'=>'is_verified','description'=>'description','collectionId'=>'collection_id','isAuction'=>'is_auction','auctionEnd'=>'auction_end','currentBidEth'=>'current_bid_eth'
        ];
        $set=[];$vals=[];
        foreach ($map as $in=>$col) if (isset($b[$in])) { $set[] = "$col = ?"; $vals[] = $b[$in]; }
        if (!$set) bad_request('No changes');
        $vals[] = $id;
        db()->prepare('UPDATE nfts SET ' . implode(',', $set) . ' WHERE id = ?')->execute($vals);
        $stmt = db()->prepare('SELECT id, token_id AS tokenId, nft_contract AS nftContract, name, creator, owner, price_eth AS priceEth, price_usd AS priceUsd, image_url AS imageUrl, category, is_verified AS isVerified, description, created_at AS createdAt, collection_id AS collectionId, is_auction AS isAuction, auction_end AS auctionEnd, current_bid_eth AS currentBidEth, token_uri AS tokenURI FROM nfts WHERE id = ?');
        $stmt->execute([$id]);
        send_json($stmt->fetch());
        break;

    case preg_match('#^/nfts/([^/]+)$#', $sub, $m) && $method === 'DELETE':
        $u = current_user();
        if (!$u) bad_request('Invalid or missing token');
        $id = strtolower($m[1]);
        db()->prepare('DELETE FROM nfts WHERE id = ?')->execute([$id]);
        send_json(['success' => true]);
        break;

    default:
        not_found('Endpoint not found');
}
