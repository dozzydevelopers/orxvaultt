<?php
// Basic JSON API helpers and JSON file storage utilities

function send_json($data, int $status = 200, array $extraHeaders = []): void {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
    foreach ($extraHeaders as $h) header($h);
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
    exit;
}

function read_body_json(): array {
    $raw = file_get_contents('php://input');
    if (!$raw) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

// JSON storage (fallback) — keep for portability, but real DB is preferred
function storage_path(string $name): string {
    $map = [
        'users' => __DIR__ . '/../users.json',
        'nfts' => __DIR__ . '/../nfts.json',
        'categories' => __DIR__ . '/../categories.json',
        'collections' => __DIR__ . '/../collections.json',
    ];
    return $map[$name] ?? __DIR__ . '/../' . basename($name) . '.json';
}

function read_json_file(string $name): array {
    $path = storage_path($name);
    if (!file_exists($path)) return [];
    $content = trim((string) @file_get_contents($path));
    if ($content === '' || $content === 'File is empty.') return [];
    $decoded = json_decode($content, true);
    return is_array($decoded) ? $decoded : [];
}

function write_json_file(string $name, array $data): bool {
    $path = storage_path($name);
    $dir = dirname($path);
    if (!is_dir($dir)) @mkdir($dir, 0777, true);
    $tmp = $path . '.tmp';
    $json = json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    if ($json === false) return false;
    $fp = fopen($tmp, 'c+');
    if ($fp) {
        if (flock($fp, LOCK_EX)) {
            ftruncate($fp, 0);
            fwrite($fp, $json);
            fflush($fp);
            flock($fp, LOCK_UN);
        }
        fclose($fp);
    } else {
        file_put_contents($tmp, $json);
    }
    return @rename($tmp, $path);
}

function bearer_token(): ?string {
    $h = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (stripos($h, 'Bearer ') === 0) {
        return trim(substr($h, 7));
    }
    return null;
}

function not_found(string $msg = 'Not found'): void { send_json(['message' => $msg], 404); }
function bad_request(string $msg = 'Bad request'): void { send_json(['message' => $msg], 400); }
function method_not_allowed(): void { send_json(['message' => 'Method not allowed'], 405, ['Allow: GET, POST, OPTIONS']); }

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    send_json(['ok' => true], 200);
}

function generate_id(string $prefix = ''): string {
    $uniq = bin2hex(random_bytes(8));
    return $prefix ? ($prefix . '_' . $uniq) : $uniq;
}

function array_find_index_by_id(array $items, string $id): int {
    foreach ($items as $i => $it) {
        if (isset($it['id']) && strtolower($it['id']) === strtolower($id)) return $i;
    }
    return -1;
}
