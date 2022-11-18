<?php

function Auth() {
    $host = "localhost";
    $user = "JLiang20";
    $pass = "password";
    $dbname = "JLiang20";
    return [
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $user,
        $pass
    ];
}