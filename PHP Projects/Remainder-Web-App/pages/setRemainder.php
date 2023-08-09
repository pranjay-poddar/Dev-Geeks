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
    <link rel="stylesheet" href="../style/style.css">
    <!-- responsive css -->
    <link rel="stylesheet" href="../style/responsive.css">

    <title>Remainder</title>
</head>

<body>
    <section class="vh-100 loginContainer">

        <nav class="navHome">
            <div><span class="navLogo">RM app</span> <span
                    class="glyphicon glyphicon-align-justify dropDownIcon"></span>
            </div>
            <div class="navLoginSignUp">
                <button>
                    Login
                    <div class="arrow-wrapper">
                        <div class="arrow"></div>
                    </div>
                </button>
                <button>
                    Sign up
                    <div class="arrow-wrapper">
                        <div class="arrow"></div>
                    </div>
                </button>
            </div>
        </nav>

        <main class="newRmMain">
            <div class="newRmContent">
                <div class="newRmimgContainer"><img src="https://ik.imagekit.io/5bndldf5v/remainder/setRemainderForm.jpg" alt=""></div>
                <div class="newRmformContainer">
                    <div class="newRmTextContainer"><span class="newRmText">Set Remainder</span></div>
                    <form action="#">
                        <div>
                            <label for="sDate">Set the date : </label>
                            <input type="date" name="sDate" id="sDate" required>
                        </div>
                        <div>
                            <label for="sSubject">Subject : </label>
                            <select name="subject" id="sSubject" required>
                                <optgroup label="Bussiness">
                                    <option value="Meetings">Meetings</option>
                                    <option value="Surveys">Surveys</option>
                                    <option value="Report">Report </option>
                                    <option value="Training">Training</option>
                                    <option value="Deadline">Deadline</option>
                                </optgroup>
                                <optgroup label="Personal">
                                    <option value="Exercise">Exercise</option>
                                    <option value="Exams">Exams</option>
                                    <option value="Practical">Practical</option>
                                </optgroup>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label for="sDesc">Add Description : </label>
                            <textarea name="sDesc" id="sDesc" cols="30" rows="2" required></textarea>
                        </div>
                        <div>
                            <label for="sEmail">Email Address : </label>
                            <input type="email" name="sEmail" id="sEmail">
                        </div>
                        <div>
                            <label for="sContact">Contact No. : </label>
                            <input type="number" name="sContact" id="sContact">
                        </div>
                        <div>
                            <label for="sSms">SMS Number : </label>
                            <input type="number" name="sSms" id="sSms">
                        </div>
                        <div class="setCheckBox">
                            <label for="sRecur">Recur for next: </label>
                            <div>
                                <input type="checkbox" name="day7" id="day7">
                                <label for="day7"> 7 Days</label>
                            </div>
                            <div>
                                <input type="checkbox" name="day5" id="day5">
                                <label for="day5"> 5 Days</label>
                            </div>
                            <div>
                                <input type="checkbox" name="day3" id="day3">
                                <label for="day3"> 3 Days</label>
                            </div>
                            <div>
                                <input type="checkbox" name="day2" id="day2">
                                <label for="day2"> 2 Days</label>
                            </div>
                        </div>
                        <div class="text-center text-lg-start mt-4 pt-2 loginBtnContainer">
                            <button class="noselect cancelBtn">
                                <span class="text">Cancel</span>
                                <span class="icon">
                                    <span class="glyphicon glyphicon-remove loginBtnIcon"></span>
                                </span>
                            </button>
                            <button class="noselect loginBtn">
                                <span class="text" id="loginSignUpBtn">Confirm</span>
                                <span class="icon">
                                    <span class="glyphicon glyphicon-ok loginBtnIcon"></span>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>

        <footer>
            <p>
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
            <p class="loginInfo">Sign up Successfully</p>
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
    <script src="../javascript/main.js"></script>
    <!-- compiled and minified JavaScript -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script> -->
</body>

</html>