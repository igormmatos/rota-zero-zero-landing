<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

$contentLength = isset($_SERVER['CONTENT_LENGTH']) ? (int) $_SERVER['CONTENT_LENGTH'] : 0;
if ($contentLength > 4096) {
    http_response_code(413);
    echo json_encode(['ok' => false, 'error' => 'payload_too_large']);
    exit;
}

$raw = file_get_contents('php://input');
if ($raw === false || $raw === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'empty_payload']);
    exit;
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_json']);
    exit;
}

// Honeypot: bots que preenchem o campo oculto recebem sucesso silencioso e não são gravados.
if (!empty($data['website'])) {
    http_response_code(204);
    exit;
}

$allowedEvents = ['result_viewed', 'feedback_submitted', 'roadmap_clicked'];
$allowedStages = ['00', '01', '02', '03'];
$allowedDecisions = ['EXPLORE_FIRST', 'REDUCE_PROJECT', 'STRUCTURE_PROJECT', 'SUGGEST_ROUTE'];
$allowedRoutes = ['web', 'automation', 'games', 'apps', 'ai_data', 'open_exploration'];

$event = isset($data['event']) && is_string($data['event']) ? $data['event'] : '';
$runId = isset($data['runId']) && is_string($data['runId']) ? $data['runId'] : '';
$algorithmVersion = isset($data['algorithmVersion']) && is_string($data['algorithmVersion']) ? $data['algorithmVersion'] : '';
$learningStage = isset($data['learningStage']) && is_string($data['learningStage']) ? $data['learningStage'] : '';
$routeDecision = isset($data['routeDecision']) && is_string($data['routeDecision']) ? $data['routeDecision'] : '';
$routeSuggestion = $data['routeSuggestion'] ?? null;

if (!in_array($event, $allowedEvents, true)
    || !preg_match('/^[A-Za-z0-9_-]{8,64}$/', $runId)
    || !preg_match('/^[A-Za-z0-9._-]{3,48}$/', $algorithmVersion)
    || !in_array($learningStage, $allowedStages, true)
    || !in_array($routeDecision, $allowedDecisions, true)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'invalid_event']);
    exit;
}

if ($routeSuggestion !== null && (!is_string($routeSuggestion) || !in_array($routeSuggestion, $allowedRoutes, true))) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'invalid_route']);
    exit;
}

$record = [
    'schemaVersion' => '1',
    'serverTimestamp' => gmdate('c'),
    'event' => $event,
    'runId' => $runId,
    'algorithmVersion' => $algorithmVersion,
    'learningStage' => $learningStage,
    'routeDecision' => $routeDecision,
    'routeSuggestion' => $routeSuggestion,
];

if ($event === 'feedback_submitted') {
    $score = $data['score'] ?? null;
    if (!is_int($score) || $score < 0 || $score > 10) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'invalid_score']);
        exit;
    }

    $comment = isset($data['comment']) && is_string($data['comment']) ? trim($data['comment']) : '';
    $charCount = preg_match_all('/./us', $comment, $characters);
    if ($charCount !== false && $charCount > 800) {
        $comment = implode('', array_slice($characters[0], 0, 800));
    }
    $comment = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $comment) ?? '';

    $record['score'] = $score;
    $record['comment'] = $comment;
}

$documentRoot = isset($_SERVER['DOCUMENT_ROOT']) ? rtrim((string) $_SERVER['DOCUMENT_ROOT'], DIRECTORY_SEPARATOR) : '';
$baseDir = $documentRoot !== '' ? dirname($documentRoot) : dirname(__DIR__, 2);
$storageDir = $baseDir . DIRECTORY_SEPARATOR . 'r00-private-data';

if (!is_dir($storageDir) && !@mkdir($storageDir, 0700, true) && !is_dir($storageDir)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'storage_unavailable']);
    exit;
}

$filePath = $storageDir . DIRECTORY_SEPARATOR . 'diagnostico-feedback.jsonl';
$line = json_encode($record, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
if ($line === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'encode_failed']);
    exit;
}

$handle = @fopen($filePath, 'ab');
if ($handle === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'storage_unavailable']);
    exit;
}

$written = false;
if (flock($handle, LOCK_EX)) {
    $written = fwrite($handle, $line . PHP_EOL) !== false;
    fflush($handle);
    flock($handle, LOCK_UN);
}
fclose($handle);

if (!$written) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'write_failed']);
    exit;
}

@chmod($filePath, 0600);
http_response_code(204);
