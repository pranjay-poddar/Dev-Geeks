<?php
session_start();

include 'config.php';
if(isset($_SESSION['unique_id'])){
$sql = mysqli_query($conn,"SELECT * FROM users WHERE unique_id <> {$_SESSION['unique_id']} ");
$output = "";
if(mysqli_num_rows($sql) == 0 ){
    $output .= "No users are found";
}else{
    while($row = mysqli_fetch_assoc($sql)){
        $status = $row['status'];
        if($status == 'Active now'){
            $active = 'green';
        }else{
            $active = 'gray';
        }
        $sql2 = mysqli_query($conn,"SELECT * from message where outgoing_msg_id = {$row['unique_id']} and incoming_msg_id = {$_SESSION['unique_id']} order by msg_id DESC ");
        $lastMsg = 'no message available';
        if(mysqli_num_rows($sql2)){
             $row2 = mysqli_fetch_assoc($sql2);
            $lastMsg = $row2['msg'];
        }

    $output .= '<a href="chat.php?user_id='."{$row['unique_id']}".'"><div class="users"><div class="users_details"><img src="images/' . $row['img']. '"alt="error loading image"title="'.$row['fname'] . ' '. $row['lname'].'"/><div class="users_content"><p>'.$row['fname'] . ' '. $row['lname'].'</p><p>'.$lastMsg.'</p></div></div><i class="fas fa-circle '.$active.'"></i></div></a>';
}}
echo $output;}
else{
    header('location:../login.php');
}
mysqli_close($conn);
?>