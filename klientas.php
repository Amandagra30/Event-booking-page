<?php
class Klientas {
    public $vardas;
    public $el_pastas;
    public $data;

    public function __construct($vardas, $el_pastas, $data) {
        $this->vardas = $vardas;
        $this->el_pastas = $el_pastas;
        $this->data = $data;
    }

    public function saugoti() {
        $conn = new mysqli("localhost", "root", "", "mano_projektas");
        if ($conn->connect_error) {
            die("Prisijungimo klaida: " . $conn->connect_error);
        }

        $stmt = $conn->prepare("INSERT INTO klientai (vardas, el_pastas, data) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $this->vardas, $this->el_pastas, $this->data);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }

        $stmt->close();
        $conn->close();
    }
}
?>