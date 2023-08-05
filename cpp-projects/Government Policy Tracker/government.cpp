#include <iostream>
#include <vector>
#include <string>
#include <iomanip>
#include <fstream>
#include <sstream>

struct Policy {
    std::string title;
    std::string description;
    std::string date;
};

std::vector<Policy> policyDatabase; // Vector to store policies

// Function to add a new policy to the database
void addPolicy() {
    Policy newPolicy;
    std::cin.ignore();
    std::cout << "Enter Policy Title: ";
    std::getline(std::cin, newPolicy.title);

    std::cout << "Enter Policy Description: ";
    std::getline(std::cin, newPolicy.description);

    std::cout << "Enter Policy Date (YYYY-MM-DD): ";
    std::getline(std::cin, newPolicy.date);

    policyDatabase.push_back(newPolicy); // Add the policy to the database
    std::cout << "Policy Added Successfully!" << std::endl;
}

// Function to display all policies in the database
void displayPolicies() {
    if (policyDatabase.empty()) {
        std::cout << "No policies found in the database." << std::endl;
        return;
    }

    std::cout << "Government Policy Tracker" << std::endl;
    std::cout << "----------------------------------------------" << std::endl;
    std::cout << std::left << std::setw(30) << "Title" << std::setw(40) << "Description" << std::setw(15) << "Date" << std::endl;
    std::cout << "----------------------------------------------" << std::endl;

    for (const auto& policy : policyDatabase) {
        std::cout << std::left << std::setw(30) << policy.title << std::setw(40) << policy.description << std::setw(15) << policy.date << std::endl;
    }
}

// Function to search policies by title
void searchByTitle() {
    std::cin.ignore();
    std::string searchTitle;
    std::cout << "Enter the Title to Search: ";
    std::getline(std::cin, searchTitle);

    bool found = false;

    std::cout << "Government Policy Tracker - Search Results" << std::endl;
    std::cout << "----------------------------------------------" << std::endl;
    std::cout << std::left << std::setw(30) << "Title" << std::setw(40) << "Description" << std::setw(15) << "Date" << std::endl;
    std::cout << "----------------------------------------------" << std::endl;

    for (const auto& policy : policyDatabase) {
        if (policy.title.find(searchTitle) != std::string::npos) {
            std::cout << std::left << std::setw(30) << policy.title << std::setw(40) << policy.description << std::setw(15) << policy.date << std::endl;
            found = true;
        }
    }

    if (!found) {
        std::cout << "No policies found with the specified title." << std::endl;
    }
}

// Function to search policies by date
void searchByDate() {
    std::cin.ignore();
    std::string searchDate;
    std::cout << "Enter the Date to Search (YYYY-MM-DD): ";
    std::getline(std::cin, searchDate);

    bool found = false;

    std::cout << "Government Policy Tracker - Search Results" << std::endl;
    std::cout << "----------------------------------------------" << std::endl;
    std::cout << std::left << std::setw(30) << "Title" << std::setw(40) << "Description" << std::setw(15) << "Date" << std::endl;
    std::cout << "----------------------------------------------" << std::endl;

    for (const auto& policy : policyDatabase) {
        if (policy.date == searchDate) {
            std::cout << std::left << std::setw(30) << policy.title << std::setw(40) << policy.description << std::setw(15) << policy.date << std::endl;
            found = true;
        }
    }

    if (!found) {
        std::cout << "No policies found with the specified date." << std::endl;
    }
}

// Function to delete a policy from the database
void deletePolicy() {
    if (policyDatabase.empty()) {
        std::cout << "No policies found in the database." << std::endl;
        return;
    }

    std::cin.ignore();
    std::string searchTitle;
    std::cout << "Enter the Title of the Policy to Delete: ";
    std::getline(std::cin, searchTitle);

    for (auto it = policyDatabase.begin(); it != policyDatabase.end(); ++it) {
        if (it->title == searchTitle) {
            policyDatabase.erase(it); // Erase the policy from the database
            std::cout << "Policy Deleted Successfully!" << std::endl;
            return;
        }
    }

    std::cout << "Policy with the specified title not found." << std::endl;
}

// Function to save policies to a file
void savePoliciesToFile(const std::string& filename) {
    std::ofstream outputFile(filename);

    if (!outputFile) {
        std::cout << "Error: Unable to open the file " << filename << " for writing." << std::endl;
        return;
    }

    for (const auto& policy : policyDatabase) {
        outputFile << policy.title << "," << policy.description << "," << policy.date << std::endl;
    }

    outputFile.close();
    std::cout << "Policies saved to " << filename << " successfully!" << std::endl;
}

// Function to load policies from a file
void loadPoliciesFromFile(const std::string& filename) {
    std::ifstream inputFile(filename);

    if (!inputFile) {
        std::cout << "Error: Unable to open the file " << filename << " for reading." << std::endl;
        return;
    }

    policyDatabase.clear(); // Clear existing data before loading

    std::string line;
    while (std::getline(inputFile, line)) {
        std::istringstream iss(line);
        std::string title, description, date;

        if (std::getline(iss, title, ',') && std::getline(iss, description, ',') && std::getline(iss, date)) {
            Policy policy;
            policy.title = title;
            policy.description = description;
            policy.date = date;
            policyDatabase.push_back(policy);
        }
    }

    inputFile.close();
    std::cout << "Policies loaded from " << filename << " successfully!" << std::endl;
}

int main() {
    std::string filename = "policies.csv"; // Replace with the desired file name for saving and loading policies

    // Load policies from the file (if available)
    loadPoliciesFromFile(filename);

    int option;

    do {
        std::cout << "Government Policy Tracker Menu" << std::endl;
        std::cout << "--------------------------------------" << std::endl;
        std::cout << "1. Add New Policy" << std::endl;
        std::cout << "2. View All Policies" << std::endl;
        std::cout << "3. Search Policies by Title" << std::endl;
        std::cout << "4. Search Policies by Date" << std::endl;
        std::cout << "5. Delete Policy" << std::endl;
        std::cout << "6. Save Policies to File" << std::endl;
        std::cout << "7. Exit" << std::endl;
        std::cout << "Enter your choice: ";
        std::cin >> option;

        switch (option) {
            case 1:
                addPolicy();
                break;
            case 2:
                displayPolicies();
                break;
            case 3:
                searchByTitle();
                break;
            case 4:
                searchByDate();
                break;
            case 5:
                deletePolicy();
                break;
            case 6:
                savePoliciesToFile(filename);
                break;
            case 7:
                std::cout << "Exiting Government Policy Tracker." << std::endl;
                break;
            default:
                std::cout << "Invalid input. Please try again." << std::endl;
        }

    } while (option != 7);

    // Save policies to the file before exiting
    savePoliciesToFile(filename);

    return 0;
}
