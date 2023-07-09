<?php
session_start();
include_once "config.php";
$email = mysqli_real_escape_string($conn,$_POST['email']);
$pswrd = mysqli_real_escape_string($conn,$_POST['password']);

if(!empty($email) && !empty($pswrd)){
    if(filter_var($email,FILTER_VALIDATE_EMAIL)){
        $sql = mysqli_query($conn,"SELECT * FROM users WHERE email = '{$email}'");
        if(mysqli_num_rows($sql)){
            $rows = mysqli_fetch_assoc($sql);
            if($pswrd == $rows['password']){
            $sql2 = mysqli_query($conn,"UPDATE users SET status='Active now' where email = '{$email}' ");
             $_SESSION['unique_id'] = $rows['unique_id'];
            echo 'success';
            }else{
                echo 'wrong password or email address';
            }
        }else{
            echo $email . ' is not registered';
        }
    }else{
        echo $email . ' is an invalid email address';
    }
}else{
    echo "all fields are required";
}

mysqli_close($conn);
?>