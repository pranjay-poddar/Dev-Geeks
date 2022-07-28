function onLob(){
    let personOneValue = document.getElementById("personOne").value;
    let personTwoValue = document.getElementById("personTwo").value;
    let percentageValue = document.getElementById("output");

    if(personOneValue=="" || personTwoValue=="")
    {
        alert("Error: Invalid input \n Type name");
    }
    else{
        percentageValue.innerHTML = Math.floor((Math.random() * 100) + 1) + "%";
    }
}