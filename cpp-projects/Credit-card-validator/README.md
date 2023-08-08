# Credit Card Validator

This is a simple C++ program that uses the Luhn Algorithm to validate a Credit Card (CC) number.

## How it Works

The program follows the steps of the Luhn Algorithm to validate the Credit Card (CC) number:

1. Double every second digit, starting from the right. If it results in a two-digit number, add both the digits to obtain a single-digit number. Sum all the answers to obtain 'doubleEvenSum'.

2. Add every odd-placed digit from the right to the 'doubleEvenSum'.

3. Check if the final 'doubleEvenSum' is a multiple of 10. If yes, it is a valid CC number; otherwise, it is invalid.

This algorithm is widely used to validate credit card numbers and helps in detecting common input errors or fraudulent card numbers. The program takes care of bad inputs and provides a user-friendly interface for validation.

## Usage

1. Compile the program using a C++ compiler.

2. Run the executable file.

3. Enter the Credit Card number to validate.

4. The program will display whether the Credit Card number is valid or invalid.




