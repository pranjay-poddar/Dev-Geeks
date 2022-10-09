var entry = document.getElementById("entry");
entry.addEventListener("click", displayDetails);
var row = 1;

function displayDetails() 
{

var name = document.getElementById("name").value;
var email = document.getElementById("email").value;

var skill = document.getElementById("skill").value;


if(!name|| !email || !skill) {

alert("Please fill all the boxes");

return;

}

var display = document.getElementById("display");
var newRow= display.insertRow(row);

var cell1 = newRow.insertCell(0);

var cell2 = newRow.insertCell (1);

var cell3 = newRow.insertCell (2);

cell1.innerHTML = name;

cell2.innerHTML = email;

cell3.innerHTML = skill;

row++;


}