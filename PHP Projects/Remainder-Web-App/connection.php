<?php
 $server = "localhost";
 $username = "root";
 $password = "";
 $dbname = "reminderapp";
 $con = mysqli_connect($server, $username, $password, $dbname);

 if(!$con)
 {
 	echo "not connected";
 }
 $username = $_POST['Username'];
 $password = $_POST['password'];
 $email = $_POST['mailId'];
 $phoneno = $_POST['phNumber'];

 echo $username." ".$password." ".$email." ".$phoneno;
?>