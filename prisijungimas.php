<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mano_projektas"; // ← Pakeisk į savo tikrą DB pavadinimą

$conn = new mysqli($servername, $username, $password, $dbname);

// Tikrinam prisijungimą
// if ($conn->connect_error) {
//     die("Prisijungimo klaida: " . $conn->connect_error);
// }

// Gaunam duomenis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $vardas = $_POST['vardas'] ?? '';
    $el_pastas = $_POST['el_pastas'] ?? '';
    $zinute = $_POST['zinute'] ?? '';

    if ($vardas && $el_pastas && $zinute) {
        $sql = "INSERT INTO klientai(vardas, el_pastas, zinute) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        if ($stmt) {
            $stmt->bind_param("sss", $vardas, $el_pastas, $zinute);
            $stmt->execute();
            echo "Duomenys sėkmingai išsaugoti!";
            $stmt->close();
        } else {
            echo "Klaida ruošiant SQL: " . $conn->error;
        }
    } else {
        echo "Visi laukai yra privalomi.";
    }
} else {
    echo "Duomenys turi būti siunčiami POST metodu.";
}

$conn->close();
?>