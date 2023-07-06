export function getInsertionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  help(array, 0, array.length, auxiliaryArray, animations);
  return animations;
}

function help(mainArray, startind, endind, auxArray, animations) {
  let i, key, j;
  for (i = 1; i < endind; i++) {
    key = auxArray[i];
    j = i - 1;
    while (j >= 0 && auxArray[j] > key) {
      animations.push([j, j + 1]);
      animations.push([j, j + 1]);

      animations.push([j + 1, auxArray[j]]);
      auxArray[j + 1] = auxArray[j];
      j = j - 1;
    }
    animations.push([j, j + 1]);
    animations.push([j, j + 1]);

    animations.push([j + 1, key]);
    auxArray[j + 1] = key;
  }
}
