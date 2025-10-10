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

    // NFTs
    case $sub === '/nfts' && $method === 'GET':
        send_json(read_json_file('nfts'));
        break;

    case $sub === '/nfts' && $method === 'POST':
        if (!bearer_token()) bad_request('Missing token');
        $body = read_body_json();
        $nfts = read_json_file('nfts');
        $nfts[] = $body;
        write_json_file('nfts', $nfts);
        send_json(['success' => true]);
        break;

    case $sub === '/nfts/purchase' && $method === 'POST':
        if (!bearer_token()) bad_request('Missing token');
        // In a real backend, ownership transfer would be validated on-chain
        send_json(['success' => true]);
        break;

    default:
        not_found('Endpoint not found');
}
