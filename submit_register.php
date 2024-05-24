<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (email, password) VALUES ('$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo "Registrazione avvenuta con successo";
    } else {
        echo "Errore: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
