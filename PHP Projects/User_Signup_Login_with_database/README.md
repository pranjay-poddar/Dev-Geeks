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

forgot-password.php - It asks for the email that is present in the database from the user. If email exists in the database, it generates an ***unique token*** and sets expiry time as 30 minutes from the time it was generated. Then, the token is sent via email (using PHP Mailer) to the user. The user has to reset the password in 30 minutes, or else the token becomes invalid.

mailer.php - Contains the required SMTP credentials to send email to the user. Similar to a web server, a mail server sends emails. Thus, to send emails to the user, you need valid SMTP credentials. There are many free SMTP providers, use any one of them and accordingly change the credentials in this file.

reset-password.php - If the token is valid, and is used before the time limit, the user is shown a page to reset the password. Else, the user is redirected to the forgot-password page where he/she can request a new token for the same. If everything including password requirements are fullfiled, the password is updated in the database.

### PHP Mailer
PHP Mailer is an email sending library for PHP. PHP supports sending emails via mail() function, but configuration might be tedious. PHP Mailer makes the whole process easy. PHP Mailer must be installed the project directory using Composer (PHP dependency manager). Kindly refer to the repository of the PHP Mailer for the same.  
Repo Link: https://github.com/PHPMailer/PHPMailer
  
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