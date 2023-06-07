<?php
$name= $_Post['name'];
$visitor_email= $_Post['email'];
$subject = $_Post['subject'];
$message= $_POST['message'];

$email_from ='ugadmission@vit.ac.in';

$email_subject ='New Form submission';

$email_body = "User Name: $name.\n".
            "User Email: $visitor_email.\n".
            "User Name: $subject.\n".
            "User Name: $message.\n".

$to = 'aayushiojha13@gmail.com';
$header = "From: $email_from \r\n";
$headers .="Reply-To: $visitor_email \r\n;

mail($to,$email_subject,$email_body,$headers);
header("Location : contact.html"); 

?>