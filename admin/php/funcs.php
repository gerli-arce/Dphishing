<?php

function findRegisters()
{
    $res = [];
    $array = array_slice(scandir('../../fished/'), 2);

    foreach ($array as $key => $value) {
        $array[$key] = str_replace('.txt', '', $value);
    }

    $res['status'] = 200;
    $res['message'] = 'Los registros han sido listados por fechas';
    $res['data'] = $array;
    
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
    default:
        $response = nofunction();
        break;
}

header('Content-type: application/json');
echo json_encode($response, JSON_PRETTY_PRINT);
