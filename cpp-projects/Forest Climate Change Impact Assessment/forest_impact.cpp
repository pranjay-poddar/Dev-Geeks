#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

struct Tree {
    string species;
    double healthScore; // Health score of the tree (0.0 to 100.0)
};

class ForestClimateChangeAssessment {
private:
    vector<Tree> forest;
    double temperatureChange; // Temperature change due to climate change (in degrees Celsius)
    double precipitationChange; // Precipitation change due to climate change (in millimeters)

public:
    ForestClimateChangeAssessment(double tempChange, double precipChange)
        : temperatureChange(tempChange), precipitationChange(precipChange) {}

    void addTree(const Tree& tree) {
        forest.push_back(tree);
    }

    void displayForestHealth(bool colorCoded) const {
        cout << "Forest Climate Change Impact Assessment Report:\n";
        for (const Tree& tree : forest) {
            cout << "Species: " << tree.species << ", Health Score: " << tree.healthScore;
            if (colorCoded) {
                cout << " (";
                if (tree.healthScore >= 80.0)
                    cout << "Healthy";
                else if (tree.healthScore >= 50.0)
                    cout << "Moderate";
                else
                    cout << "Vulnerable";
                cout << ")";
            }
            cout << "\n";
        }
    }

    void assessClimateChangeImpact() {
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
};

// ... (previous code)

int main() {
    cout << "Forest Climate Change Impact Assessment System\n";
    cout << "=============================================\n";
    cout << "This program assesses the impact of climate change on the health of trees in a forest.\n";
    cout << "You will be prompted to enter the temperature change (in degrees Celsius) and precipitation change (in millimeters) due to climate change.\n";
    cout << "Next, you can input data for individual trees, including their species and initial health score.\n";
    cout << "The program will display the initial forest health report, and then it will simulate the impact of climate change on tree health.\n";
    cout << "You can choose to display the updated forest health report with color-coded health levels (healthy, moderate, or vulnerable) for better visualization.\n\n";

    double temperatureChange, precipitationChange;
    cout << "Enter the temperature change (in degrees Celsius) due to climate change: ";
    cin >> temperatureChange;

    cout << "Enter the precipitation change (in millimeters) due to climate change: ";
    cin >> precipitationChange;

    ForestClimateChangeAssessment forestAssessment(temperatureChange, precipitationChange);

    int numTrees;
    cout << "\nEnter the number of trees in the forest: ";
    cin >> numTrees;

    cin.ignore(); // Ignore the newline character left in the input buffer after cin

    for (int i = 0; i < numTrees; ++i) {
        Tree tree;
        cout << "\nTree " << i + 1 << ":\n";
        cout << "Enter species: ";
        getline(cin, tree.species);

        cout << "Enter initial health score (0.0 to 100.0): ";
        cin >> tree.healthScore;

        cin.ignore(); // Ignore the newline character left in the input buffer after cin

        forestAssessment.addTree(tree);
    }

    // Display the initial forest health
    cout << "\nInitial ";
    forestAssessment.displayForestHealth(true);

    // Assess the impact of climate change on tree health
    forestAssessment.assessClimateChangeImpact();

    // Display the updated forest health after climate change assessment
    cout << "\nForest Health After Climate Change Impact Assessment:\n";
    forestAssessment.displayForestHealth(true);

    return 0;
}
