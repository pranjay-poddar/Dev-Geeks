#include <iostream>
#include <string>
#include <vector>

using namespace std;

struct Tree {
    string species;
    double height; // Height in meters
    double diameter; // Diameter in centimeters
    double healthScore; // Health score of the tree (0.0 to 100.0)
};

class ForestHealthMonitor {
private:
    vector<Tree> forest;

public:
    void addTree(const Tree& tree) {
        forest.push_back(tree);
    }

    void displayForestHealth() const {
        cout << "Forest Health Monitoring Report:\n";
        for (const Tree& tree : forest) {
            cout << "Species: " << tree.species << ", Height: " << tree.height << "m, Diameter: " << tree.diameter << "cm, Health Score: " << tree.healthScore << "\n";
        }
    }

    void updateTreeHealthScore(const string& species, double healthChange) {
        for (Tree& tree : forest) {
            if (tree.species == species) {
                tree.healthScore += healthChange;
                break;
            }
        }
    }

    void identifyVulnerableTrees(double threshold) const {
        cout << "Vulnerable Trees (Health Score < " << threshold << "):\n";
        for (const Tree& tree : forest) {
            if (tree.healthScore < threshold) {
                cout << "Species: " << tree.species << ", Health Score: " << tree.healthScore << "\n";
            }
        }
    }
};

int main() {
    ForestHealthMonitor forestHealth;

    int numTrees;
     cout << "Welcome to the Forest Health Monitoring System!\n";
    cout << "This program allows you to monitor and assess the health of trees in a forest.\n";
    cout << "You can add tree data, simulate the impact of diseases and stress factors,\n";
    cout << "and calculate the health scores of individual trees.\n";
    cout << "Additionally, you can identify vulnerable trees based on their health scores.\n";
    cout << "Let's get started!\n\n";
    cout << "Enter the number of trees in the forest: ";
    cin >> numTrees;

    cin.ignore(); // Ignore the newline character left in the input buffer after cin

    for (int i = 0; i < numTrees; ++i) {
        Tree tree;
        cout << "\nTree " << i + 1 << ":\n";
        cout << "Enter species: ";
        getline(cin, tree.species);

        cout << "Enter height (in meters): ";
        cin >> tree.height;

        cout << "Enter diameter (in centimeters): ";
        cin >> tree.diameter;

        cout << "Enter initial health score (0.0 to 100.0): ";
        cin >> tree.healthScore;

        cin.ignore(); // Ignore the newline character left in the input buffer after cin

        forestHealth.addTree(tree);
    }

    // Display the initial forest health
    cout << "\nInitial ";
    forestHealth.displayForestHealth();

    // Simulate user input to update tree health scores
    string species;
    double healthChange;
    cout << "\nEnter the species of the tree you want to update: ";
    getline(cin, species);

    cout << "Enter the health change (-10 to 10) for the tree: ";
    cin >> healthChange;

    forestHealth.updateTreeHealthScore(species, healthChange);

    // Display the updated forest health
    cout << "\nUpdated ";
    forestHealth.displayForestHealth();

    // Calculate and display vulnerable trees
    double threshold;
    cout << "\nEnter the health score threshold to identify vulnerable trees: ";
    cin >> threshold;

    forestHealth.identifyVulnerableTrees(threshold);

    return 0;
}
