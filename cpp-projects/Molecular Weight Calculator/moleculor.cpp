#include <iostream>
#include <string>
#include <map>
#include <cctype> // for isdigit()

using namespace std;

struct ElementInfo {
    string name;
    string symbol;
};

// Function prototype for calculateMolecularWeight
double calculateMolecularWeight(const string& formula, const map<char, double>& atomicWeights);

// Function to validate the chemical formula
bool isValidFormula(const string& formula, const map<char, double>& atomicWeights) {
    for (size_t i = 0; i < formula.length(); ++i) {
        char symbol = formula[i];
        if (isupper(symbol)) {
            // Check if the next character is lowercase to form a two-letter symbol (e.g., Fe, Na)
            char nextChar = (i + 1 < formula.length()) ? formula[i + 1] : '\0';
            if (islower(nextChar)) {
                symbol = symbol * 256 + nextChar; // Combine the two characters into a single code
                i++; // Skip the next character since it's part of the two-letter symbol
            }

            // Check if the symbol is valid (exists in the atomicWeights map)
            if (atomicWeights.find(symbol) == atomicWeights.end()) {
                return false;
            }
        } else if (!isdigit(symbol)) {
            // Invalid character in the formula
            return false;
        }
    }

    return true;
}

// Function to display additional information about an element
void displayElementInfo(char symbol, const map<char, ElementInfo>& elementInfo) {
    if (elementInfo.find(symbol) != elementInfo.end()) {
        cout << "Element Information:" << endl;
        cout << "Name: " << elementInfo.at(symbol).name << endl;
        cout << "Symbol: " << elementInfo.at(symbol).symbol << endl;
    } else {
        cout << "Element information not available for symbol '" << symbol << "'." << endl;
    }
}

// Function to display the atomic weights of elements
void displayAtomicWeights(const map<char, double>& atomicWeights) {
    cout << "Element\tAtomic Weight (g/mol)" << endl;
    for (const auto& entry : atomicWeights) {
        cout << entry.first << "\t" << entry.second << endl;
    }
}

// Function to calculate the molecular weight of a chemical formula
double calculateMolecularWeight(const string& formula, const map<char, double>& atomicWeights) {
    double molecularWeight = 0.0;
    int numAtoms = 0;

    for (size_t i = 0; i < formula.length(); ++i) {
        char symbol = formula[i];
        if (isupper(symbol)) {
            // Check if the next character is lowercase to form a two-letter symbol (e.g., Fe, Na)
            char nextChar = (i + 1 < formula.length()) ? formula[i + 1] : '\0';
            if (islower(nextChar)) {
                symbol = symbol * 256 + nextChar; // Combine the two characters into a single code
                i++; // Skip the next character since it's part of the two-letter symbol
            }

            // Get the atomic weight of the element
            double atomicWeight = atomicWeights.at(symbol);
            numAtoms = 1; // Reset the atom count for the current element

            // Check if the element has a subscript (more than one atom)
            if (i + 1 < formula.length() && isdigit(formula[i + 1])) {
                i++; // Move to the digit after the element symbol
                // Convert the subscript to an integer
                numAtoms = formula[i] - '0';

                // If there are more digits, combine them to form a multi-digit subscript
                while (i + 1 < formula.length() && isdigit(formula[i + 1])) {
                    i++;
                    numAtoms = numAtoms * 10 + (formula[i] - '0');
                }
            }

            // Add the contribution of the current element to the molecular weight
            molecularWeight += atomicWeight * numAtoms;
        }
    }

    return molecularWeight;
}

int main() {
    // Define atomic weights of elements (using molar mass in g/mol)
    map<char, double> atomicWeights;
    atomicWeights['H'] = 1.0079;
    atomicWeights['C'] = 12.0107;
    atomicWeights['O'] = 15.9994;
    atomicWeights['N'] = 14.0067;
    atomicWeights['He'] = 4.0026; // Helium
    atomicWeights['Li'] = 6.941;  // Lithium
    atomicWeights['Na'] = 22.9897;// Sodium
    // Add more elements and their weights as needed

    // Define additional information about elements
    map<char, ElementInfo> elementInfo;
    elementInfo['H'] = {"Hydrogen", "H"};
    elementInfo['C'] = {"Carbon", "C"};
    elementInfo['O'] = {"Oxygen", "O"};
    elementInfo['N'] = {"Nitrogen", "N"};
    elementInfo['He'] = {"Helium", "He"};
    elementInfo['Li'] = {"Lithium", "Li"};
    elementInfo['Na'] = {"Sodium", "Na"};
    // Add more elements and their information as needed

    cout << "Molecular Weight Calculator" << endl;

    // Display the list of supported elements and their atomic weights
    displayAtomicWeights(atomicWeights);

    char choice = 'y';
    while (tolower(choice) == 'y') {
        string chemicalFormula;
        cout << "Enter the chemical formula: ";
        cin >> chemicalFormula;

        if (!isValidFormula(chemicalFormula, atomicWeights)) {
            cout << "Error: Invalid chemical formula entered." << endl;
            continue;
        }

        double molecularWeight = calculateMolecularWeight(chemicalFormula, atomicWeights);
        cout << "Molecular Weight of " << chemicalFormula << " is: " << molecularWeight << " g/mol" << endl;

        char displayElementChoice;
        cout << "Do you want to display additional information about an element? (y/n): ";
        cin >> displayElementChoice;
        if (tolower(displayElementChoice) == 'y') {
            char elementSymbol;
            cout << "Enter the element symbol: ";
            cin >> elementSymbol;
            displayElementInfo(elementSymbol, elementInfo);
        }

        cout << "Do you want to calculate the molecular weight for another chemical formula? (y/n): ";
        cin >> choice;
    }

    return 0;
}
