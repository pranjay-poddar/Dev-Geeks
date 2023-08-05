#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include <stdexcept> // For exception handling

struct FiscalData {
    int year;
    double fiscalDeficit;
};

// Function to read fiscal data from the specified CSV file
std::vector<FiscalData> readFiscalDataFromFile(const std::string& filename) {
    std::vector<FiscalData> fiscalData;
    std::ifstream inputFile(filename);

    // Check if the file can be opened successfully
    if (!inputFile) {
        std::cout << "Error: Unable to open the file " << filename << std::endl;
        return fiscalData; // Return an empty vector if file opening fails
    }

    std::string line;
    std::getline(inputFile, line); // Skip the header line

    while (std::getline(inputFile, line)) {
        std::istringstream iss(line);
        std::string yearStr, deficitStr;

        // Extract year and fiscal deficit from each line
        if (std::getline(iss, yearStr, ',') && std::getline(iss, deficitStr, ',')) {
            try {
                FiscalData data;
                data.year = std::stoi(yearStr);       // Convert yearStr to an integer
                data.fiscalDeficit = std::stod(deficitStr); // Convert deficitStr to a double
                fiscalData.push_back(data); // Add the data to the vector
            } catch (const std::invalid_argument& e) {
                // Handle the case when conversion fails due to invalid data
                std::cout << "Error: Invalid data in the file. Check the 'Year' and 'Fiscal Deficit' columns for numeric values." << std::endl;
                // You can choose to handle the error or skip the row if needed.
            }
        }
    }

    inputFile.close(); // Close the input file after reading data
    return fiscalData; // Return the vector containing fiscal data
}

// Function to calculate the average fiscal deficit from the given data
double calculateAverageFiscalDeficit(const std::vector<FiscalData>& fiscalData) {
    double sum = 0.0;
    for (const auto& data : fiscalData) {
        sum += data.fiscalDeficit; // Accumulate the fiscal deficits
    }

    return sum / fiscalData.size(); // Calculate the average deficit
}

// Function to display the fiscal data on the console
void displayFiscalData(const std::vector<FiscalData>& fiscalData) {
    std::cout << "Year\tFiscal Deficit" << std::endl;
    std::cout << "----------------------" << std::endl;

    for (const auto& data : fiscalData) {
        std::cout << data.year << "\t" << data.fiscalDeficit << std::endl;
    }
}

int main() {
    std::string filename = "fiscal_data.csv"; // Replace with the actual filename

    std::vector<FiscalData> fiscalData = readFiscalDataFromFile(filename);

    if (fiscalData.empty()) {
        return 1; // Exit the program with an error code if the file reading failed
    }

    std::cout << "Fiscal Deficit Analyzer" << std::endl;
    std::cout << "----------------------" << std::endl;

    displayFiscalData(fiscalData); // Display the fiscal data

    double averageDeficit = calculateAverageFiscalDeficit(fiscalData); // Calculate the average fiscal deficit
    std::cout << "\nAverage Fiscal Deficit: " << averageDeficit << std::endl;

    return 0; // Exit the program with success
}
