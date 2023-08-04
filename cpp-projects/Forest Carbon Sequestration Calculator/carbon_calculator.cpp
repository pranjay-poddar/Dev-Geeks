#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <map>

using namespace std;

struct Tree {
    string species;
    double healthScore; // Health score of the tree (0.0 to 100.0)
    double age; // Age of the tree in years
    double diameter; // Diameter of the tree in centimeters
};

class ForestCarbonSequestrationCalculator {
private:
    vector<Tree> forest;
    map<string, double> speciesSequestrationRates; // Map of species to their carbon sequestration rates

public:
    ForestCarbonSequestrationCalculator() {
        // Initialize species-specific carbon sequestration rates (tons per year)
        speciesSequestrationRates["Oak"] = 2.5;
        speciesSequestrationRates["Pine"] = 1.8;
        speciesSequestrationRates["Maple"] = 2.2;
        // Add more species and their corresponding sequestration rates as needed
    }

    void addTree(const Tree& tree) {
        forest.push_back(tree);
    }

    double calculateCarbonSequestration() const {
        double totalCarbonSequestration = 0.0;
        for (const Tree& tree : forest) {
            // Calculate carbon sequestration based on the species-specific sequestration rate and other factors
            double sequestrationRate = getSpeciesSequestrationRate(tree.species);
            double carbonSequestration = sequestrationRate * tree.age * tree.healthScore / 100.0;
            totalCarbonSequestration += carbonSequestration;
        }
        return totalCarbonSequestration;
    }

    void displayForestHealth() const {
        cout << "Forest Health Report:\n";
        for (const Tree& tree : forest) {
            cout << "Species: " << tree.species << ", Health Score: " << tree.healthScore
                 << ", Age: " << tree.age << " years, Diameter: " << tree.diameter << " cm\n";
        }
    }

    void simulateClimateChangeImpact(double temperatureChange, double precipitationChange) {
        // Simulate the impact of climate change on tree health scores and update the forest health
        for (Tree& tree : forest) {
            // Adjust the health score based on temperature change (simple simulation for demonstration)
            // A positive temperature change decreases the health score, and vice versa
            tree.healthScore -= temperatureChange;
            // Adjust the health score based on precipitation change (simple simulation for demonstration)
            // A positive precipitation change increases the health score, and vice versa
            tree.healthScore += precipitationChange;
            // Ensure the health score stays within the range of 0 to 100
            tree.healthScore = max(0.0, min(tree.healthScore, 100.0));
        }
    }

private:
    double getSpeciesSequestrationRate(const string& species) const {
        // Lookup the species-specific carbon sequestration rate from the map
        auto it = speciesSequestrationRates.find(species);
        if (it != speciesSequestrationRates.end()) {
            return it->second;
        } else {
            // If the species is not found in the map, use a default sequestration rate
            return 1.0; // You can replace this with a more meaningful default value
        }
    }
};

int main() {
    cout << "Forest Carbon Sequestration Calculator\n";
    cout << "=====================================\n";
    cout << "This program calculates the carbon sequestration of a forest based on the number of trees, their health scores, age, and diameter.\n";
    cout << "You will be prompted to input data for individual trees, including their species, health score, age, and diameter.\n";
    cout << "The program will calculate the total carbon sequestration of the forest and display a forest health report.\n";
    cout << "You can also simulate the impact of climate change on tree health and recalculate carbon sequestration.\n\n";

    ForestCarbonSequestrationCalculator calculator;

    int numTrees;
    cout << "Enter the number of trees in the forest: ";
    cin >> numTrees;

    cin.ignore(); // Ignore the newline character left in the input buffer after cin

    for (int i = 0; i < numTrees; ++i) {
        Tree tree;
        cout << "\nTree " << i + 1 << ":\n";
        cout << "Enter species: ";
        getline(cin, tree.species);

        cout << "Enter health score (0.0 to 100.0): ";
        cin >> tree.healthScore;

        cout << "Enter age (in years): ";
        cin >> tree.age;

        cout << "Enter diameter (in centimeters): ";
        cin >> tree.diameter;

        cin.ignore(); // Ignore the newline character left in the input buffer after cin

        calculator.addTree(tree);
    }

    // Display the forest health report
    calculator.displayForestHealth();

    // Calculate and display the total carbon sequestration
    double totalCarbonSequestration = calculator.calculateCarbonSequestration();
    cout << "\nTotal Carbon Sequestration of the Forest: " << totalCarbonSequestration << " tons\n";

    // Allow users to simulate the impact of climate change on tree health and recalculate carbon sequestration
    char simulateClimateChange;
    cout << "\nSimulate the impact of climate change on tree health? (Y/N): ";
    cin >> simulateClimateChange;

    if (toupper(simulateClimateChange) == 'Y') {
        double temperatureChange, precipitationChange;
        cout << "Enter the temperature change (in degrees Celsius) due to climate change: ";
        cin >> temperatureChange;

        cout << "Enter the precipitation change (in millimeters) due to climate change: ";
        cin >> precipitationChange;

        calculator.simulateClimateChangeImpact(temperatureChange, precipitationChange);

        // Recalculate and display the updated forest health report and total carbon sequestration
        cout << "\nUpdated Forest Health Report After Climate Change Impact:\n";
        calculator.displayForestHealth();

        double updatedCarbonSequestration = calculator.calculateCarbonSequestration();
        cout << "\nUpdated Total Carbon Sequestration of the Forest: " << updatedCarbonSequestration << " tons\n";
    }

    return 0;
}
