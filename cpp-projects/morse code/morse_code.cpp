#include <iostream>
#include <map>
#include <sstream>

using namespace std;

// Morse Code Dictionary
map<char, string> morseCodeDictionary = {
    {'A', ".-"},
    {'B', "-..."},
    {'C', "-.-."},
    {'D', "-.."},
    {'E', "."},
    {'F', "..-."},
    {'G', "--."},
    {'H', "...."},
    {'I', ".."},
    {'J', ".---"},
    {'K', "-.-"},
    {'L', ".-.."},
    {'M', "--"},
    {'N', "-."},
    {'O', "---"},
    {'P', ".--."},
    {'Q', "--.-"},
    {'R', ".-."},
    {'S', "..."},
    {'T', "-"},
    {'U', "..-"},
    {'V', "...-"},
    {'W', ".--"},
    {'X', "-..-"},
    {'Y', "-.--"},
    {'Z', "--.."},
    {'0', "-----"},
    {'1', ".----"},
    {'2', "..---"},
    {'3', "...--"},
    {'4', "....-"},
    {'5', "....."},
    {'6', "-...."},
    {'7', "--..."},
    {'8', "---.."},
    {'9', "----."},
    {' ', "/"}
};

// Function to convert text to Morse code
string textToMorseCode(const string& text) {
    string morseCode;
    for (char c : text) {
        if (morseCodeDictionary.count(toupper(c)) > 0) {
            morseCode += morseCodeDictionary[toupper(c)] + " ";
        }
    }
    return morseCode;
}

// Function to convert Morse code to text
string morseCodeToText(const string& morseCode) {
    string text;
    stringstream ss(morseCode);
    string token;
    while (getline(ss, token, ' ')) {
        for (const auto& pair : morseCodeDictionary) {
            if (pair.second == token) {
                text += pair.first;
                break;
            }
        }
    }
    return text;
}

int main() {
    cout << "Morse Code Translator" << endl;
    cout << "====================" << endl;

    int choice;
    string input;

    do {
        cout << endl;
        cout << "1. Convert Text to Morse Code" << endl;
        cout << "2. Convert Morse Code to Text" << endl;
        cout << "3. Exit" << endl;
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice) {
            case 1:
                cout << "Enter text to convert to Morse code: ";
                cin.ignore();
                getline(cin, input);
                cout << "Morse code: " << textToMorseCode(input) << endl;
                break;
            case 2:
                cout << "Enter Morse code to convert to text: ";
                cin.ignore();
                getline(cin, input);
                cout << "Text: " << morseCodeToText(input) << endl;
                break;
            case 3:
                cout << "Exiting program..." << endl;
                break;
            default:
                cout << "Invalid choice. Please try again." << endl;
        }
    } while (choice != 3);

    return 0;
}
