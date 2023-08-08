#include <iostream>
#include <vector>
#include <iomanip>

using namespace std;

// Function to perform 1D heat transfer simulation using FDM
void heatTransferSimulation(int rodLength, double rodInitialTemperature, double rodBoundaryTemperature,
                            int totalTimeSteps, double thermalDiffusivity, double thermalConductivity,
                            double specificHeat, double deltaTime, double deltaX) {
    int numNodes = rodLength / deltaX + 1;
    vector<double> temperature(numNodes);

    // Initialize temperature distribution
    for (int i = 0; i < numNodes; ++i) {
        temperature[i] = rodInitialTemperature;
    }

    // Boundary conditions
    temperature[0] = rodBoundaryTemperature;
    temperature[numNodes - 1] = rodBoundaryTemperature;

    cout << "Time Step 0:" << endl;
    // Display the initial temperature distribution
    for (int i = 0; i < numNodes; ++i) {
        cout << fixed << setprecision(2) << setw(7) << temperature[i] << " °C ";
    }
    cout << endl << string(numNodes * 9, '-') << endl;

    // Perform the simulation
    for (int t = 1; t <= totalTimeSteps; ++t) {
        vector<double> newTemperature = temperature;

        for (int i = 1; i < numNodes - 1; ++i) {
            double dT = (thermalDiffusivity * deltaTime / (deltaX * deltaX)) *
                        (temperature[i + 1] - 2 * temperature[i] + temperature[i - 1]);
            newTemperature[i] += dT;
        }

        temperature = newTemperature;

        // Display the temperature distribution at specific time intervals
        if (t % 10 == 0) {
            cout << "Time Step " << t << ":" << endl;
            for (int i = 0; i < numNodes; ++i) {
                cout << fixed << setprecision(2) << setw(7) << temperature[i] << " °C ";
            }
            cout << endl << string(numNodes * 9, '-') << endl;
        }
    }

    // Display the final temperature distribution after the simulation
    cout << "Final Temperature Profile:" << endl;
    for (int i = 0; i < numNodes; ++i) {
        cout << fixed << setprecision(2) << setw(7) << temperature[i] << " °C ";
    }
    cout << endl << string(numNodes * 9, '-') << endl;
}

int main() {
    cout << "1D Heat Transfer Simulation" << endl;

    // User inputs
    int rodLength;
    double rodInitialTemperature;
    double rodBoundaryTemperature;
    int totalTimeSteps;
    double thermalDiffusivity;
    double thermalConductivity;
    double specificHeat;
    double deltaTime;
    double deltaX;

    // Get user inputs
    cout << "Enter the length of the rod (in meters): ";
    cin >> rodLength;

    cout << "Enter the initial temperature of the rod (in °C): ";
    cin >> rodInitialTemperature;

    cout << "Enter the temperature at both ends of the rod (in °C): ";
    cin >> rodBoundaryTemperature;

    cout << "Enter the total number of time steps: ";
    cin >> totalTimeSteps;

    cout << "Enter the thermal diffusivity of the rod: ";
    cin >> thermalDiffusivity;

    cout << "Enter the thermal conductivity of the rod: ";
    cin >> thermalConductivity;

    cout << "Enter the specific heat of the rod: ";
    cin >> specificHeat;

    cout << "Enter the time step size (delta t): ";
    cin >> deltaTime;

    cout << "Enter the spatial step size (delta x): ";
    cin >> deltaX;

    // Call the heatTransferSimulation function with user-provided values
    heatTransferSimulation(rodLength, rodInitialTemperature, rodBoundaryTemperature, totalTimeSteps,
                           thermalDiffusivity, thermalConductivity, specificHeat, deltaTime, deltaX);

    return 0;
}
