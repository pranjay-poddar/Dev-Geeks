#include <iostream>
#include <vector>
#include <string>
#include <iomanip>

struct EconomicIndicator {
    std::string name;
    double value;
    std::string unit;
    std::string date;
};

std::vector<EconomicIndicator> fetchEconomicIndicators() {
    // Implement your data fetching logic here (API calls, web scraping, etc.)
    // For demonstration purposes, I'll just use some sample data.
    return {
        {"GDP Growth Rate", 7.5, "%", "Q2 2023"},
        {"Inflation Rate", 4.0, "%", "Jul 2023"},
        {"Unemployment Rate", 5.8, "%", "Jul 2023"},
        {"Fiscal Deficit", 3.5, "% of GDP", "FY 2022-23"},
        {"Industrial Production Index", 120.2, "Index", "Jun 2023"}
    };
}

void displayDashboard(const std::vector<EconomicIndicator>& indicators) {
    std::cout << "Economic Indicators Dashboard - India" << std::endl;
    std::cout << "---------------------------------" << std::endl;
    std::cout << std::left << std::setw(30) << "Indicator" << std::setw(10) << "Value" << std::setw(10) << "Unit" << std::setw(15) << "Date" << std::endl;
    std::cout << "---------------------------------" << std::endl;

    for (const auto& indicator : indicators) {
        std::cout << std::left << std::setw(30) << indicator.name << std::setw(10) << indicator.value << std::setw(10) << indicator.unit << std::setw(15) << indicator.date << std::endl;
    }
}

int main() {
    std::vector<EconomicIndicator> economicIndicators = fetchEconomicIndicators();
    
    std::cout << "Welcome to the Indian Economic Indicators Dashboard!" << std::endl;
    std::cout << "--------------------------------------------------" << std::endl;
    
    // Interactive Indicator Selection
    std::cout << "Available Economic Indicators: " << std::endl;
    for (size_t i = 0; i < economicIndicators.size(); ++i) {
        std::cout << i + 1 << ". " << economicIndicators[i].name << std::endl;
    }

    int selectedIndicator;
    do {
        std::cout << "Enter the number of the indicator you want to view (0 to exit): ";
        std::cin >> selectedIndicator;

        if (selectedIndicator >= 1 && selectedIndicator <= economicIndicators.size()) {
            const EconomicIndicator& indicator = economicIndicators[selectedIndicator - 1];
            std::cout << "Selected Indicator: " << indicator.name << std::endl;
            std::cout << "Value: " << indicator.value << " " << indicator.unit << std::endl;
            std::cout << "Date: " << indicator.date << std::endl;
        } else if (selectedIndicator != 0) {
            std::cout << "Invalid input. Please try again." << std::endl;
        }
    } while (selectedIndicator != 0);

    std::cout << "Thank you for using the Indian Economic Indicators Dashboard!" << std::endl;

    return 0;
}
