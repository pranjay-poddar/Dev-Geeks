<html>
<head>
<script>
function ageCalculator() {
    var userinput = document.getElementById("DOB").value;
    var dob = new Date(userinput);
    if(userinput==null || userinput=='') {
      document.getElementById("message").innerHTML = "**Choose a date please!";
      return false;
    } else {

    //calculate month difference from current date in time
    var month_diff = Date.now() - dob.getTime();

    //convert the calculated difference in date format
    var age_dt = new Date(month_diff);

    //extract year from date
    var year = age_dt.getUTCFullYear();

    //now calculate the age of the user
    var age = Math.abs(year - 1970);

    //display the calculated age
    return document.getElementById("result").innerHTML =
             "Age is: " + age + " years. ";
    }
}
</script>
</head>
<body>
<center>
<h2 style="color: 32A80F" align="center"> Calculate Age from Date of Birth <br> <br> </h2>

<!-- Choose a date and enter in input field -->
<b> Enter Date of Birth: <input type=date id = DOB> </b>
<span id = "message" style="color:red"> </span> <br><br>

<!-- Choose a date and enter in input field -->
<button type="submit" onclick = "ageCalculator()"> Calculate age </button> <br><br>
<h3 style="color:32A80F" id="result" align="center"></h3>
</center>
</body>
</html>
