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

<body class="viewBody">
    <nav class="navHome">
        <div><span class="navLogo">RM app</span> <span class="glyphicon glyphicon-align-justify dropDownIcon"></span>
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

    <main class="viewRmMain">
        <div class="viewMainContainer">
            <div class="newRmTextContainer viewHeading" ><span class="newRmText ">View Remainder</span></div>
            <form action="#" class="viewForm">
                <div class="viewDate">
                    <div>
                        <label for="sDate">Select from date : </label>
                        <input type="date" name="sDate" id="sDate" required>
                    </div>
                    <div>
                        <label for="sDate">Select to date : </label>
                        <input type="date" name="sDate" id="sDate" required>
                    </div>
                </div>
                <div class="viewSubject">
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
            </form>
            <table class="table viewTable">
                <thead>
                    <tr>
                        <th scope="col">Remainder Name</th>
                        <th scope="col">Remainder Subject</th>
                        <th scope="col">Remainder Description</th>
                        <th scope="col">Email Address</th>
                        <th scope="col">Contact No</th>
                        <th scope="col">SMS No</th>
                        <th scope="col">Recurrence Frequency</th>
                        <th scope="col">
                            <div class="form-check">
                                checkbox
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                        </th>
                        <td>Sit</td>
                        <td>Amet</td>
                        <td>Consectetur</td>
                        <td>Sit</td>
                        <td>Amet</td>
                        <td>Amet</td>
                        <td>Consectetur</td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                        </th>
                        <td>Sit</td>
                        <td>Amet</td>
                        <td>Consectetur</td>
                        <td>Sit</td>
                        <td>Amet</td>
                        <td>Amet</td>
                        <td>Consectetur</td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                        </th>
                        <td>Sit</td>
                        <td>Amet</td>
                        <td>Consectetur</td>
                        <td>Sit</td>
                        <td>Amet</td>
                        <td>Amet</td>
                        <td>Consectetur</td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                        </th>
                        <td>Sit</td>
                        <td>Amet</td>
                        <td>Consectetur</td>
                        <td>Sit</td>
                        <td>Amet</td>
                        <td>Amet</td>
                        <td>Consectetur</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="text-center text-lg-start mt-4 pt-2 loginBtnContainer">
            <button class="noselect cancelBtn">
                <span class="text">Back</span>
                <span class="icon">
                    <span class="glyphicon glyphicon-arrow-left loginBtnIcon"></span>
                </span>
            </button>
            <button class="noselect loginBtn">
                <span class="text" id="loginSignUpBtn">Disable</span>
                <span class="icon">
                    <span class="glyphicon glyphicon-trash loginBtnIcon"></span>
                </span>
            </button>
            <button class="noselect cancelBtn">
                <span class="text">Delete</span>
                <span class="icon">
                    <span class="glyphicon glyphicon-lock loginBtnIcon"></span>
                </span>
            </button>
            <button class="noselect loginBtn">
                <span class="text" id="loginSignUpBtn">Modify</span>
                <span class="icon">
                    <span class="glyphicon glyphicon-pencil loginBtnIcon"></span>
                </span>
            </button>
        </div>

    </main>

    <footer>
        <p>
            Copyright © 2023. All rights reserved.
        </p>
    </footer>

    <!-- compiled and minified JavaScript -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script> -->
</body>

</html>