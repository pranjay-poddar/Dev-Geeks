#include <iostream>
#include <vector>
#include <string>
#include <iomanip>
#include <algorithm>
#include <fstream> // For file operations

struct Commodity {
    std::string name;
    double price;
    std::string unit;
};

// Function to fetch commodity prices
std::vector<Commodity> fetchCommodityPrices() {
    // Implement your data fetching logic here (API calls, web scraping, etc.)
    // For demonstration purposes, we will use sample data.
    return {
        {"Crude Oil", 75.36, "USD per barrel"},
        {"Gold", 1805.75, "USD per ounce"},
        {"Silver", 24.80, "USD per ounce"},
        {"Wheat", 405.25, "USD per bushel"},
        {"Cotton", 0.85, "USD per pound"}
    };
}

// Function to display commodity prices
void displayCommodityPrices(const std::vector<Commodity>& commodities) {
    std::cout << "Commodity Price Monitor" << std::endl;
    std::cout << "----------------------" << std::endl;
    std::cout << std::left << std::setw(15) << "Commodity" << std::setw(15) << "Price" << std::setw(20) << "Unit" << std::endl;
    std::cout << "----------------------" << std::endl;

    for (const auto& commodity : commodities) {
        std::cout << std::left << std::setw(15) << commodity.name << std::setw(15) << commodity.price << std::setw(20) << commodity.unit << std::endl;
    }
}

// Function to search for a specific commodity
void searchCommodity(const std::vector<Commodity>& commodities, const std::string& query) {
    std::cout << "Search Results" << std::endl;
    std::cout << "--------------" << std::endl;
    std::cout << std::left << std::setw(15) << "Commodity" << std::setw(15) << "Price" << std::setw(20) << "Unit" << std::endl;
    std::cout << "--------------" << std::endl;

    for (const auto& commodity : commodities) {
        if (commodity.name.find(query) != std::string::npos) {
            std::cout << std::left << std::setw(15) << commodity.name << std::setw(15) << commodity.price << std::setw(20) << commodity.unit << std::endl;
        }
    }
}

// Function to compare commodity prices for sorting
bool comparePrice(const Commodity& c1, const Commodity& c2) {
    return c1.price < c2.price;
}

// Function to view top trending commodities based on price
void viewTrendingIndicators(const std::vector<Commodity>& commodities, int numIndicators, bool ascending = true) {
    std::vector<Commodity> sortedCommodities = commodities;
    std::sort(sortedCommodities.begin(), sortedCommodities.end(), comparePrice);
    if (!ascending) {
        std::reverse(sortedCommodities.begin(), sortedCommodities.end());
    }

    std::cout << "Top " << numIndicators << " Trending Commodities" << std::endl;
    std::cout << "-----------------------------" << std::endl;
    std::cout << std::left << std::setw(15) << "Commodity" << std::setw(15) << "Price" << std::setw(20) << "Unit" << std::endl;
    std::cout << "-----------------------------" << std::endl;

    for (int i = 0; i < numIndicators && i < sortedCommodities.size(); ++i) {
        std::cout << std::left << std::setw(15) << sortedCommodities[i].name << std::setw(15) << sortedCommodities[i].price << std::setw(20) << sortedCommodities[i].unit << std::endl;
    }
}

// Function to save commodity data to a file
void saveDataToFile(const std::vector<Commodity>& commodities, const std::string& filename) {
    std::ofstream outputFile(filename);

    if (outputFile.is_open()) {
        outputFile << "Commodity,Price,Unit" << std::endl;
        for (const auto& commodity : commodities) {
            outputFile << commodity.name << "," << commodity.price << "," << commodity.unit << std::endl;
        }
        outputFile.close();
        std::cout << "Data saved to " << filename << " successfully!" << std::endl;
    } else {
        std::cout << "Unable to open the file for saving data." << std::endl;
    }
}

int main() {
    std::vector<Commodity> commodities = fetchCommodityPrices();

    std::cout << "Welcome to the Commodity Price Monitor!" << std::endl;
    std::cout << "--------------------------------------" << std::endl;

    int option;
    std::string searchQuery;
    std::string filename; // Moved filename declaration outside the switch block

    do {
        // Display the menu options
        std::cout << "1. View all commodities" << std::endl;
        std::cout << "2. Search for a commodity" << std::endl;
        std::cout << "3. View trending commodities" << std::endl;
        std::cout << "4. Save data to a file" << std::endl;
        std::cout << "5. Exit" << std::endl;
        std::cout << "Enter your choice: ";
        std::cin >> option;

        switch (option) {
            case 1:
                displayCommodityPrices(commodities);
                break;
            case 2:
                std::cout << "Enter the name of the commodity you want to search for: ";
                std::cin.ignore();
                std::getline(std::cin, searchQuery);
                searchCommodity(commodities, searchQuery);
                break;
            case 3:
                int numIndicators;
                std::cout << "Enter the number of top trending commodities you want to view: ";
                std::cin >> numIndicators;
                viewTrendingIndicators(commodities, numIndicators);
                break;
            case 4:
                std::cout << "Enter the filename to save data (e.g., data.csv): ";
                std::cin.ignore();
                std::getline(std::cin, filename);
                saveDataToFile(commodities, filename);
                break;
            case 5:
                std::cout << "Thank you for using the Commodity Price Monitor!" << std::endl;
                break;
            default:
                std::cout << "Invalid input. Please try again." << std::endl;
        }

    } while (option != 5);

    return 0;
}
