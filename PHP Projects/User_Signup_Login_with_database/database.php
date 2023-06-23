<?php

    //Connection details
    $host="localhost";
    $db_name="signup_login";
    $username="root";
    $password="";

    $mysqli=new mysqli($host,$username,$password,$db_name); //new mysqli object

    mysqli_report(MYSQLI_REPORT_OFF);

    if($mysqli->connect_errno) //Returns other than zero if some issue in connecting to mysql
    {
        die("Connection Error: ".$mysqli->connect_error);
    }
?>