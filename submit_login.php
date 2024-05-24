<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            echo "Accesso effettuato con successo!";
            session_start();
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['user_email'] = $row['email'];
        } else {
            echo "Password errata!";
        }
    } else {
        echo "Nessun utente trovato con questa email!";
    }

    $conn->close();
}
?>
