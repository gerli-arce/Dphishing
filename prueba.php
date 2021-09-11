<?php

function dataxfile($fileName) {
    $res = [];
    $filePath = $fileName;
    if(file_exists($filePath)) {
        $data = file_get_contents($filePath);
        $array = explode('----', $data);
        foreach ($array as $key => $value) {
            $array[$key] = json_decode($value, true);
        }
        array_pop($array);
        
        $res['status'] = 200;
        $res['message'] = count($array) . ' usuario(s) listado(s)';
        $res['data'] = $array;
    } else {
        $res['status'] = 400;
        $res['message'] = 'No existen resgitros en ' . $fileName;
        $res['data'] = [];
    }
    return $res;
}

header('Content-type: application/json');
echo json_encode(dataxfile('usernames'), JSON_PRETTY_PRINT);
?>