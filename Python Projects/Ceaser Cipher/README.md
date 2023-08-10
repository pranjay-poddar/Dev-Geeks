# Caesar Cipher Encryption and Decryption

This Python code implements a simple Caesar Cipher encryption and decryption program. The Caesar Cipher is a substitution cipher in which each letter in the plaintext is shifted a certain number of positions down the alphabet.

## How it works

The code consists of the following functions:

1. `getDoubleAlphabet(alphabet)`: This function takes an `alphabet` (a string containing all the letters of the alphabet) as input and returns a new string containing the `alphabet` repeated twice. This is used to handle wrapping around the end of the alphabet during encryption and decryption.

2. `getMessage()`: This function prompts the user to input a message to encrypt and returns the entered message as a string.

3. `getCipherKey()`: This function prompts the user to enter a key (a whole number from 1 to 25) for encryption and returns the entered key as an integer.

4. `encryptMessage(message, cipherKey, alphabet)`: This function takes a `message`, a `cipherKey`, and the `alphabet` as inputs and performs Caesar Cipher encryption on the message. It returns the encrypted message as a string.

5. `decryptMessage(message, cipherKey, alphabet)`: This function takes an `encryptedMessage`, a `cipherKey`, and the `alphabet` as inputs and performs decryption using the same key but in reverse. It returns the decrypted message as a string.

6. `runCaesarCipherProgram()`: This function runs the entire Caesar Cipher program. It initializes the `myAlphabet` variable with the uppercase alphabet, gets the double alphabet using `getDoubleAlphabet`, prompts the user for a message and cipher key, performs encryption and decryption, and prints the results.

## How to use

1. Clone or download the Python file and save it as `encrypt_message.py`.

2. Run the code in a Python environment.

3. Follow the prompts to enter the message you want to encrypt and the cipher key (a number from 1 to 25).

4. The program will then perform encryption and decryption on the message using the provided key and display the results.

## Screenshot
![Screenshot](https://github.com/amelia2802/Dev-Geeks/assets/49182604/bbd2b93f-03ae-4288-8945-95e68c37114a)

