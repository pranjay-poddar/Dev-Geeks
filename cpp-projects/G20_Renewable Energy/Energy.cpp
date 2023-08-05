#include <iostream>
#include <vector>
#include <algorithm>

struct CountryData {
    std::string name;
    double renewableProduction;
};

// Function to search for a specific country's data
void searchCountryData(const std::vector<CountryData>& data, const std::string& countryName) {
    auto it = std::find_if(data.begin(), data.end(), [&](const CountryData& country) {
        return country.name == countryName;
    });

    if (it != data.end()) {
        std::cout << "Renewable Energy Production for " << it->name << ": " << it->renewableProduction << " MW\n";
    } else {
        std::cout << "Data for " << countryName << " not found.\n";
    }
}

// Function to calculate total renewable energy production for all G20 countries
double getTotalRenewableProduction(const std::vector<CountryData>& data) {
    double totalRenewableProduction = 0.0;
    for (const auto& country : data) {
        totalRenewableProduction += country.renewableProduction;
    }
    return totalRenewableProduction;
}

// Function to sort the vector of CountryData based on renewable energy production (descending order)
void sortDataByRenewableProduction(std::vector<CountryData>& data) {
    std::sort(data.begin(), data.end(), [](const CountryData& a, const CountryData& b) {
        return a.renewableProduction > b.renewableProduction;
    });
}

int main() {
    std::vector<CountryData> g20Data = {
        {"United States", 2500.3},
        {"China", 4200.2},
        {"India", 1800.7},
        {"Japan", 1200.5},
        {"Germany", 900.8},
        {"Russia", 1500.6},
        {"Brazil", 2000.4},
        {"Italy", 1100.9},
        {"France", 1300.1},
        {"United Kingdom", 800.2},
        {"Canada", 1000.0},
        {"South Korea", 1900.3},
        {"Australia", 800.5},
        {"Saudi Arabia", 600.8},
        {"Turkey", 900.6},
        {"Argentina", 1200.4},
        {"Mexico", 1000.7},
        {"Indonesia", 1800.2},
        {"South Africa", 700.1},
        // Add more countries and data here
    };

    // Introduction and Overview
    std::cout << "Welcome to the G20 Renewable Energy Knowledge Center!\n";
    std::cout << "The G20 is an international forum of major economies aimed at promoting global economic cooperation and sustainable development.\n";
    std::cout << "Renewable energy is energy that is generated from natural sources such as sunlight, wind, rain, tides, and geothermal heat, which are renewable and sustainable.\n";

    while (true) {
        // Displaying Menu Options
        std::cout << "\nSelect an option:\n";
        std::cout << "1. Get total renewable energy production for all G20 countries\n";
        std::cout << "2. Display countries sorted by renewable energy production (descending order)\n";
        std::cout << "3. Search for a specific country's data\n";
        std::cout << "0. Exit\n";
        std::cout << "Enter your choice: ";

        int choice;
        std::cin >> choice;

        if (choice == 0) {
            std::cout << "Goodbye! Exiting the program.\n";
            break;
        } else if (choice == 1) {
            double totalRenewableProduction = getTotalRenewableProduction(g20Data);
            std::cout << "Total Renewable Energy Production in G20: " << totalRenewableProduction << " MW\n";
        } else if (choice == 2) {
            std::vector<CountryData> sortedData = g20Data; // Create a copy to preserve the original data
            sortDataByRenewableProduction(sortedData);
            std::cout << "\nRenewable Energy Production by Country (Descending Order):\n";
            for (const auto& country : sortedData) {
                std::cout << country.name << ": " << country.renewableProduction << " MW\n";
            }
        } else if (choice == 3) {
            std::string searchCountry;
            std::cout << "Enter the name of the country to get the renewable energy production: ";
            std::cin.ignore(); // Ignore the newline character left in the input buffer
            std::getline(std::cin, searchCountry);
            searchCountryData(g20Data, searchCountry);
        } else {
            std::cout << "Invalid choice. Please enter a valid option.\n";
        }
    }

    return 0;
}
