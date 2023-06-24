<?php
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
    $fname=$lname=$email=$pwd=$cpwd="";

    //Variables to show error if proper input is not given
    $fnameErr=$emailErr=$pwdErr=$cpwdErr=$pwdMatchErr=$duplicateEmailErr="";

    //Process the data only if the method is POST and submit button is set
    if($_SERVER["REQUEST_METHOD"]=="POST" && isset($_POST["submit"]))
    {
        //Performing empty input validation in server side in case client side validation fails.
        if(empty($_POST["fname"]))
        {
            $fnameErr="First name is required";   
        }
        else
        {
            $fname=obtain_proper_input($_POST["fname"]);
        }

        $lname=obtain_proper_input($_POST["lname"]);

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

        //If no errors are present, proceed further to save to database!
        if(empty($fnameErr) && empty($emailErr) && empty($pwdErr) && empty($cpwdErr) && empty($pwdMatchErr))
        {
            //Hashing the password using the default algorithm
            $hash_pass=password_hash($pwd,PASSWORD_DEFAULT);

            //SQL statement to insert values into the users_details table
            $sql="INSERT INTO user_details (FName,LName,Email,Password) VALUES (?,?,?,?)";

            //Initializing the statement
            $stmt=$mysqli->stmt_init();

            //The below statement checks for errors in mysql query
            if(!$stmt->prepare($sql))
            {
                die("SQL Error: ".$mysqli->error);
            }

            //Attach parameters to the sql statement
            //The first parameter is the type of inputs, ssss means all four inputs are strings.
            $stmt->bind_param("ssss",
                                $fname,
                                $lname,
                                $email,
                                $hash_pass);

            //Below returns true if the statement was executed successfully or not
            if($stmt->execute())
            {
                header("Location: signup-success.php?update=success");
                exit;
            }
            else
            {
                //Error number 1062 is thrown when duplicate record is entered into the database!
                //We check if unique email id is entered, and is not present in the database.
                if($mysqli->errno == 1062)
                {
                    header("Location: index.php?dupEmail=1");
                }
                else
                    echo("Error: ".$mysqli->error."  ".$mysqli->errno);
            }
        }
    }
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup Page</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <!-- Bootstrap CSS -->
</head>
<body>
    <!-- Main container -->
    <div class="d-flex flex-column container-lg justify-content-center align-items-center border border-5 border-dark rounded w-50 mt-5 mb-5 p-5">
        <p class="display-2">Signup</p>
        <!-- Signup form -->
        <!-- Form validation is generally done in the client side, but this code completely focuses on server side validation -->
        <!-- Client side validation is best, as it avoids sending data to the database before proper validation. -->
        <!-- But it is advised to include server side validation, as a backup, if client side validation somehow fails to perform -->
        <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
            <div class="container-lg">

                <!-- To inform user if email already exists in the database -->
                <div class="row justify-content-center">
                    <div class="col">
                        <span class="text-warning">
                            <?php if(isset($_GET["dupEmail"])) echo "Email already exists in the database! Please register with another email-id!"?>
                        </span>
                    </div>
                </div>

                <!-- Required fields information -->
                <div class="row mt-3 justify-content-center">
                    <div class="col">
                        <p class="text-danger">* Required fields</p>
                    </div>
                </div>

                <!-- First Name -->
                <div class="row mt-3 mb-3">
                    <div class="col-sm-3 col-lg-5">
                        <label for="fname">First Name <span class="text-danger">*</span> </label>
                    </div>
                    <div class="col-sm-9 col-lg-7">
                        <input type="text" name="fname" value="<?php echo $fname;?>" placeholder="Ram">
                    </div>
                </div>

                <!-- Displaying error if name is not entered in the input field. -->
                <div class="row mb-3">
                    <div class="col"> <span class="text-danger">
                            <?php echo $fnameErr;?>
                        </span></div>
                </div>

                <!-- Last Name -->
                <div class="row mb-3 justify-content-center">
                    <div class="col-sm-3 col-lg-5">
                        <label for="lname">Last Name</label>
                    </div>
                    <div class="col-sm-9 col-lg-7">
                        <input type="text" name="lname" value="<?php echo $lname;?>" placeholder="Krishnan">
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
        <p class="fst-italic">Already have an account? <a href="login.php">Login here</a></p>
    </div>
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
        crossorigin="anonymous"></script>
    <!-- Bootstrap JS -->
</body>
</html>