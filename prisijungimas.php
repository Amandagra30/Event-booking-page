<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "mano_projektas"; // Pakeisk į savo tikrą DB pavadinimą

$conn = new mysqli($servername, $username, $password, $dbname);

// Tikrinam prisijungimą
if ($conn->connect_error) {
    die("Prisijungimo klaida: " . $conn->connect_error);
}

// Gaunam duomenis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $vardas = $_POST['vardas'] ?? '';
    $el_pastas = $_POST['el_pastas'] ?? '';


    if ($vardas && $el_pastas) {
        $sql = "INSERT INTO klientas(vardas, el_pastas) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        if ($stmt) {
            $stmt->bind_param("sss", $vardas, $el_pastas);
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
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Gauti formos duomenis
    $name = $_POST['name'];
    $email = $_POST['email'];
    $date = $_POST['date'];

    // Laiško turinys
    $subject = "Nauja rezervacija nuo " . $name;
    $body = "
        Jums buvo pateikta nauja užklausa:\n
        Vardas: $name\n
        El. paštas: $email\n
        Žinutė: $message\n
        Rezervacijos data: $date
    ";

    // Siųsti laišką
    $to = "amandagrakalskiene@gmail.com"; // Tavo el. pašto adresas
    $headers = "From: $email";

    // Patikrinti ar laiškas buvo išsiųstas
    if (mail($to, $subject, $body, $headers)) {
        echo "Dėkojame už užklausą! Greitai susisieksime su Jumis.";
    } else {
        echo "Atsiprašome, įvyko klaida siunčiant laišką.";
    }
} else {
    echo "Neteisingas užklausos metodas.";
}
?>