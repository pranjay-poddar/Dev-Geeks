#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

struct Load {
    std::string name;
    double powerDemand; // Power demand in kilowatts (kW)
};

std::vector<Load> simulateLoadForecasting(int forecastHours) {
    // Load forecasting simulation code...
    // For simplicity, we'll use random load profiles
    std::vector<Load> loads;
    for (int i = 0; i < forecastHours; ++i) {
        Load load;
        load.name = "Load_" + std::to_string(i + 1);
        load.powerDemand = rand() % 200 + 50; // Random power demand between 50 kW and 250 kW
        loads.push_back(load);
    }
    return loads;
}

void performLoadShedding(std::vector<Load>& loads, double maxPowerCapacity) {
    // Load shedding algorithm...
    // For demonstration, we'll perform simple load shedding based on power capacity constraints
    double totalDemand = 0.0;
    for (const Load& load : loads) {
        totalDemand += load.powerDemand;
    }

    if (totalDemand > maxPowerCapacity) {
        std::sort(loads.begin(), loads.end(), [](const Load& a, const Load& b) {
            return a.powerDemand > b.powerDemand;
        });

        for (size_t i = loads.size() - 1; i >= 0; --i) {
            if (totalDemand <= maxPowerCapacity) {
                break;
            }
            totalDemand -= loads[i].powerDemand;
            loads[i].powerDemand = 0.0; // Shed the load
        }
    }
}

void printLoadSheddingResults(const std::vector<Load>& loads) {
    std::cout << "\nLoad Shedding Results:\n";
    for (const Load& load : loads) {
        std::cout << load.name << ": " << load.powerDemand << " kW\n";
    }
}

int main() {
    int forecastHours;
    double maxPowerCapacity;

    std::cout << "Load Shedding Simulator\n";

    // Get user inputs for forecast hours and maximum power capacity
    std::cout << "Enter the number of forecast hours: ";
    std::cin >> forecastHours;

    std::cout << "Enter the maximum power capacity (kW): ";
    std::cin >> maxPowerCapacity;

    // Input validation
    if (forecastHours <= 0 || maxPowerCapacity <= 0) {
        std::cout << "Invalid input. Forecast hours and maximum power capacity should be positive.\n";
        return 1;
    }

    // Simulate load forecasting to get load profiles for the next 'forecastHours' hours
    std::vector<Load> loads = simulateLoadForecasting(forecastHours);

    // Perform load shedding based on the available power capacity
    performLoadShedding(loads, maxPowerCapacity);

    // Display the load shedding results
    printLoadSheddingResults(loads);

    return 0;
}
