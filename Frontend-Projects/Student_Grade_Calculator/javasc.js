const calcy = () => {
    let ma = document.getElementById('ma').value;
    let phy = document.getElementById('phy').value;
    let chem = document.getElementById('chem').value;
    let comp = document.getElementById('comp').value;
    let grades = "";

    let total = parseFloat(ma) + parseFloat(phy) + parseFloat(chem) + parseFloat(comp);

    let per = (total / 400) * 100;

    if (per <= 100 && per >= 80) {
        grades = "A";
    }

    else if (per <= 80 && per >= 60) {
        grades = "B";
    }

    else if (per <= 60 && per >= 40) {
        grades = "C";
    }
    else {
        grades = "D"
    }

    document.getElementById('showdata').innerHTML = `Out of 400 <br>Your total is : ${total} <br> Percentage is : ${per}% <br>  Grade is ${grades}`

}