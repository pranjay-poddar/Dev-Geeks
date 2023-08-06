#include <iostream>
#include <cmath>
#include <vector>
#include <string>
#include <limits>

struct SafetyScenario {
    std::string name;
    double voltage;
    double power;
    double current;
    double maxSafePower;
};

// Function to calculate the maximum safe current
double calculateMaxSafeCurrent(double voltage, double power) {
    return power / voltage;
}

// Function to calculate the maximum safe power
double calculateMaxSafePower(double voltage, double current) {
    return voltage * current;
}

// Function to create and store a safety scenario
void createSafetyScenario(std::vector<SafetyScenario>& scenarios) {
    SafetyScenario scenario;
    std::cout << "Enter the name of the safety scenario: ";
    std::cin.ignore();
    std::getline(std::cin, scenario.name);

    std::cout << "Enter the supply voltage (V): ";
    while (!(std::cin >> scenario.voltage) || scenario.voltage <= 0) {
        std::cout << "Invalid input. Please enter a positive number for supply voltage: ";
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    }

    std::cout << "Enter the power rating of the load (W): ";
    while (!(std::cin >> scenario.power) || scenario.power <= 0) {
        std::cout << "Invalid input. Please enter a positive number for power rating: ";
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    }

    scenario.current = calculateMaxSafeCurrent(scenario.voltage, scenario.power);
    scenario.maxSafePower = calculateMaxSafePower(scenario.voltage, scenario.current);

    scenarios.push_back(scenario);
}

// Function to display all stored safety scenarios
void displaySafetyScenarios(const std::vector<SafetyScenario>& scenarios) {
    if (scenarios.empty()) {
        std::cout << "No safety scenarios created yet.\n";
    } else {
        std::cout << "Stored Safety Scenarios:\n";
        for (const SafetyScenario& scenario : scenarios) {
            std::cout << "Name: " << scenario.name << "\n";
            std::cout << "Supply Voltage (V): " << scenario.voltage << "\n";
            std::cout << "Power Rating (W): " << scenario.power << "\n";
            std::cout << "Maximum Safe Current (A): " << scenario.current << "\n";
            std::cout << "Maximum Safe Power (W): " << scenario.maxSafePower << "\n\n";
        }
    }
}

// Function to check if a given load is within the safe operating range
void loadSafetyCheck(double voltage, double power, double maxSafeCurrent, double maxSafePower) {
    double current = calculateMaxSafeCurrent(voltage, power);
    double loadPower = calculateMaxSafePower(voltage, current);

    std::cout << "Load Information:\n";
    std::cout << "Supply Voltage (V): " << voltage << "\n";
    std::cout << "Power Rating (W): " << power << "\n";
    std::cout << "Calculated Load Current (A): " << current << "\n";
    std::cout << "Calculated Load Power (W): " << loadPower << "\n";

    if (current <= maxSafeCurrent && power <= maxSafePower) {
        std::cout << "The load is within the safe operating range.\n";
    } else {
        std::cout << "WARNING: The load exceeds the maximum safe current and/or power.\n";
        std::cout << "Please consider reducing the power rating or using a higher capacity power supply.\n";
    }
}

int main() {
    std::vector<SafetyScenario> scenarios;

    std::cout << "Electrical Safety Calculator\n";

    char choice;
    do {
        std::cout << "Menu:\n";
        std::cout << "1. Calculate Maximum Safe Current and Power\n";
        std::cout << "2. Create a Safety Scenario\n";
        std::cout << "3. View Stored Safety Scenarios\n";
        std::cout << "4. Load Safety Check\n";
        std::cout << "5. Exit\n";
        std::cout << "Enter your choice (1/2/3/4/5): ";
        std::cin >> choice;

        switch (choice) {
            case '1': {
                double voltage, power, current;

                std::cout << "Enter the supply voltage (V): ";
                while (!(std::cin >> voltage) || voltage <= 0) {
                    std::cout << "Invalid input. Please enter a positive number for supply voltage: ";
                    std::cin.clear();
                    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                }

                std::cout << "Enter the power rating of the load (W): ";
                while (!(std::cin >> power) || power <= 0) {
                    std::cout << "Invalid input. Please enter a positive number for power rating: ";
                    std::cin.clear();
                    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                }

                current = calculateMaxSafeCurrent(voltage, power);
                double maxSafePower = calculateMaxSafePower(voltage, current);

                std::cout << "Maximum Safe Current (A): " << current << std::endl;
                std::cout << "Maximum Safe Power (W): " << maxSafePower << std::endl;
                break;
            }
            case '2':
                createSafetyScenario(scenarios);
                break;
            case '3':
                displaySafetyScenarios(scenarios);
                break;
            case '4': {
                double voltage, power;
                std::cout << "Load Safety Check\n";
                std::cout << "Enter the supply voltage (V): ";
                std::cin >> voltage;
                std::cout << "Enter the power rating of the load (W): ";
                std::cin >> power;
                if (scenarios.empty()) {
                    std::cout << "No safety scenarios available for comparison. Create a safety scenario first.\n";
                } else {
                    std::cout << "Comparing load with stored safety scenarios:\n";
                    for (const SafetyScenario& scenario : scenarios) {
                        std::cout << "Safety Scenario: " << scenario.name << "\n";
                        loadSafetyCheck(voltage, power, scenario.current, scenario.maxSafePower);
                        std::cout << "\n";
                    }
                }
                break;
            }
            case '5':
                std::cout << "Exiting the Electrical Safety Calculator.\n";
                break;
            default:
                std::cout << "Invalid choice. Please try again.\n";
        }

    } while (choice != '5');

    return 0;
}
