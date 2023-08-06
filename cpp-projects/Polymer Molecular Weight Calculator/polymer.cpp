#include <iostream>
#include <string>
#include <map>

using namespace std;

// Map to store the molecular weights of monomer units
map<char, double> monomerWeights;

// Function to initialize default monomer weights
void initializeDefaultMonomerWeights() {
    monomerWeights = {
        {'C', 12.01},
        {'H', 1.008},
        {'O', 16.00},
        // Add more monomer units and their weights as needed
    };
}

// Function to calculate the molecular weight of a polymer chain with n repeating units
double calculateMolecularWeight(const string& polymer, int n) {
    double molecularWeight = 0.0;
    for (char monomer : polymer) {
        if (monomerWeights.find(monomer) != monomerWeights.end()) {
            molecularWeight += monomerWeights[monomer];
        } else {
            cout << "Error: Invalid monomer unit '" << monomer << "' encountered." << endl;
            return -1.0;
        }
    }

    return molecularWeight * n;
}

// Function to calculate the weight-average molecular weight of the polymer
double calculateWeightAverageMolecularWeight(const map<char, int>& repeatingUnits) {
    double totalWeight = 0.0;
    int totalRepeatingUnits = 0;

    for (const auto& entry : repeatingUnits) {
        char monomer = entry.first;
        int quantity = entry.second;

        if (monomerWeights.find(monomer) != monomerWeights.end()) {
            totalWeight += monomerWeights[monomer] * quantity;
            totalRepeatingUnits += quantity;
        } else {
            cout << "Error: Invalid monomer unit '" << monomer << "' encountered." << endl;
            return -1.0;
        }
    }

    return totalWeight / totalRepeatingUnits;
}

// Function to add or modify the molecular weight of a custom monomer unit
void addCustomMonomerWeight(char monomer, double weight) {
    monomerWeights[monomer] = weight;
}

int main() {
    initializeDefaultMonomerWeights();

    cout << "Polymer Molecular Weight Calculator" << endl;

    string polymer;
    cout << "Enter the polymer sequence using monomer units (e.g., CH2CH(CH3)COOH): ";
    cin >> polymer;

    int n;
    cout << "Enter the number of repeating units: ";
    cin >> n;

    double molecularWeight = calculateMolecularWeight(polymer, n);
    if (molecularWeight >= 0.0) {
        cout << "Molecular Weight of the polymer chain: " << molecularWeight << " g/mol" << endl;
    }

    // Allow the user to add or modify custom monomer weights
    char choice;
    cout << "Do you want to add or modify custom monomer weights? (y/n): ";
    cin >> choice;

    while (tolower(choice) == 'y') {
        char monomer;
        double weight;

        cout << "Enter the monomer unit: ";
        cin >> monomer;

        cout << "Enter the molecular weight of the monomer unit (g/mol): ";
        cin >> weight;

        addCustomMonomerWeight(monomer, weight);

        cout << "Custom monomer weight added/modified successfully." << endl;
        cout << "Do you want to add or modify more custom monomer weights? (y/n): ";
        cin >> choice;
    }

    // Calculate the weight-average molecular weight
    int numRepeatingUnits;
    cout << "Enter the number of different repeating units in the polymer: ";
    cin >> numRepeatingUnits;

    map<char, int> repeatingUnits;
    for (int i = 0; i < numRepeatingUnits; ++i) {
        char monomer;
        int quantity;

        cout << "Enter the monomer unit: ";
        cin >> monomer;

        cout << "Enter the quantity of repeating units: ";
        cin >> quantity;

        repeatingUnits[monomer] = quantity;
    }

    double weightAverageMolecularWeight = calculateWeightAverageMolecularWeight(repeatingUnits);
    if (weightAverageMolecularWeight >= 0.0) {
        cout << "Weight-Average Molecular Weight of the polymer: " << weightAverageMolecularWeight << " g/mol" << endl;
    }

    return 0;
}
