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
    <div><span class="navLogo">RM app</span> <span class="glyphicon glyphicon-align-justify dropDownIcon"></span></div>
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

  <header id="homeHeader">
    <h2></h2>
  </header>
  <main id="homeMain">
    <div id="dayDesc"></div>
    <div class="homeMainConatiner">
      <div class="section_our_solution">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 cardsContainer">
            <div class="our_solution_category">
              <div class="solution_cards_box">
                <div class="solution_card">
                  <div class="hover_color_bubble"></div>
                  <div class="so_top_icon">
                    <img src="https://ik.imagekit.io/5bndldf5v/remainder/setRemainder.png" alt="">
                  </div>
                  <div class="solu_title">
                    <h3>Set Remainder</h3>
                  </div>
                  <div class="solu_description">
                    <p>
                      You can set remainder by just clicking on the below set button.
                    </p>
                    <a href="./setRemainder.php"><button type="button" class="read_more_btn">Set</button></a>
                  </div>
                </div>
                <div class="solution_card">
                  <div class="hover_color_bubble"></div>
                  <div class="so_top_icon">
                    <img src="https://ik.imagekit.io/5bndldf5v/remainder/modifyRemainder.png" alt="">
                  </div>
                  <div class="solu_title">
                    <h3>Modify Remainder</h3>
                  </div>
                  <div class="solu_description">
                    <p>
                      You can modify remainder by just clicking on the below modify button.
                    </p>
                    <a href="./modifyRemainder.php"><button type="button" class="read_more_btn">Modify</button></a>
                  </div>
                </div>
              </div>
              <!--  -->
              <div class="solution_cards_box sol_card_top_3">
                <div class="solution_card">
                  <div class="hover_color_bubble"></div>
                  <div class="so_top_icon">
                    <img src="https://ik.imagekit.io/5bndldf5v/remainder/disableRemainder.png" alt="">
                  </div>
                  <div class="solu_title">
                    <h3>Disable Remainder</h3>
                  </div>
                  <div class="solu_description">
                    <p>
                      You can disable remainder by just clicking on the below disable button.
                    </p>
                    <a href="./disableRemainder.php"><button type="button" class="read_more_btn">Disable</button></a>
                  </div>
                </div>
                <div class="solution_card">
                  <div class="hover_color_bubble"></div>
                  <div class="so_top_icon">
                    <img src="https://ik.imagekit.io/5bndldf5v/remainder/deleteRemainder.png" alt="">
                  </div>
                  <div class="solu_title">
                    <h3>Delete Remainder</h3>
                  </div>
                  <div class="solu_description">
                    <p>
                      You can delete remainder by just clicking on the below delete button.
                    </p>
                    <a href="./deleteRemainder.php"><button type="button" class="read_more_btn">Delete</button></a>
                  </div>
                </div>
              </div>
              <div class="solution_cards_box sol_card_top_5">
                <div class="solution_card">
                  <div class="hover_color_bubble"></div>
                  <div class="so_top_icon">
                    <img src="https://ik.imagekit.io/5bndldf5v/remainder/enableRemainder.png" alt="">
                  </div>
                  <div class="solu_title">
                    <h3>Enable Remainder</h3>
                  </div>
                  <div class="solu_description">
                    <p>
                      You can enable remainder by just clicking on the below enable button.
                    </p>
                    <a href="./enableRemainder.php"><button type="button" class="read_more_btn">Enable</button></a>
                  </div>
                </div>
                <div class="solution_card">
                  <div class="hover_color_bubble"></div>
                  <div class="so_top_icon">
                    <img src="https://ik.imagekit.io/5bndldf5v/remainder/viewRemainder.png" alt="">
                  </div>
                  <div class="solu_title">
                    <h3>view Remainder</h3>
                  </div>
                  <div class="solu_description">
                    <p>
                      You can view your remainder by just clicking on the below view button.
                    </p>
                    <a href="./viewRemainder.php"><button type="button" class="read_more_btn">View</button></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <footer>
    <p>
      Copyright © 2023. All rights reserved.
    </p>
  </footer>

  <script src="../javascript/home.js"></script>
  <!-- compiled and minified JavaScript -->
  <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script> -->
</body>

</html>