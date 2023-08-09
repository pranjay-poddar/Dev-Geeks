#include <iostream>
#include <cmath>

using namespace std;

// Function to simulate the batch reactor for an nth-order reaction
void batchReactorSimulationNthOrder(double initialConcentration[], int numReactants, double reactionRateConstant,
                                    double reactionOrder, double reactionTime, double deltaTime, double inertConcentration = 0.0) {
    int numComponents = numReactants + 1;
    double concentrations[numComponents];
    double initialTotalConcentration = 0.0;

    for (int i = 0; i < numReactants; ++i) {
        concentrations[i] = initialConcentration[i];
        initialTotalConcentration += initialConcentration[i];
    }

    concentrations[numReactants] = inertConcentration;

    cout << "Time (min) | ";
    for (int i = 0; i < numComponents; ++i) {
        cout << "Concentration" << i + 1 << " (mol/L) | ";
    }
    cout << "Conversion (%)" << endl;

    double totalConcentration;
    double conversion = 0.0;

    for (double time = 0.0; time <= reactionTime; time += deltaTime) {
        totalConcentration = 0.0;
        for (int i = 0; i < numReactants; ++i) {
            totalConcentration += concentrations[i];
        }

        conversion = (initialTotalConcentration - totalConcentration) / initialTotalConcentration * 100.0;

        cout << time << " | ";
        for (int i = 0; i < numComponents; ++i) {
            cout << concentrations[i] << " | ";
        }
        cout << conversion << endl;

        double rate = reactionRateConstant * pow(concentrations[0], reactionOrder);

        for (int i = 0; i < numReactants; ++i) {
            concentrations[i] -= rate * deltaTime;
        }
        concentrations[numReactants] += rate * deltaTime;
    }

    cout << "Final Conversion: " << conversion << "%" << endl;
}

int main() {
    cout << "Batch Reactor Design" << endl;

    int numReactants;
    cout << "Enter the number of reactants: ";
    cin >> numReactants;

    double initialConcentration[numReactants];
    double reactionRateConstant;
    double reactionOrder;
    double reactionTime;
    double deltaTime;
    double inertConcentration = 0.0;

    for (int i = 0; i < numReactants; ++i) {
        cout << "Enter the initial concentration of reactant " << i + 1 << " (mol/L): ";
        cin >> initialConcentration[i];
    }

    cout << "Enter the reaction rate constant (1/min): ";
    cin >> reactionRateConstant;

    cout << "Enter the reaction order: ";
    cin >> reactionOrder;

    cout << "Enter the total reaction time (minutes): ";
    cin >> reactionTime;

    cout << "Enter the time step size (minutes): ";
    cin >> deltaTime;

    cout << "Does the reaction include an inert substance? (1 for yes, 0 for no): ";
    int inertOption;
    cin >> inertOption;

    if (inertOption == 1) {
        cout << "Enter the initial concentration of the inert substance (mol/L): ";
        cin >> inertConcentration;
    }

    batchReactorSimulationNthOrder(initialConcentration, numReactants, reactionRateConstant, reactionOrder,
                                   reactionTime, deltaTime, inertConcentration);

    return 0;
}
