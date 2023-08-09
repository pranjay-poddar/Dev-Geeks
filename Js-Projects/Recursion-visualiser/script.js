const numberInput = document.getElementById("number");
const startButton = document.getElementById("start-btn");
const fibonacciButton = document.getElementById("fibonacci-btn");
const powerButton = document.getElementById("power-btn");
const sumArrayButton = document.getElementById("sum-array-btn");
const resultElement = document.getElementById("result");

function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function fibonacci(n) {
  if (n <= 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

function power(base, exponent) {
  if (exponent === 0) {
    return 1;
  } else {
    return base * power(base, exponent - 1);
  }
}

function sumArray(arr, n) {
  if (n <= 0) {
    return 0;
  } else {
    return arr[n - 1] + sumArray(arr, n - 1);
  }
}

function showFactorialVisualization(n) {
  const visualizationSteps = [];

  function recursiveFactorial(n) {
    if (n === 0) {
      visualizationSteps.push({ num: n, call: "Factorial(0) = 1", level: 0 });
      return 1;
    } else {
      visualizationSteps.push({ num: n, call: `Factorial(${n}) = ${n} * Factorial(${n - 1})`, level: n });
      return n * recursiveFactorial(n - 1);
    }
  }

  recursiveFactorial(n);
  return visualizationSteps;
}

function showFibonacciVisualization(n) {
  const visualizationSteps = [];

  function recursiveFibonacci(n) {
    if (n <= 0) {
      visualizationSteps.push({ num: n, call: "Fibonacci(0) = 0", level: 0 });
      return 0;
    } else if (n === 1) {
      visualizationSteps.push({ num: n, call: "Fibonacci(1) = 1", level: 1 });
      return 1;
    } else {
      visualizationSteps.push({ num: n, call: `Fibonacci(${n}) = Fibonacci(${n - 1}) + Fibonacci(${n - 2})`, level: n });
      return recursiveFibonacci(n - 1) + recursiveFibonacci(n - 2);
    }
  }

  recursiveFibonacci(n);
  return visualizationSteps;
}

function showPowerVisualization(base, exponent) {
  const visualizationSteps = [];

  function recursivePower(base, exponent) {
    if (exponent === 0) {
      visualizationSteps.push({ call: `${base}^0 = 1`, level: 0 });
      return 1;
    } else {
      visualizationSteps.push({ call: `${base}^${exponent} = ${base} * ${base}^${exponent - 1}`, level: exponent });
      return base * recursivePower(base, exponent - 1);
    }
  }

  recursivePower(base, exponent);
  return visualizationSteps;
}

function showSumArrayVisualization(arr, n) {
  const visualizationSteps = [];

  function recursiveSumArray(n) {
    if (n <= 0) {
      return 0;
    } else {
      const currentSum = arr[n - 1] + recursiveSumArray(n - 1);
      visualizationSteps.push({ call: `Sum of [${arr.slice(0, n).join(", ")}] = ${currentSum}`, level: n });
      return currentSum;
    }
  }

  recursiveSumArray(n);
  return visualizationSteps;
}

function visualizeFactorial() {
  const num = parseInt(numberInput.value);
  if (isNaN(num) || num < 0) {
    alert("Please enter a non-negative integer.");
    return;
  }

  const steps = showFactorialVisualization(num);
  resultElement.innerHTML = "";

  function createVisualizationStep(step) {
    const stepDiv = document.createElement("div");
    stepDiv.classList.add("step");
    stepDiv.style.backgroundColor = `rgba(0, 123, 255, ${(step.level / num).toFixed(2)})`;
    stepDiv.textContent = step.call;
    resultElement.appendChild(stepDiv);
  }

  async function showNextStep(index) {
    if (index < steps.length) {
      createVisualizationStep(steps[index]);
      index++;
      await new Promise(resolve => setTimeout(resolve, 1500)); // Adjust this value to make the visualization slower
      await showNextStep(index);
    } else {
      resultElement.innerHTML = `Factorial(${num}) = ${factorial(num)}`;
    }
  }

  showNextStep(0);
}

function visualizeFibonacci() {
  const num = parseInt(numberInput.value);
  if (isNaN(num) || num < 0) {
    alert("Please enter a non-negative integer.");
    return;
  }

  const steps = showFibonacciVisualization(num);
  resultElement.innerHTML = "";

  function createVisualizationStep(step) {
    const stepDiv = document.createElement("div");
    stepDiv.classList.add("step");
    stepDiv.style.backgroundColor = `rgba(255, 165, 0, ${(step.level / num).toFixed(2)})`;
    stepDiv.textContent = step.call;
    resultElement.appendChild(stepDiv);
  }

  async function showNextStep(index) {
    if (index < steps.length) {
      createVisualizationStep(steps[index]);
      index++;
      await new Promise(resolve => setTimeout(resolve, 1500)); // Adjust this value to make the visualization slower
      await showNextStep(index);
    } else {
      resultElement.innerHTML = `Fibonacci(${num}) = ${fibonacci(num)}`;
    }
  }

  showNextStep(0);
}

function visualizePower() {
  const base = parseInt(numberInput.value);
  const exponent = parseInt(prompt("Enter the exponent:"));
  if (isNaN(base) || isNaN(exponent)) {
    alert("Please enter valid numbers.");
    return;
  }

  const steps = showPowerVisualization(base, exponent);
  resultElement.innerHTML = "";

  function createVisualizationStep(step) {
    const stepDiv = document.createElement("div");
    stepDiv.classList.add("step");
    stepDiv.style.backgroundColor = `rgba(0, 123, 255, ${(step.level / (exponent + 1)).toFixed(2)})`;
    stepDiv.textContent = step.call;
    resultElement.appendChild(stepDiv);
  }

  async function showNextStep(index) {
    if (index < steps.length) {
      createVisualizationStep(steps[index]);
      index++;
      await new Promise(resolve => setTimeout(resolve, 1500)); // Adjust this value to make the visualization slower
      await showNextStep(index);
    } else {
      resultElement.innerHTML = `${base}^${exponent} = ${power(base, exponent)}`;
    }
  }

  showNextStep(0);
}

function visualizeSumArray() {
  const inputNumbers = document.getElementById("array-input").value;
  const arr = inputNumbers.split(",").map(num => parseInt(num.trim()));
  if (!arr.every(Number.isInteger)) {
    alert("Please enter valid comma-separated numbers in the array.");
    return;
  }

  const n = arr.length;
  const steps = showSumArrayVisualization(arr, n);
  resultElement.innerHTML = "";

  function createVisualizationStep(step) {
    const stepDiv = document.createElement("div");
    stepDiv.classList.add("step");
    stepDiv.style.backgroundColor = `rgba(0, 123, 255, ${(step.level / (n + 1)).toFixed(2)})`;
    stepDiv.textContent = step.call;
    resultElement.appendChild(stepDiv);
  }

  async function showNextStep(index) {
    if (index < steps.length) {
      createVisualizationStep(steps[index]);
      index++;
      await new Promise(resolve => setTimeout(resolve, 1500)); // Adjust this value to make the visualization slower
      await showNextStep(index);
    } else {
      resultElement.innerHTML = `Sum of [${arr.join(", ")}] = ${sumArray(arr, n)}`;
    }
  }

  showNextStep(0);
}

startButton.addEventListener("click", visualizeFactorial);
fibonacciButton.addEventListener("click", visualizeFibonacci);
powerButton.addEventListener("click", visualizePower);
sumArrayButton.addEventListener("click", visualizeSumArray);
