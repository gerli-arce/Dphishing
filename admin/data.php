<?php 
$data = file_get_contents('../usernames.json');

$array = json_decode($data, true);

header('Content-type: application/json');

echo $data;
?>