<?php
session_start();
include_once "config.php";

$fname = mysqli_real_escape_string($conn,$_POST['fname']);
$lname = mysqli_real_escape_string($conn,$_POST['lname']);
$email = mysqli_real_escape_string($conn,$_POST['email']);
$pswrd = mysqli_real_escape_string($conn,$_POST['password']);

if(!empty($fname) && !empty($lname) && !empty($email) && !empty($pswrd)){
    if(filter_var($email,FILTER_VALIDATE_EMAIL)){
        $sql = mysqli_query($conn,"SELECT email FROM users WHERE email = '{$email}'");
        if(mysqli_num_rows($sql) > 0){
            echo $email . ' already exists';
        }else{
            if(isset($_FILES['image'])){
                $img_name = $_FILES['image']['name'];
                $img_explode = explode('.',$img_name);
                $img_type = $_FILES['image']['type'];
                $tmp_name = $_FILES['image']['tmp_name'];
                $img_ext = end($img_explode);   

                $extensions = ['jpg','png','jpeg'];
                if(in_array($img_ext,$extensions)){
                    $time = time();
                    $new_img_name = $time.$img_name;

                    if(move_uploaded_file($tmp_name,'../images/'.$new_img_name)){
                        $status = 'Active now';
                        $random_id = rand(time(),10000000);
                        $sql2 = mysqli_query($conn,"INSERT INTO users (unique_id,fname,lname,email,password,img,status) values ('{$random_id}','{$fname}','{$lname}','{$email}','{$pswrd}','{$new_img_name}','{$status}')");
                        if($sql2){
                            $sql3 = mysqli_query($conn,"SELECT * FROM users where email = '{$email}'");

                            if(mysqli_num_rows($sql3)){
                                $row = mysqli_fetch_assoc($sql3);
                                $_SESSION['unique_id'] = $row['unique_id'];
                                echo "success";
                            }
                        }else{
                            echo 'something went wrong';
                        }
                    }
                }else{
                    echo 'please select a valid image file';
                }
                
            }else{
                echo 'pls select an image file';
            }
        }
    }else{
        echo $email.' - invalid email address';
    }
}else{
    echo "all field are required";
}
mysqli_close($conn);
?>