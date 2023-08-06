<?php
    //Including the database connection file
    include("database.php");
    $reset_link=false;
    $pass_upd=false;
    if(isset($_GET["reset_link"]))
    {
        if($_GET["reset_link"]=="success")
        {
            $reset_link=true;
        }
    }
    if(isset($_GET["pwd_ud"]))
    {
        if($_GET["pwd_ud"]=="success")
        {
            $pass_upd=true;
        }
    }

    //Function to sanitize user input
    function obtain_proper_input($data)
    {
        $data=trim($data); //remove extra spaces, tabs and newline
        $data=stripslashes($data); //remove backslashes from user input
        $data=htmlspecialchars($data); //prevents attackers from exploiting the code by injecting HTML or Javascript code (Cross-site Scripting attacks) in forms
        return $data;
    }

    //Variables to store user data
    $email=$pwd="";

    //Variables to show error if proper input is not given
    $emailErr=$pwdErr="";

    //Variable to indicate if email doesn't exist in the database
    $invalid="";

    //Process the data only if the method is POST and submit button is set
    if($_SERVER["REQUEST_METHOD"]=="POST" && isset($_POST["submit"]))
    {
        //Performing empty input validation in server side in case client side validation fails.
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

        if(empty($_POST["pwd"]))
        {
            $pwdErr="Password cannot be empty!";   
        }
        else
        {
            $pwd=obtain_proper_input($_POST["pwd"]);
        }
        //If no errors are present, proceed further to retrieve the data from database!
        if(empty($emailErr) && empty($pwdErr))
        {
            //user_details is the table name
            $sql = sprintf("SELECT * FROM user_details WHERE email = '%s'", $mysqli->real_escape_string($email));

            //query the database
            $result = $mysqli->query($sql);

            //retrive the results as an associative array
            $user = $result->fetch_assoc();
            if ($user)
            {
                if (password_verify($pwd, $user["Password"]))
                {
                    //Start the session
                    session_start();

                    //Save details into session variables
                    $_SESSION["fname"]=$user["FName"];
                    $_SESSION["lname"]=$user["LName"];
                    $_SESSION["email"]=$user["Email"];
                    header("Location: login-success.php");
                    exit;
                }
            }

            //Flag if user does not exist!
            $invalid=true;
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <!-- Bootstrap CSS -->
</head>
<body>
    <div class="d-flex flex-column justify-content-center align-items-center">
        <!-- Reset Link sent -->
        <div class="row mt-3 mb-3 justify-content-center">
            <div class="col">
                <span class="text-warning fs-3">
                    <?php if($reset_link) echo "Link has been sent to the email-id. Kindly reset the password and login here!"?>
                </span>
            </div>
        </div>

        <!-- Password updated successfully -->
        <div class="row mt-3 mb-3 justify-content-center">
            <div class="col">
                <span class="text-warning fs-3">
                    <?php if($pass_upd) echo "Password has been updated successfully. You can now login here!"?>
                </span>
            </div>
        </div>
        </div>
    </div>

    <!-- Main container -->
    <div class="d-flex flex-column container-lg justify-content-center align-items-center border border-5 border-dark rounded w-50 mt-5 mb-5 p-5">
        <p class="display-2">Login</p>
        <!-- Login form -->
        <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
            <div class="container-lg">

                <!-- Required fields information -->
                <div class="row mt-3 justify-content-center">
                    <div class="col">
                        <p class="text-danger">* Required fields</p>
                    </div>
                </div>

                <!-- Inform user if email does not exist! -->
                <div class="row mt-3 mb-3 justify-content-center">
                    <div class="col">
                        <span class="text-warning">
                            <?php if($invalid) echo "Either Email-ID or password is incorrect! Please try again." ?>
                        </span>
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

                <!-- Password -->
                <div class="row mb-3 justify-content-center">
                    <div class="col-sm-3 col-lg-5">
                        <label for="pwd">Password <span class="text-danger">*</span> </label>
                    </div>
                    <div class="col-sm-9 col-lg-7">
                        <input type="password" name="pwd" value="<?php echo $pwd;?>" placeholder="********">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col"> <span class="text-danger">
                            <?php echo $pwdErr;?>
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
        <p class="fst-italic">Don't have an account? <a href="signup.php">Signup here</a></p>
        <p class="fst-italic">Forgot Password? <a href="forgot-password.php">Change here</a></p>
    </div>
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
        crossorigin="anonymous"></script>
    <!-- Bootstrap JS -->
</body>
</html>