<?php
session_start();
if(isset($_SESSION['unique_id'])){
    include_once 'config.php';
    $status = "offline now";
    if( mysqli_query($conn,"UPDATE users set status = '{$status}' where unique_id = {$_SESSION['unique_id']} ")){
    session_unset();
    session_destroy();
    header('location:../login.php');}

}else{
    $sql = mysqli_query($conn,"UPDATE users set status = 'offline now' where unique_id = {$_SESSION['unique_id']} ");
    header('location:../login.php');
}
?>