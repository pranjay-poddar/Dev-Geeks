const txtInput = document.querySelector(".inputs input"),
checkBtn = document.querySelector(".inputs button"),
infoTxt = document.querySelector(".info-txt");
let filterInput;


// javascript program to check if x is a perfect square

// A utility function that returns true if x is perfect square
function isPerfectSquare( x)
{
	let s = parseInt(Math.sqrt(x));
	return (s * s == x);
}

// Returns true if n is a Fibonacci Number, else false
function isFibonacci( n)
{

	// n is Fibonacci if one of 5*n*n + 4 or 5*n*n - 4 or both
	// is a perfect square
	return isPerfectSquare(5 * n * n + 4) ||
		isPerfectSquare(5 * n * n - 4);
}
function spy(value) {

    sum = 0;
    prod=1;

while (value) {
  sum += value % 10;
  prod=prod*value%10;
  value = Math.floor(value / 10);
}
return (sum==prod);
}
// A utility function to test above functions
function isString(value) {
	return typeof value === 'string' || value instanceof String;
}



checkBtn.addEventListener("click", () => {
    let n = filterInput;
    console.log(typeof n);

    console.log(isFibonacci(n));
    infoTxt.style.display = "block";
    // if(isString(n)===true){
    //     return infoTxt.innerHTML = `Enter a valid input`
    // }
    // else{
    if(spy(n)===true) {
        return infoTxt.innerHTML = `Yes, <span>'${txtInput.value}'</span> is Spy number`;
    }
    infoTxt.innerHTML = `NO, <span>'${txtInput.value}'</span> is not a Spy number`;

});

txtInput.addEventListener("keyup", () => {
    filterInput = txtInput.value.toLowerCase().replace(/[^A-Z0-9]/ig, "");
    if(filterInput) {
        return checkBtn.classList.add("active");
    }
    infoTxt.style.display = "none";
    checkBtn.classList.remove("active");
});