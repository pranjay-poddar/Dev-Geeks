#include <iostream>
#include <vector>
#include <string>
#include <cstdlib>
#include <ctime>

using namespace std;

// Function to generate a random number between 'min' and 'max'
int generateRandomNumber(int min, int max) {
    return min + rand() % (max - min + 1);
}

// Function to shuffle the order of options
void shuffleOptions(vector<string>& options) {
    srand(time(nullptr));
    for (int i = 0; i < options.size(); i++) {
        int j = generateRandomNumber(0, i);
        swap(options[i], options[j]);
    }
}

// Function to display a question and its options
void displayQuestion(const string& question, const vector<string>& options) {
    cout << question << endl;
    for (int i = 0; i < options.size(); i++) {
        cout << options[i] << endl;
    }
    cout << endl;
}

int main() {
    int score = 0;  // Variable to store the score
    int lifelineScore = 0;  // Variable to store the lifeline penalty
    int lifeline5050 = 1;  // Variable to track the remaining 50-50 lifelines
    int lifelineHint = 1;  // Variable to track the remaining hint lifelines

    // Questions and answers
   vector<string> questions = {
    "1. Which of the following is a valid C++ data type?",
    "2. What is the output of the following code?\n\n#include <iostream>\n\nint main() {\n    int num = 10;\n    cout << num << endl;\n    return 0;\n}",
    "3. What is the result of the expression 5 + 7 * 3?",
    "4. How do you declare a constant variable in C++?",
    "5. Which C++ keyword is used to dynamically allocate memory?",
    "6. What is the size of 'int' data type in C++?",
    "7. What is the correct way to define a function outside a class in C++?",
    "8. What does the 'const' keyword indicate in C++?",
    "9. What is the output of the following code?\n\n#include <iostream>\n\nint main() {\n    int x = 5;\n    int y = ++x;\n    cout << y << endl;\n    return 0;\n}",
    "10. Which header file is needed to work with strings in C++?"
};
vector<vector<string>> options = {
    {"A) float", "B) string", "C) boolean", "D) int"},
    {"A) 0", "B) 10", "C) Garbage value", "D) Compiler error"},
    {"A) 26", "B) 56", "C) 22", "D) 15"},
    {"A) const int x;", "B) final int x;", "C) int constant x;", "D) const x;"},
    {"A) new", "B) alloc", "C) malloc", "D) allocate"},
    {"A) 4 bytes", "B) 8 bytes", "C) 2 bytes", "D) Depends on the compiler"},
    {"A) return_type function_name(arguments) { }", "B) function_name(arguments) { return return_type; }", "C) return_type function_name { }", "D) function_name { return_type; }"},
    {"A) It indicates that the value of the variable cannot be changed.", "B) It indicates that the variable is a constant pointer.", "C) It indicates that the function cannot modify the object it is called on.", "D) It indicates that the variable is only accessible within the current block."},
    {"A) 6", "B) 5", "C) 10", "D) Garbage value"},
    {"A) <string>", "B) <cstring>", "C) <iostream>", "D) <string.h>"}
};
vector<int> correctAnswers = {4, 2, 1, 1, 1, 2, 1, 1, 2, 1};

    cout << "Welcome to the C++ Quiz Game!" << endl;
    cout << "---------------------------------" << endl;
    cout << "Rules:" << endl;
    cout << "- You will be asked 10 multiple-choice questions about C++." << endl;
    cout << "- Each correct answer scores 3 points." << endl;
    cout << "- If you use a lifeline, you will lose 1 point." << endl;
    cout << "- You have two lifelines: 50-50 and Hint." << endl;
    cout << "- The 50-50 lifeline will eliminate two incorrect options." << endl;
    cout << "- The Hint lifeline will provide a hint about the answer." << endl;
    cout << "---------------------------------" << endl;

    // Loop through the questions
    for (int i = 0; i < questions.size(); i++) {
        cout << "Question " << (i + 1) << ":" << endl;
        displayQuestion(questions[i], options[i]);

        // User input for lifelines
        string choice;
        cout << "Enter your choice (A, B, C, D) or 'L' for lifelines: ";
        cin >> choice;

        // Lifeline menu
        if (choice == "L") {
            cout << "Lifelines: " << endl;
            cout << "1) 50-50" << (lifeline5050 > 0 ? " (Available)" : " (Not available)") << endl;
            cout << "2) Hint" << (lifelineHint > 0 ? " (Available)" : " (Not available)") << endl;
            cout << "Enter the number of the lifeline you want to use: ";
            int lifelineChoice;
            cin >> lifelineChoice;

            // 50-50 lifeline
            if (lifelineChoice == 1) {
                if (lifeline5050 > 0) {
                    lifeline5050--;
                    lifelineScore--;
                    vector<string> currentOptions = options[i];
                    int correctOption = correctAnswers[i] - 1;
                    int eliminatedCount = 0;

                    while (eliminatedCount < 2) {
                        int randomOption = generateRandomNumber(0, currentOptions.size() - 1);
                        if (randomOption != correctOption && currentOptions[randomOption] != "") {
                            currentOptions[randomOption] = "";
                            eliminatedCount++;
                        }
                    }

                    // Display the updated options
                    displayQuestion(questions[i], currentOptions);

                    // Ask for the correct answer after using 50-50 lifeline
                    string lifelineAnswer;
                    cout << "Enter the correct option (A, B, C, D): ";
                    cin >> lifelineAnswer;

                    int selectedOption = lifelineAnswer[0] - 'A' + 1;
                    if (selectedOption == correctAnswers[i]) {
                        score += 3;
                        cout << "Correct answer! You scored 3 points." << endl;
                    } else {
                        cout << "Wrong answer!" << endl;
                    }
                } else {
                    cout << "Sorry, you have no 50-50 lifelines left!" << endl;
                    i--;
                    continue;
                }
            }
            // Hint lifeline
            else if (lifelineChoice == 2) {
                if (lifelineHint > 0) {
                    lifelineHint--;
                    lifelineScore--;
                    cout << "Here's a hint: ..." << endl; // Add your hint logic here

                    // Ask for the correct answer after using the hint lifeline
                    string lifelineAnswer;
                    cout << "Enter the correct option (A, B, C, D): ";
                    cin >> lifelineAnswer;

                    int selectedOption = lifelineAnswer[0] - 'A' + 1;
                    if (selectedOption == correctAnswers[i]) {
                        score += 3;
                        cout << "Correct answer! You scored 3 points." << endl;
                    } else {
                        cout << "Wrong answer!" << endl;
                    }
                } else {
                    cout << "Sorry, you have no Hint lifelines left!" << endl;
                    i--;
                    continue;
                }
            }
            // Invalid lifeline choice
            else {
                cout << "Invalid lifeline choice!" << endl;
                i--;
                continue;
            }
        }
        // Answer logic
        else if (choice == "A" || choice == "B" || choice == "C" || choice == "D") {
            int selectedOption = choice[0] - 'A' + 1;
            if (selectedOption == correctAnswers[i]) {
                score += 3;
                cout << "Correct answer! You scored 3 points." << endl;
            } else {
                cout << "Wrong answer!" << endl;
            }
        }
        // Invalid input
        else {
            cout << "Invalid choice!" << endl;
            i--;
            continue;
        }

        cout << "---------------------------------" << endl;
    }

    // Calculate the final score
    score += lifelineScore;

    cout << "Quiz completed!" << endl;
    cout << "Your final score is: " << score << endl;

    return 0;
}
