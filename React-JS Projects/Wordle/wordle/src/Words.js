// Importing the word bank file for generating the word set
import wordBank from "./wordle-bank.txt";

// Default game board structure with 6 rows and 5 columns
export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

// Function to generate a set of words from the word bank file
export const generateWordSet = async () => {
  let wordSet; // A set to store the words from the word bank
  let todaysWord; // The word randomly selected for the game

  // Fetch the word bank file and process its contents
  await fetch(wordBank)
    .then((response) => response.text()) // Get the text content from the response
    .then((result) => {
      const wordArr = result.split("\n"); // Split the content into an array of words
      todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)]; // Select a random word from the array
      wordSet = new Set(wordArr); // Create a set from the array to ensure unique words
    });

  // Return the generated word set and the word randomly chosen for the game
  return { wordSet, todaysWord };
};
