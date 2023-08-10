<?php
    $submit_button_pressed=false;
    include("database.php");
    //Process the data only if the method is POST and submit button is set
    if($_SERVER["REQUEST_METHOD"]=="POST" && isset($_POST["submit"]))
    {
        //If the user clicks the link before time, but doesn't fill in 30minutes, still the password would be changed. Thus,
        // the token validity is checked after pressing the submit button also
        $token = $_POST["token_copy"];
        $hash_token = hash("sha256", $token);
        $sql = "SELECT * FROM user_details
                WHERE reset_token_hashed = ?";
        
        $stmt = $mysqli->prepare($sql);
        
        $stmt->bind_param("s", $hash_token);
        
        $stmt->execute();
        
        $result = $stmt->get_result();
        
        $user = $result->fetch_assoc();
        
        //if nothing is returned matching the token, the user is redirected to the forgot-password page
        if ($user === null) {
            header("Location: forgot-password.php?status=not_found");
            exit;
        }
        
        // If the token validity has exceeded 30minutes, the user is redirected to forgot password page.
        if (strtotime($user["token_expires_at"]) <= time()) {
            header("Location: forgot-password.php?status=token_expired");
            exit;
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
        $pwd=$cpwd="";

        //Variables to show error if proper input is not given
        $pwdErr=$cpwdErr=$pwdMatchErr=$duplicateEmailErr="";
        
        //Performing empty input validation in server side in case client side validation fails.
        if(empty($_POST["pwd"]))
        {
            $pwdErr="Password cannot be empty!";   
        }
        else
        {
            $pwd=obtain_proper_input($_POST["pwd"]);

            //Check if password entered is atleast 8 characters.
            if (strlen($pwd) < 8)
            {
                $pwdErr="Password must be atleast 8 characters!";
            }
            else
            {
                //Check if password contains atleast one letter
                if ( ! preg_match("/[a-z]/i",$pwd))
                {
                    $pwdErr="Password must contain at least one letter!";
                }
                else
                {
                    //Check if password contains atleast one number
                    if ( ! preg_match("/[0-9]/",$pwd))
                    {
                        $pwdErr="Password must contain at least one number";
                    }
                }
            }
        }

        if(empty($_POST["cpwd"]))
        {
            $cpwdErr="Please confirm your password";    
        }
        else
        {
            $cpwd=obtain_proper_input($_POST["cpwd"]);
        }

        if($pwd!=$cpwd && $cpwd!="")
        {
            $pwdMatchErr="Passwords don't match. Kindly check again!";
        }

        if(empty($pwdErr) && empty($cpwdErr) && empty($pwdMatchErr))
        {
            //Hashing the password using the default algorithm
            $hash_pass=password_hash($pwd,PASSWORD_DEFAULT);

            $sql = "UPDATE user_details
            SET Password = ?,
                reset_token_hashed = NULL,
                token_expires_at = NULL
            WHERE ID = ?";

            $stmt = $mysqli->prepare($sql);

            $stmt->bind_param("ss", $hash_pass, $user["ID"]);

            if($stmt->execute())
            {
                header("Location: login.php?pwd_ud=success");
            }
        }
        $submit_button_pressed=true;
    }
?>
<?php
    //Initial checking of token validity before pressing the submit button
    if(!$submit_button_pressed)
    {
        include("database.php");

        if(isset($_GET["token"]))
        {
            $token = $_GET["token"];
        }

        $hash_token = hash("sha256", $token);


        $sql = "SELECT * FROM user_details
                WHERE reset_token_hashed = ?";

        $stmt = $mysqli->prepare($sql);

        $stmt->bind_param("s", $hash_token);

        $stmt->execute();

        $result = $stmt->get_result();

        $user = $result->fetch_assoc();

        if ($user === null) {
            header("Location: forgot-password.php?status=not_found");
            exit;
        }

        if (strtotime($user["token_expires_at"]) <= time()) {
            header("Location: forgot-password.php?status=token_expired");
            exit;
        }
    }
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <!-- Bootstrap CSS -->
</head>
<body>
    <?php
        //Variables to store user data
        $pwd=$cpwd="";

        //Variables to show error if proper input is not given
        $pwdErr=$cpwdErr=$pwdMatchErr=$duplicateEmailErr="";
    ?>
    <!-- Main container -->
    <div class="d-flex flex-column container-lg justify-content-center align-items-center border border-5 border-dark rounded w-50 mt-5 mb-5 p-5">
        <p class="display-2">Reset Password</p>
        <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
            <div class="container-lg">

                <input type="hidden" name="token_copy" value="<?= htmlspecialchars($token) ?>">
                <!-- Required fields information -->
                <div class="row mt-3 justify-content-center">
                    <div class="col">
                        <p class="text-danger">* Required fields</p>
                    </div>
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
                    <div class="col">
                        <span class="text-danger"> <?php echo $pwdErr;?> </span>
                    </div>
                </div>

                <!-- Confirm password -->
                <div class="row mb-3 justify-content-center">
                    <div class="col-sm-3 col-lg-5">
                        <label for="cpwd">Confirm Password<span class="text-danger">*</span> </label>
                    </div>
                    <div class="col-sm-9 col-lg-7">
                        <input type="password" name="cpwd" value="<?php echo $cpwd;?>" placeholder="********">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col"> <span class="text-danger">
                            <?php echo $cpwdErr;?>
                        </span></div>
                </div>

                <div class="row mb-3">
                    <div class="col"> <span class="text-danger">
                            <?php echo $pwdMatchErr;?>
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