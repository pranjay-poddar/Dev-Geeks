function resetInput() {
    var dropDown1 = document.getElementById("selectType1");
    dropDown1.selectedIndex = 0;
    var dropDown2 = document.getElementById("selectType2");
    dropDown2.selectedIndex = 0;

    document.getElementById("textType1").innerText = "Decimal";
    document.getElementById("textType2").innerText = "Binary";
    document.getElementById("errorMsg").innerText = "";
    document.getElementById("errorMsg").removeAttribute("class", "alert alert-warning");
    document.getElementById("num").value = "";
    document.getElementById("output").innerText = "";
}

function typeChanged1() {
    let selectedType = document.getElementById("selectType1").value;
    document.getElementById("textType1").innerText = selectedType;
}

function typeChanged2() {
    let selectedType = document.getElementById("selectType2").value;
    document.getElementById("textType2").innerText = selectedType;
}

function decimalToBinary(decimal) {
    if (0 == decimal) {
        return '0';
    }
    let binary = '';
    while (decimal > 0) {
        binary = (decimal % 2) + binary;
        decimal = Math.floor(decimal / 2);
    }
    return binary;
};

function decimalToOctal(decimal) {
    if (0 == decimal) {
        return '0';
    }
    let octal = '';
    while (decimal > 0) {
        octal = (decimal % 8) + octal;
        decimal = Math.floor(decimal / 8);
    }
    return octal;
};

function decimalToHex(decimal) {
    if (0 == decimal) {
        return '0';
    }
    let hex = '';
    while (decimal > 0) {
        let rem = (decimal % 16);
        if (rem < 10) {
            hex = rem + hex;
        } else {
            hex = String.fromCharCode(55 + rem) + hex;
        }
        decimal = Math.floor(decimal / 16);
    }
    return hex;
};

function binaryToDecimal(num) {
    let decimal = 0;
    for (let i = 0; i < num.length; i++) {
        decimal = decimal * 2 + (num[i] - '0');
    }
    return decimal;
}

function OctalToDecimal(num) {
    let decimal = 0;
    for (let i = 0; i < num.length; i++) {
        decimal = decimal * 8 + (num[i] - '0');
    }
    return decimal;
}
function HexToDecimal(num) {
    num = num.toUpperCase();
    let decimal = 0;
    for (let i = 0; i < num.length; i++) {
        let rem = 0;
        if (num[i] >= '0' && num[i] <= '9') {
            rem = num[i] - '0';
        } else {
            rem = num[i].charCodeAt(0) - 55;
        }
        decimal = decimal * 16 + rem;
    }
    return decimal;
}

function isInputValid(from, num) {
    if (from == "Decimal") {
        for (let i = 0; i < num.length; i++) {
            if (num[i] < '0' || num[i] > '9') {
                return false;
            }
        }
    } else if (from == "Binary") {
        for (let i = 0; i < num.length; i++) {
            if (num[i] != '0' && num[i] != '1') {
                return false;
            }
        }
    } else if (from == "Octal") {
        for (let i = 0; i < num.length; i++) {
            if (num[i] < '0' || num[i] > '7') {
                return false;
            }
        }
    } else if (from == "Hex") {
        for (let i = 0; i < num.length; i++) {
            if ((num[i] < '0' || num[i] > '9') && (num[i] < 'A' || num[i] > 'F') && (num[i] < 'a' || num[i] > 'f')) {
                return false;
            }
        }
    }
    return true;
}

function convertTo() {
    let num = document.getElementById("num").value;
    if (0 > num) {
        document.getElementById("output").innerText = "";
        document.getElementById("errorMsg").setAttribute("class", "alert alert-warning");
        document.getElementById("errorMsg").innerText = "Please Enter Positive Number";
        return;
    }
    let from = document.getElementById("selectType1").value;
    let to = document.getElementById("selectType2").value;
    let isValid = isInputValid(from, num);
    if (!isValid) {
        document.getElementById("output").innerText = "";
        document.getElementById("errorMsg").setAttribute("class", "alert alert-warning");
        document.getElementById("errorMsg").innerText = "Please Enter Valid Number according to selected type";
        return;
    }

    document.getElementById("errorMsg").innerText = "";
    document.getElementById("errorMsg").removeAttribute("class", "alert alert-warning");

    let answer = '';
    if (from == to) {
        answer = num;
    } else if (from == "Decimal") {
        switch (to) {
            case "Binary":
                answer = decimalToBinary(num);
                break;
            case "Octal":
                answer = decimalToOctal(num);
                break;
            case "Hex":
                answer = decimalToHex(num);
                break;
        }
    } else if (from == "Binary") {
        let decimal = binaryToDecimal(num);
        switch (to) {
            case "Decimal":
                answer = decimal;
                break;
            case "Octal":
                answer = decimalToOctal(decimal);
                break;
            case "Hex":
                answer = decimalToHex(decimal);
                break;
        }
    } else if (from == "Octal") {
        let decimal = OctalToDecimal(num);
        switch (to) {
            case "Decimal":
                answer = decimal;
                break;
            case "Binary":
                answer = decimalToBinary(decimal);
                break;
            case "Hex":
                answer = decimalToHex(decimal);
                break;
        }
    } else if (from == "Hex") {
        let decimal = HexToDecimal(num);
        switch (to) {
            case "Decimal":
                answer = decimal;
                break;
            case "Binary":
                answer = decimalToBinary(decimal);
                break;
            case "Octal":
                answer = decimalToOctal(decimal);
                break;
        }
    }

    document.getElementById("output").innerText = answer;
}