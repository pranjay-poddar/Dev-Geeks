<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$path = $_SERVER['DOCUMENT_ROOT'];
$path .= "/Apache_Web_Server/User_Signup_Login_with_database/vendor/autoload.php";

include($path);

$mail = new PHPMailer(true);

// $mail->SMTPDebug = SMTP::DEBUG_SERVER;

$mail->isSMTP();
$mail->SMTPAuth = true;

$mail->Host = "host@example.com";
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
$mail->Username = "user@example.com";
$mail->Password = "password";

$mail->isHtml(true);

return $mail;