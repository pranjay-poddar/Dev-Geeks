#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <string>
#include <unordered_map>

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
    ifstream inputFile("data.csv");
    ofstream outputFile("aggregated_data.csv");

    if (!inputFile) {
        cout << "Error opening input file." << endl;
        return 1;
    }

    if (!outputFile) {
        cout << "Error creating output file." << endl;
        return 1;
    }

    // Map to store aggregated data
    unordered_map<string, int> sumMap;
    unordered_map<string, int> countMap;

    string line;
    getline(inputFile, line); // Skip the header line

    while (getline(inputFile, line)) {
        vector<string> data = splitString(line, ',');
        if (data.size() < 2) {
            continue; // Skip rows with incomplete data
        }

        string groupKey = data[0]; // The column used for grouping

        try {
            int value = stoi(data[1]); // The value to be aggregated (assuming integer values)

            // Update the sum and count for the current group
            sumMap[groupKey] += value;
            countMap[groupKey]++;
        } catch (const std::invalid_argument& e) {
            // Handle the invalid_argument exception (e.g., log the error or skip the row)
            cout << "Error: Invalid argument. Row skipped.\n";
            continue;
        }
    }

    inputFile.close();

    // Write aggregated results to the output file
    outputFile << "Group,Sum,Count,Average\n";
    for (const auto& pair : sumMap) {
        const string& groupKey = pair.first;
        int sum = pair.second;
        int count = countMap[groupKey];
        double average = static_cast<double>(sum) / count;

        outputFile << groupKey << "," << sum << "," << count << "," << average << "\n";
    }

    outputFile.close();

    return 0;
}
