var digit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
var denominations = ["", "Thousand", "Million", "Billion", "Trillion"];
var tens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
var ties = ["Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

let inputBox = document.getElementById('input-box');
let outputBox = document.getElementsByTagName('p')[0];

var input;

function getValue() {
    input = inputBox.value;

    // Conditions to check the entered value is under the length of 15 and contains only digits
    if (!/^\d+$/.test(input) && input.length > 0) {
        outputBox.innerHTML = "Invalid input. Please enter only digits.";
        outputBox.style.color = 'red';
        return;
    } else if (input.length > 15) {
        outputBox.innerHTML = "Too Large Number.";
        outputBox.style.color = 'red';
        return;
    }
    outputBox.style.color = 'black';
    outputBox.innerHTML = "";
    while (input.length % 3 !== 0) {
        input = "0" + input;
    }
    input = reverseString(input);
    if (input === "000")
        outputBox.innerHTML = "Zero";
    else
        outputBox.innerHTML = convert(0, 0);
}

function add(s1, s2) {
    if (s1.length && s2.length)
        return s1 + " " + s2;
    return s1 + s2;
}

// Main function which will return the result and work recursively
function convert(idx, level) {
    if (idx >= input.length)
        return "";
    let cur = "";
    let od = parseInt(input[idx]), td = parseInt(input[idx + 1]), hd = parseInt(input[idx + 2]);
    if (hd)
        cur = add(cur, add(digit[hd], "Hundred"));
    if (td) {
        if (td == 1)
            cur = add(cur, tens[od]);
        else {
            cur = add(cur, ties[td - 1]);
            if (od) cur = add(cur, digit[od]);
        }
    }
    else if (od)
        cur = add(cur, digit[od]);
    if (cur != "")
        cur = add(cur, denominations[level]);
    return add(convert(idx + 3, level + 1), cur);
}

function reverseString(str) {
    return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0);
}