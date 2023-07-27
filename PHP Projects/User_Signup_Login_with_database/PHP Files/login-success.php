<?php
    //Start the session
    session_start();

    //If email is not set yet, redirect to index page
    if(!isset($_SESSION["email"]))
    {
        header("Location: index.php");
    }
    else
    {
        $fname=$_SESSION["fname"];
        $lname=$_SESSION["lname"];
        $email=$_SESSION["email"];
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Homepage</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <!-- Bootstrap CSS -->
</head>
<body class="bg-dark">
    <!-- Logout Link -->
    <div class="container d-flex justify-content-end">
        <p class="display-6"><a href="logout.php" class="text-decoration-none text-danger">Logout</a></p>
    </div>

    <!-- Displaying the details of the user -->
    <div class="container text-white text-center p-5">
        <p class="display-5 p-5">Welcome, <?php echo $fname." ".$lname?></p>
        <p class="display-5">Email ID: <?php echo $email?></p>
    </div>
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
        crossorigin="anonymous"></script>
    <!-- Bootstrap JS -->
</body>
</html>