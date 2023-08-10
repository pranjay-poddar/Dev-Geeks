#include <iostream>
#include <string>
#include <map>
#include <cctype> // for isdigit()

using namespace std;

// Enumeration for element classification
enum class ElementCategory {
    AlkaliMetal,
    AlkalineEarthMetal,
    TransitionMetal,
    PostTransitionMetal,
    Metalloid,
    Nonmetal,
    Halogen,
    NobleGas,
};

struct ElementInfo {
    string name;
    string symbol;
    ElementCategory category;
    int atomicNumber;
    double atomicWeight;
    double meltingPoint;
    double boilingPoint;
    double density;
    string family;
    string electronConfiguration;
};

// Function prototypes
bool isValidFormula(const string& formula, const map<char, ElementInfo>& elementInfo);
void displayElementInfo(char symbol, const map<char, ElementInfo>& elementInfo);
void displayDetailedElementInfo(char symbol, const map<char, ElementInfo>& elementInfo);
double calculateMolecularWeight(const string& formula, const map<char, double>& atomicWeights);

// Function to validate the chemical formula
bool isValidFormula(const string& formula, const map<char, ElementInfo>& elementInfo) {
    // ... (rest of the isValidFormula function goes here)
    return true; // Placeholder return value, implement actual validation
}

// Function to display basic element information
void displayElementInfo(char symbol, const map<char, ElementInfo>& elementInfo) {
    if (elementInfo.find(symbol) != elementInfo.end()) {
        const ElementInfo& info = elementInfo.at(symbol);
        cout << "Name: " << info.name << endl;
        cout << "Symbol: " << info.symbol << endl;
        cout << "Category: " << static_cast<int>(info.category) << endl;
        cout << "Atomic Number: " << info.atomicNumber << endl;
        cout << "Atomic Weight: " << info.atomicWeight << " g/mol" << endl;
    } else {
        cout << "Element with symbol " << symbol << " not found." << endl;
    }
}

// Function to display detailed element information
void displayDetailedElementInfo(char symbol, const map<char, ElementInfo>& elementInfo) {
    if (elementInfo.find(symbol) != elementInfo.end()) {
        const ElementInfo& info = elementInfo.at(symbol);
        cout << "Name: " << info.name << endl;
        cout << "Symbol: " << info.symbol << endl;
        cout << "Category: " << static_cast<int>(info.category) << endl;
        cout << "Atomic Number: " << info.atomicNumber << endl;
        cout << "Atomic Weight: " << info.atomicWeight << " g/mol" << endl;
        cout << "Melting Point: " << info.meltingPoint << " °C" << endl;
        cout << "Boiling Point: " << info.boilingPoint << " °C" << endl;
        cout << "Density: " << info.density << " g/cm^3" << endl;
        cout << "Family: " << info.family << endl;
        cout << "Electron Configuration: " << info.electronConfiguration << endl;
    } else {
        cout << "Element with symbol " << symbol << " not found." << endl;
    }
}

// Function to calculate molecular weight of a chemical formula
double calculateMolecularWeight(const string& formula, const map<char, double>& atomicWeights) {
    // ... (rest of the calculateMolecularWeight function goes here)
    return 0.0; // Placeholder return value, implement actual calculation
}

int main() {
    // Define atomic weights of elements (using molar mass in g/mol)
    map<char, double> atomicWeights;
    atomicWeights['H'] = 1.0079;
    atomicWeights['C'] = 12.0107;
    atomicWeights['O'] = 15.9994;
    atomicWeights['N'] = 14.0067;
    // Add more elements and their weights as needed

    // Define additional information about elements
    map<char, ElementInfo> elementInfo;
    // Add element data to the map
    elementInfo['H'] = {"Hydrogen", "H", ElementCategory::Nonmetal, 1, 1.0079, 14.01, 20.28, 0.0899, "Hydrogen", "1s1"};
    elementInfo['C'] = {"Carbon", "C", ElementCategory::Nonmetal, 6, 12.0107, 3823, 4098, 2.267, "Carbon", "1s2 2s2 2p2"};
    elementInfo['O'] = {"Oxygen", "O", ElementCategory::Nonmetal, 8, 15.9994, 54.36, 90.20, 1.429, "Chalcogen", "1s2 2s2 2p4"};
    elementInfo['N'] = {"Nitrogen", "N", ElementCategory::Nonmetal, 7, 14.0067, 63.15, 77.36, 1.2506, "Pnictogen", "1s2 2s2 2p3"};
    // Add more elements and their information as needed

    cout << "Chemical Element Properties" << endl;

    char choice = 'y';
    while (tolower(choice) == 'y') {
        cout << "Menu:" << endl;
        cout << "1. Display Element Information" << endl;
        cout << "2. Display Detailed Element Information" << endl;
        cout << "Enter your choice (1-2): ";
        int option;
        cin >> option;

        char symbol;
        string chemicalFormula;
        double molecularWeight;

        switch (option) {
            case 1:
                cout << "Enter the element symbol: ";
                cin >> symbol;
                displayElementInfo(symbol, elementInfo);
                break;
            case 2:
                cout << "Enter the element symbol: ";
                cin >> symbol;
                displayDetailedElementInfo(symbol, elementInfo);
                break;
            default:
                cout << "Invalid choice. Please try again." << endl;
        }

        cout << "Do you want to continue? (y/n): ";
        cin >> choice;
    }

    return 0;
}
