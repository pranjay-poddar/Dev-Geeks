// Initial References
let result = document.getElementById("result");
let btn = document.getElementById("get-leap-years");

// Function calculate the leap year and send response to the user
function leapYearCalc() {
    // Get values from the input fields
    // Number() converts string value to number
    let startYear = Number(document.getElementById("start-year").value);
    let endYear = Number(document.getElementById("end-year").value);

    // If both start and end year are invalid
    if (
        (startYear < 1582 || startYear > 2999) &&
        (endYear < 1582 || endYear > 2999)
    ) {
        result.innerHTML = `<b style="color: red;">The start year and end year should be greater than 1581 and less than 3000.</b>`;
    }

    // If start year is greater than end year
    else if (startYear > endYear) {
        result.innerHTML = `<b style="color: red;">End year should be greater than the start year.</b>`;
    }

    // If start year is invalid
    else if (startYear < 1582 || startYear > 2999) {
        result.innerHTML = `<b style="color: red;">The start year should be greater than 1581 and less than 3000.</b>`;
    }

    // If end year is invalid
    else if (endYear < 1582 || endYear > 2999) {
        result.innerHTML = `<b style="color: red;">The end year should be greater than 1581 and less than 3000.</b>`;
    }

    // If both start and end years are valid
    else {
        // Empty array to store the leap years
        let leapYears = [];
        for (let i = startYear; i <= endYear; i++) {
            // Determine if a year is a leap year
            // If true push it into leapYears[]

            if ((i % 4 == 0 && i % 100 != 0) || i % 400 == 0) {
                leapYears.push(i);
            }
        }
        // Display leap years in result div
        // toString() returns a string with comma seperated values
        // Use combo of split() and join() to replace ',' with ', '
        result.innerHTML = `<b style="color: #f5c431;">There are ${leapYears.length
            } leap years between ${startYear} & ${endYear}.</b><span>${leapYears
                .toString()
                .split(",")
                .join(", ")}</span>`;
    }
}

// Get Leap years when the button is clicked
btn.addEventListener('click', leapYearCalc);

// Get leap years when enter button is pressed
document.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        leapYearCalc();
    }
});
