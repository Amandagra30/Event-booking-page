<?php
require_once 'Klientas.php';

$data = json_decode(file_get_contents("php://input"), true);

$klientas = new Klientas(
    $data['vardas'],
    $data['el_pastas'],
    $data['data']
);

if ($klientas->saugoti()) {
    echo "Rezervacija pavyko!";
} else {
    echo "Klaida registruojant klientą.";
}
?>