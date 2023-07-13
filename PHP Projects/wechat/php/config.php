<?php
$conn = mysqli_connect('localhost','root','','chat');
if(mysqli_connect_errno()){
    echo "<h1>connection failed</h1>" . mysqli_connect_error();
    exit();
}


?>