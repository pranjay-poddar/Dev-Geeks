function generateTriplets() {
  const rangeInput = document.getElementById('range');
  const range = parseInt(rangeInput.value);

  if (isNaN(range) || range <= 0) {
    alert('Please enter a valid positive number.');
    return;
  }

  let triplets = [];
  for (let a = 1; a <= range; a++) {
    for (let b = a + 1; b <= range; b++) {
      const c = Math.sqrt(a * a + b * b);
      if (Number.isInteger(c) && c <= range) {
        triplets.push([a, b, c]);
      }
    }
  }

  displayTriplets(triplets);
}

function displayTriplets(triplets) {
  const resultDiv = document.getElementById('result');
  let resultHTML = '<h2>Pythagorean Triplets</h2>';
  if (triplets.length > 0) {
    resultHTML += '<ul>';
    for (const triplet of triplets) {
      resultHTML += `<li>${triplet.join(', ')}</li>`;
    }
    resultHTML += '</ul>';
  } else {
    resultHTML += '<p>No Pythagorean triplets found within the given range.</p>';
  }
  resultDiv.innerHTML = resultHTML;
}
