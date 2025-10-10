<?php
require_once __DIR__ . '/utils.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$path = $_SERVER['REQUEST_URI'] ?? '/api';

// Normalize to path after /api
$prefixPos = strpos($path, '/api');
$sub = $prefixPos !== false ? substr($path, $prefixPos + 4) : $path; // starts with e.g. /users
$sub = strtok($sub, '?') ?: '/';

switch (true) {
    // Auth endpoints (mock)
    case $sub === '/auth/login' && $method === 'POST':
        $body = read_body_json();
        $users = read_json_file('users');
        $user = $users[0] ?? null;
        if (!$user) { bad_request('No users available.'); }
        send_json(['token' => 'mock-token-' . time(), 'user' => $user]);
        break;

    case $sub === '/auth/signup' && $method === 'POST':
        send_json(['success' => true, 'message' => 'Signup successful. Please verify your email.']);
        break;

    case $sub === '/auth/me' && $method === 'GET':
        if (!bearer_token()) bad_request('Missing token');
        $users = read_json_file('users');
        $user = $users[0] ?? null;
        if (!$user) { bad_request('No users'); }
        send_json(['user' => $user]);
        break;

    case $sub === '/auth/verify-email' && $method === 'POST':
        send_json(['success' => true, 'message' => 'Email verified.']);
        break;

    case $sub === '/auth/resend-verification' && $method === 'POST':
        send_json(['success' => true, 'message' => 'Verification email sent.']);
        break;

    // Users endpoints
    case $sub === '/users' && $method === 'GET':
        send_json(read_json_file('users'));
        break;

    case $sub === '/users' && $method === 'POST':
        $body = read_body_json();
        if (!isset($body['id'])) $body['id'] = generate_id('user');
        $users = read_json_file('users');
        $users[] = $body;
        write_json_file('users', $users);
        send_json($body, 201);
        break;

    case preg_match('#^/users/([^/]+)$#', $sub, $m) && $method === 'GET':
        $id = strtolower($m[1]);
        $users = read_json_file('users');
        foreach ($users as $u) {
            if (strtolower($u['id'] ?? '') === $id) {
                send_json($u);
            }
        }
        not_found('User not found');
        break;

    case preg_match('#^/users/([^/]+)$#', $sub, $m) && $method === 'PUT':
        $id = strtolower($m[1]);
        $body = read_body_json();
        $users = read_json_file('users');
        $idx = array_find_index_by_id($users, $id);
        if ($idx < 0) not_found('User not found');
        $users[$idx] = array_merge($users[$idx], $body);
        write_json_file('users', $users);
        send_json($users[$idx]);
        break;

    case preg_match('#^/users/([^/]+)$#', $sub, $m) && $method === 'DELETE':
        $id = strtolower($m[1]);
        $users = read_json_file('users');
        $idx = array_find_index_by_id($users, $id);
        if ($idx < 0) not_found('User not found');
        array_splice($users, $idx, 1);
        write_json_file('users', $users);
        send_json(['success' => true]);
        break;

    case $sub === '/users/link-wallet' && $method === 'POST':
        if (!bearer_token()) bad_request('Missing token');
        $body = read_body_json();
        $wallet = $body['walletAddress'] ?? '';
        if (!$wallet) bad_request('walletAddress required');
        $users = read_json_file('users');
        if (!$users) bad_request('No users');
        $users[0]['walletAddress'] = $wallet;
        write_json_file('users', $users);
        send_json(['user' => $users[0]]);
        break;

    // Categories
    case $sub === '/categories' && $method === 'GET':
        send_json(read_json_file('categories'));
        break;

    // Collections
    case $sub === '/collections' && $method === 'GET':
        send_json(read_json_file('collections'));
        break;

    case $sub === '/collections' && $method === 'POST':
        $body = read_body_json();
        if (!isset($body['id'])) $body['id'] = generate_id('col');
        $cols = read_json_file('collections');
        $cols[] = $body;
        write_json_file('collections', $cols);
        send_json($body, 201);
        break;

    // NFTs
    case $sub === '/nfts' && $method === 'GET':
        send_json(read_json_file('nfts'));
        break;

    case $sub === '/nfts' && $method === 'POST':
        if (!bearer_token()) bad_request('Missing token');
        $body = read_body_json();
        $nfts = read_json_file('nfts');
        if (!isset($body['id'])) $body['id'] = generate_id('item');
        $nfts[] = $body;
        write_json_file('nfts', $nfts);
        send_json(['success' => true]);
        break;

    case $sub === '/nfts/purchase' && $method === 'POST':
        if (!bearer_token()) bad_request('Missing token');
        // In a real backend, ownership transfer would be validated on-chain
        send_json(['success' => true]);
        break;

    case preg_match('#^/nfts/([^/]+)$#', $sub, $m) && $method === 'PUT':
        if (!bearer_token()) bad_request('Missing token');
        $id = strtolower($m[1]);
        $body = read_body_json();
        $nfts = read_json_file('nfts');
        $idx = array_find_index_by_id($nfts, $id);
        if ($idx < 0) not_found('NFT not found');
        $nfts[$idx] = array_merge($nfts[$idx], $body);
        write_json_file('nfts', $nfts);
        send_json($nfts[$idx]);
        break;

    case preg_match('#^/nfts/([^/]+)$#', $sub, $m) && $method === 'DELETE':
        if (!bearer_token()) bad_request('Missing token');
        $id = strtolower($m[1]);
        $nfts = read_json_file('nfts');
        $idx = array_find_index_by_id($nfts, $id);
        if ($idx < 0) not_found('NFT not found');
        array_splice($nfts, $idx, 1);
        write_json_file('nfts', $nfts);
        send_json(['success' => true]);
        break;

    default:
        not_found('Endpoint not found');
}
