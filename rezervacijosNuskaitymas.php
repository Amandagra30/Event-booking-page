<?php
$conn = new mysqli("localhost", "root", "", "mano_projektas");
if ($conn->connect_error) {
    die("Prisijungimo klaida: " . $conn->connect_error);
}

$sql = "SELECT data FROM klientai";
$result = $conn->query($sql);

$events = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $events[] = array(
            'title' => 'Užimta',
            'start' => $row['data'],
            'color' => 'red'
        );
    }
}

echo json_encode($events);
$conn->close();
?>