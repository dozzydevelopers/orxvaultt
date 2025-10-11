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

// Email sending helper - uses SMTP if configured, else mail()
function send_email(string $to, string $subject, string $html, string $fromEmail, string $fromName): bool {
    // If SMTP_HOST constant is defined and non-empty, attempt raw SMTP
    if (defined('SMTP_HOST') && SMTP_HOST) {
        $host = SMTP_HOST;
        $port = defined('SMTP_PORT') ? SMTP_PORT : 587;
        $secure = defined('SMTP_SECURE') ? strtolower(SMTP_SECURE) : 'tls';
        $user = defined('SMTP_USER') ? SMTP_USER : '';
        $pass = defined('SMTP_PASS') ? SMTP_PASS : '';

        $transport = ($secure === 'ssl') ? 'ssl://' . $host : $host;
        $fp = @stream_socket_client($transport . ':' . $port, $errno, $errstr, 15, STREAM_CLIENT_CONNECT);
        if (!$fp) return false;
        stream_set_timeout($fp, 15);
        $read = function() use ($fp) { return fgets($fp, 515); };
        $write = function($cmd) use ($fp) { fwrite($fp, $cmd . "\r\n"); };

        $read();
        $write('EHLO orxvault'); $read();
        if ($secure === 'tls') { $write('STARTTLS'); $read(); stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT); $write('EHLO orxvault'); $read(); }
        if ($user && $pass) {
            $write('AUTH LOGIN'); $read();
            $write(base64_encode($user)); $read();
            $write(base64_encode($pass)); $read();
        }
        $write('MAIL FROM: <' . $fromEmail . '>'); $read();
        $write('RCPT TO: <' . $to . '>'); $read();
        $write('DATA'); $read();
        $headers = [];
        $headers[] = 'From: ' . $fromName . ' <' . $fromEmail . '>';
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-Type: text/html; charset=UTF-8';
        $message = 'Subject: ' . $subject . "\r\n" . implode("\r\n", $headers) . "\r\n\r\n" . $html . "\r\n.";
        $write($message); $read();
        $write('QUIT');
        fclose($fp);
        return true;
    }

    // Fallback to PHP mail()
    $headers = "MIME-Version: 1.0\r\nContent-type:text/html;charset=UTF-8\r\nFrom: " . $fromName . " <" . $fromEmail . ">\r\n";
    return @mail($to, $subject, $html, $headers);
}
