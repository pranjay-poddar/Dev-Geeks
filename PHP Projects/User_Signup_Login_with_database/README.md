# Signup and Login using PHP
## This project focuses creating a signup and login for a website.

### It consists of:  
  
index.php - Index page navigating users to signup and login pages.  
  
signup.php - Collects information from user, sanitizes it and saves into MySQL database. Hashes the password that is entered by the user.  
  
signup-success.php - A success message is displayed if the signup was successful. Providea a link to login into the website using the credentials.  
  
login.php - It collects email and password from the user, validates it and checks with the data present in the database, and redirects to login-success.php if the credentials are valid.  
  
login-success.php - Displays the first name, last name and email of the user logged in currently. Also provides a link to logout from the current session.  
  
logout.php - Destroys the current session and redirects back to index.php  
  
database.php - Contains the required credentials to connect to the database.  
  
# How to run the project?
* You need to install PHP. For that, you can install XAMPP.  
  
* Place the files inside the "htdocs" folder that is present in the "xampp" folder.  
  
* Start Apache Web Server and MYSQL service in XAMPP application.  
  
* Create a database by navigating to localhost/phpmyadmin in your browser.  
  
* Import / create the required tables.
  
* Go to index.php by navigating to localhost/index.php and view the project!  
  
# Demo Video:

### https://drive.google.com/file/d/1oOXLx-AFC6dZXicR0jtkYijwDYHEbdnd/view?usp=sharing  
Please refer to the above video in case of any doubts !