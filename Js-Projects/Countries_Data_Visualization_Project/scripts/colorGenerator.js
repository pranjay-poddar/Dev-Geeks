const fileSystem = require('fs')

var importColorJS = require('../data/colors');

const colors = importColorJS.colors;

const prompt = require("prompt-sync")({ sigint: true });

const rangeOfShade = prompt('Enter a shade value to generate: ');

const filteredKeysOfColorCodes = Object.keys(colors).filter(color => color.includes(rangeOfShade))
                                                    .filter(colorKey => colors[colorKey].includes('#'));


const filteredColorCodes = filteredKeysOfColorCodes.map(colorKey => colors[colorKey])



// Convert data array to a JSON string with variable declaration
const data = `const colorCodes = ${JSON.stringify(filteredColorCodes)};`

// Write data to file in data folder
fileSystem.writeFile('../data/generatedColors.js', data, (err) => {
  if (err) throw err;
  console.log('Data written to file!');
});