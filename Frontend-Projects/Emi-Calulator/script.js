const loanAmount = document.querySelector("#amount-input");
const interestRate = document.querySelector("#interest-rate");
const monthInput = document.querySelector("#month-input");
const emiBtn = document.querySelector("#emi-Btn");
const output = document.querySelector("#output");

function EmiCalculate(amount, rate, months) {
  const monthlyRate = rate / 1200;

  console.log(monthlyRate);

  const numPayments = months * 12;

  console.log(numPayments);

  const EMI =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  return Math.round(EMI);
}

function showEmi() {
  let Emi = EmiCalculate(
    parseFloat(loanAmount.value),
    parseFloat(interestRate.value),
    parseFloat(monthInput.value)
  );

  output.innerHTML = `Emi ${Emi}`;
}

emiBtn.addEventListener("click", showEmi);

function updateAmount() {
  var rangeInput = document.getElementById("range-input");
  var numberOutput = document.getElementById("amount-input");
  numberOutput.value = rangeInput.value;
}

function updateInterest() {
  var rangeOutput = document.querySelector("#interest-rate");
  var interestInput = document.querySelector("#interest-input");

  rangeOutput.value = interestInput.value;
}

function updateMonth() {
  const monthOutput = document.querySelector("#month-input");
  const monthInput = document.querySelector("#month");
  monthOutput.value = monthInput.value;
}
