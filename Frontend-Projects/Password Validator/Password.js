function myfunc() {
  let Password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("name").value;
  let flag = 1;
  if (Password.length <= 5) {
    document.getElementById("message").innerHTML =
      "** Password length must be greater than 5 characters **";
    flag = 0;
    return false;
  }
  if (Password.length >= 20) {
    document.getElementById("message").innerHTML =
      "** Password length must not be greater than 20 characters **";
    flag = 0;
    return false;
  }
  if (confirmPassword != Password) {
    document.getElementById("message").innerHTML =
      "** Please fill same password in both the fields **";
    flag = 0;

    return false;
  }
  if (Password.search(/[0-9]/) == -1) {
    document.getElementById("message").innerHTML =
      "** Password must contain a Number **";
    flag = 0;

    return false;
  }
  if (Password.search(/[a-z]/) == -1) {
    document.getElementById("message").innerHTML =
      "** Password must contain a LowerCase character **";
    flag = 0;

    return false;
  }
  if (Password.search(/[A-Z]/) == -1) {
    document.getElementById("message").innerHTML =
      "** Password must contain a UpperCase  character **";
    flag = 0;

    return false;
  }
  if (Password.search(/[!\@\#\$\%\^\&\*(\)\-\=\~\_]/) == -1) {
    document.getElementById("message").innerHTML =
      "*Password must contain a special character such as !,@,#,$,%,^,&,*(,),_,-,=,~ *";
    flag = 0;

    return false;
  }

  if (flag == 1) {
    document.getElementById("message").innerHTML =
      "** THIS IS A VALID PASSWORD! **";
    document.getElementById("message").style.color = "green";
    return false;
  }
  // alert("That is a vaild password!");
}
