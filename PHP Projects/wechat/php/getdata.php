<?php
session_start();
include 'config.php';
$outgoing_id = mysqli_real_escape_string($conn,$_POST['outgoing_id']);
$incoming_id = mysqli_real_escape_string($conn,$_POST['incoming_id']);
if(isset($_SESSION['unique_id'])){
$sql = mysqli_query($conn,"SELECT * from message inner join users on message.outgoing_msg_id = users.unique_id  where (outgoing_msg_id = {$outgoing_id} AND incoming_msg_id = {$incoming_id}) or (outgoing_msg_id = {$incoming_id} AND incoming_msg_id = {$outgoing_id}) ORDER BY msg_id      ");
$output = '';
 if(mysqli_num_rows($sql) > 0){
        while($row = mysqli_fetch_assoc($sql)){
            if($row['outgoing_msg_id'] == $outgoing_id){
                $output .= '<div class="cht_outgoing"><div class="cht_details"><p>'.$row['msg'].'</p></div></div>';
            }else{
                $output .= '<div class="cht_incoming"><img src="images/'.$row['img'].'" alt="error loading image" /><div class="cht_details"><p>'.$row['msg'].'</p></div></div>';
            }
         }}
        }else{
             header('location:../login.php');
        }
        echo $output;
        mysqli_close($conn);
?>
