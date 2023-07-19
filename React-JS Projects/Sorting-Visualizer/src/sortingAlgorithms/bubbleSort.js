export function getBubbleSortAnimations(array) {
  const animations = []; // Animations array

  // Base Case
  if (array.length <= 1) {
    return;
  }
  // Helper function
  help(array, 0, array.length, array.slice(), animations);

  return animations;
}

// Creates the animations array
function help(
  mainArray, start, end, auxArray, animations) 
  {
  let i, j;
  for (i = 0; i < end - 1; i++) {
    for (j = 0; j < end - i - 1; j++) {
      // To show the comparion
      animations.push([i, j]);
      // To change back to original colors
      animations.push([i, j]);

      if (auxArray[j] > auxArray[j + 1]) {
        // To update the changes
        animations.push([j, auxArray[j + 1]]);
        const temp = auxArray[j];
        auxArray[j] = auxArray[j + 1];
        auxArray[j + 1] = temp;
      } else {
        // If no changes, then also we push to show that
        // the array are in correct order
        animations.push([j, auxArray[j]]);
      }
    }

    // Process to show changes in the last 2 bars
    animations.push([i, j]);
    animations.push([i, j]);
    animations.push([end - i - 1, auxArray[end - i - 1]]);
  }
}
