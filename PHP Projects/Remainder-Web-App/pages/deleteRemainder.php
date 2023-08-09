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

    <main class="newRmMain">
        <div class="newRmContent">
            <div class="newRmimgContainer"><img src="https://ik.imagekit.io/5bndldf5v/remainder/setRemainderForm.jpg" alt=""></div>
            <div class="newRmformContainer">
                <div class="newRmTextContainer"><span class="newRmText">Modify Remainder</span></div>
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
                        <div class="dropdown">
                            <label for="">Remainders :</label>
                            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-mdb-toggle="dropdown" aria-expanded="false">
                              Dropdown
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                              <li><button class="dropdown-item" type="button">Action</button></li>
                              <li><button class="dropdown-item" type="button">Another action</button></li>
                              <li><button class="dropdown-item" type="button">Something else here</button></li>
                            </ul>
                          </div>
                    </div>
                    <div>
                        <label for="sDesc">Add Description : </label>
                        <textarea name="sDesc" id="sDesc" cols="30" rows="2" disabled></textarea>
                    </div>
                    
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

    <!-- compiled and minified JavaScript -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js" integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ=" crossorigin="anonymous"></script> -->
    
</body>

</html>