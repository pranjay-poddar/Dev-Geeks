<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css"
        integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

    <!-- Style.css -->
    <link rel="stylesheet" href="style/style.css">
    <!-- responsive css -->
    <link rel="stylesheet" href="style/responsive.css">

    <title>Remainder</title>
</head>

<body>

    <section class="vh-100 loginContainer">
        <div class="container-fluid h-custom">
            <div id="loginHeader">
                <h2></h2>
            </div>
            <div class="row d-flex justify-content-center align-items-center h-100 loginContent">
                <div class="col-md-9 col-lg-6 col-xl-5 imgContainer">
                    <img src="https://ik.imagekit.io/5bndldf5v/remainder/loginImg.webp"
                        class="img-fluid" alt="Sample image">
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1 formContainer">
                    <form>
                        <div class="form-outline mb-4">
                            <input id="username" name="Username" type="text" class="form-control form-control-lg inputContainer"
                                placeholder="Username" required />
                        </div>

                        <div class="form-outline mb-3">
                            <input id="password" name="password" type="password" class="form-control form-control-lg inputContainer"
                                placeholder="Enter password" required />
                        </div>

                        <div class="d-flex justify-content-between align-items-center">
                            <a href="#!" class="text-body">Forgot password?</a>
                        </div>

                        <div class="text-center text-lg-start mt-4 pt-2">
                            <p class="small fw-bold mt-2 pt-1 mb-0">
                                <span class="loginSignupTxt">Don't have an account?</span>
                                <a href="./signup.php"><span class="loginSignUp">Register</span></a>
                            </p>
                        </div>

                        <div class="text-center text-lg-start mt-4 pt-2 loginBtnContainer">
                            <button class="noselect cancelBtn loginCancelBtn formBtn" onclick="popUp('cancel')">
                                <span class="text">Cancel</span>
                                <span class="icon">
                                    <span class="glyphicon glyphicon-remove loginBtnIcon"></span>
                                </span>
                            </button>

                            <button class="noselect loginBtn formBtn" onclick="popUp('login')">
                                <span class="text" id="loginSignUpBtn">Login</span>
                                <span class="icon">
                                    <span class="glyphicon glyphicon-ok loginBtnIcon"></span>
                                </span>
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </div>
        <footer>
            <p class="text-white">
                Copyright © 2023. All rights reserved.
            </p>
        </footer>
    </section>

    <div class="alertContainer popUpContainer" id="successPopUp">
        <div class="alert">
            <div class="crossIconContainer">
                <span class="glyphicon glyphicon-remove" onclick="closePopUp('successPopUp')"></span>
            </div>
            <div class="alertSymbol">
                <img src="https://ik.imagekit.io/5bndldf5v/remainder/greenTickImg.webp" alt="">
            </div>
            <p class="loginInfo">Login Successfully</p>
            <div class="alertBtnContainer">
                <a href="./pages/home.php">
                    <button class="alertTextBtn">
                        <div>
                            <span>
                                <p>Okay</p>
                            </span>
                        </div>
                        <div>
                            <span>
                                <p>Thanks</p>
                            </span>
                        </div>
                    </button>
                </a>
            </div>
        </div>
    </div>

    <div class="alertContainer popUpContainer" id="cancelPopUp">
        <div class="alert">
            <div class="crossIconContainer">
                <span class="glyphicon glyphicon-remove closeIcon" onclick="closePopUp('cancelPopUp')"></span>
            </div>
            <div class="alertSymbol">
                <img src="https://ik.imagekit.io/5bndldf5v/remainder/redCrossImg.png" alt="">
            </div>
            <p class="loginInfo">Login Failed</p>
            <div class="alertBtnContainer">
                <button class="alertTextBtn" onclick="retry('cancelPopUp')">
                    <div>
                        <span>
                            <p>Okay</p>
                        </span>
                    </div>
                    <div style="background-color: red;">
                        <span>
                            <p>Retry</p>
                        </span>
                    </div>
                </button>
            </div>
        </div>
    </div>

    <!-- <div class="alertContainer">
        <div class="alert">
            <div class="">
                <span class="glyphicon glyphicon-remove"></span>
            </div>
            <div class="alertSymbol">
                <img src=".https://ik.imagekit.io/5bndldf5v/remainder/greenTickImg.webp" alt="">
            </div>
            <p class="loginInfo">Logged Out Successfully</p>
            <div class="alertBtnContainer">
                <button class="alertTextBtn">
                    <div>
                        <span>
                            <p>Okay</p>
                        </span>
                    </div>
                    <div>
                        <span>
                            <p>Thanks</p>
                        </span>
                    </div>
                </button>
            </div>
        </div>
    </div> -->

    <script src="javascript/login.php"></script>
    <script src="javascript/main.php"></script>
    <!-- compiled and minified JavaScript -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script> -->
</body>

</html>