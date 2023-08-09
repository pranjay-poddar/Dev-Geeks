<?php
    $not_found=false;
    $token_expired=false;
    // If token is invalid or expired
    if(isset($_GET["status"]))
    {
        if($_GET["status"]=="not_found")
        {
            $not_found=true;
        }
        else if($_GET["status"]=="token_expired")
        {
            $token_expired=true;
        }
    }
    //Including the database connection file
    include("database.php");

    //Function to sanitize user input
    function obtain_proper_input($data)
    {
        $data=trim($data); //remove extra spaces, tabs and newline
        $data=stripslashes($data); //remove backslashes from user input
        $data=htmlspecialchars($data); //prevents attackers from exploiting the code by injecting HTML or Javascript code (Cross-site Scripting attacks) in forms
        return $data;
    }

    //Variables to store user data
    $email="";

    //Variables to show error if proper input is not given
    $emailErr="";

    //Process the data only if the method is POST and submit button is set
    if($_SERVER["REQUEST_METHOD"]=="POST" && isset($_POST["submit"]))
    {
        if(empty($_POST["email"]))
        {
            $emailErr="Email is required";   
        }
        else
        {
            $email=obtain_proper_input($_POST["email"]);

            //Checking if it is a valid email
            if(!filter_var($email,FILTER_VALIDATE_EMAIL))
            {
                $emailErr="Please enter a valid e-mail!";    
            }
        }

        //If no errors in the email
        if(empty($emailErr))
        {
            //Generate a random hexadecimal string
            $token=bin2hex(random_bytes(20));

            //hash the string
            $hash_token=hash("sha256",$token);

            //Setting expiry time to 30min from generated one
            $expiry = date("Y-m-d H:i:s", time() + 30 * 30);

            $sql = "UPDATE user_details
                    SET reset_token_hashed = ?,
                    token_expires_at = ?
                    WHERE email = ?";

            $stmt=$mysqli->stmt_init();

            //The below statement checks for errors in mysql query
            if(!$stmt->prepare($sql))
            {
                die("SQL Error: ".$mysqli->error);
            }

            //Attach parameters to the sql statement
            //The first parameter is the type of inputs, sss means all four inputs are strings.
            $stmt->bind_param("sss", $hash_token, $expiry, $email);

            //Below returns true if the statement was executed successfully or not
            if($stmt->execute())
            {
                if ($mysqli->affected_rows) {

                    $mail = require __DIR__ . "/mailer.php";
                
                    $mail->setFrom("admin@example.tech");
                    $mail->addAddress($email);
                    $mail->Subject = "Password Reset";
                    $mail->Body = <<<END
                    
                    Dear Sir/Madam,

                    Click <a href="localhost/Apache_Web_Server/User_Signup_Login_with_database/PHP Files/reset-password.php?token=$token">here</a> 
                    to reset your password.

                    <br> <br> <br>
                    Copy paste the below link manually if the above link does not work.

                    <!-- Here, localhost link is provided. In actual deployment, the proper domain details are included -->
                    <br> <br> <br>
                    Link: localhost/Apache_Web_Server/User_Signup_Login_with_database/PHP Files/reset-password.php?token=$token

                    <br> <br> <br>

                    Note: The link is valid for 30 minutes only!

                    <br> <br> <br>

                    This is a system-generated email. Kindly do not reply to this email!
                    
                    <br> <br> <br>

                    Thankyou.

                    END;
                
                    try
                    {
                        $mail->send();
                    } catch (Exception $e)
                    {
                        echo "Message could not be sent. Mailer error: {$mail->ErrorInfo}";
                    }
                }
                header("Location: login.php?reset_link=success");
                exit;
            }

            
            

            
        }
    }
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <!-- Bootstrap CSS -->
</head>
<body>
    <div class="d-flex flex-column justify-content-center align-items-center">
        <!-- Invalid Token -->
    <div class="row mt-3 mb-3 justify-content-center">
        <div class="col">
            <span class="text-warning display-4">
                <?php if($not_found) echo "Invalid Link!"?>
            </span>
        </div>
    </div>

    <!-- Token Expired -->
    <div class="row mt-3 mb-3 justify-content-center">
        <div class="col">
            <span class="text-warning fs-4">
                <?php if($token_expired) echo "Link has been expired! Please request for another link using the form below!"?>
            </span>
        </div>
    </div>
    </div>

    <!-- Main container -->
    <div class="d-flex flex-column container-lg justify-content-center align-items-center border border-5 border-dark rounded w-50 mt-5 mb-5 p-5">
        <p class="display-2">Forgot Password</p>
        <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
            <div class="container-lg">

                <!-- Required fields information -->
                <div class="row mt-3 justify-content-center">
                    <div class="col">
                        <p class="text-danger">* Required fields</p>
                    </div>
                </div>

                <!-- Email -->
                <div class="row mb-3 justify-content-center">
                    <div class="col-sm-3 col-lg-5">
                        <label for="email">Email <span class="text-danger">*</span> </label>
                    </div>
                    <div class="col-sm-9 col-lg-7">
                        <input type="text" name="email" value="<?php echo $email;?>" placeholder="ram@gmail.com">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col"> <span class="text-danger">
                            <?php echo $emailErr;?>
                        </span></div>
                </div>

                <!-- Submit button -->
                <div class="row mb-3">
                    <div class="col">
                        <button class="btn btn-success" name="submit">Submit</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
        crossorigin="anonymous"></script>
    <!-- Bootstrap JS -->
</body>
</html>