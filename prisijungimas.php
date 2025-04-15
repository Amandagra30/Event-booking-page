<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Test";
//duomenų bazės pavadinimas

$conn = new mysqli($servername,$username,$password,$dbname);
if ($conn->connect_error) {
    die("Nepavyko prisijungti prie duomenų bazės:" .$conn->connect_error);
}
echo "Prisijungimas sėkmingas!";
?>