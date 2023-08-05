const str = document.querySelector("#homeHeader > h2");
const dayDesc = document.querySelector("#dayDesc");
let txt = "Welcome to the Reminder Application <<username>>"
let txtlen = txt.length;
let pos = -1;
let t = setInterval(move, 200);
function move() {
    pos++;
    str.innerHTML += txt.charAt(pos);
    if (pos == txtlen) {
        clearInterval(t);
    }
}
function dayName(n){
    switch (n) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thrusday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            break;
    }

}
function monthName(n){
    switch (n) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
        default:
            break;
    }

}
function postfixDate(n){
    if(n==1)
    return "th";
    else if(n==2)
    return "nd";
    else if(n==3)
    return "rd";
    else
    return "th"
}
let date = new Date();
dayDesc.innerText=`Today is ${dayName(date.getDay())}, ${date.getDate()}${postfixDate(date.getDate())} Of ${monthName(date.getMonth())}.`
