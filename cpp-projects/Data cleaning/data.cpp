#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <string>

using namespace std;

// Function to split a string into a vector of substrings based on a delimiter
vector<string> splitString(const string& s, char delimiter) {
    vector<string> tokens;
    stringstream ss(s);
    string token;
    while (getline(ss, token, delimiter)) {
        tokens.push_back(token);
    }
    return tokens;
}

int main() {
    // Open the input CSV file for reading
    ifstream inputFile("input.csv");

    // Open the output CSV file for writing the cleaned data
    ofstream outputFile("cleaned_data.csv");

    // Check if both files were opened successfully
    if (!inputFile) {
        cout << "Error opening input file." << endl;
        return 1;
    }

    if (!outputFile) {
        cout << "Error creating output file." << endl;
        return 1;
    }

    string line;
    while (getline(inputFile, line)) {
        // Split the line into individual values based on the comma delimiter
        vector<string> data = splitString(line, ',');

        bool hasMissingValue = false;

        // Check if any value is empty (missing)
        for (const string& value : data) {
            if (value.empty()) {
                hasMissingValue = true;
                break;
            }
        }

        // If the row doesn't have any missing values, write it to the output file
        if (!hasMissingValue) {
            outputFile << line << "\n";
        }
    }

    // Close both input and output files
    inputFile.close();
    outputFile.close();

    return 0;
}

