<?php


$email = $_POST['email'];
$password = $_POST['password'];

if ($email && $password) {
    $result = mysqli_query($conn, "SELECT * FROM users WHERE email = '$email'");
    $row = mysqli_fetch_assoc($result);
    if (mysqli_num_rows($result) > 0) {
        if ($password == $row['password']) {
            $data['accesstoken'] = "00000000000000";
            $data['user'] = $row;
        } else {
            $data['massage'] = "Wrong password";
        }
    } else {
        $data['massage'] = "There is no user corresponding to the email address.";
    }

    $json = json_encode($data);

    header('Content-Type: application/json');

    echo $json;
}
