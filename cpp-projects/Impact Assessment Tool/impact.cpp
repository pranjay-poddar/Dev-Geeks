#include <iostream>
#include <string>
#include <limits> // Include the header for numeric_limits

struct Project {
    std::string name;
    int beneficiariesReached;
    double fundsUtilized;
    double projectSuccessRating;
};

double calculateImpactScore(const Project& project) {
    // Define weights for each factor (should add up to 1.0)
    const double beneficiariesWeight = 0.3;
    const double fundsWeight = 0.4;
    const double ratingWeight = 0.3;

    // Calculate impact score
    return (beneficiariesWeight * project.beneficiariesReached +
            fundsWeight * project.fundsUtilized +
            ratingWeight * project.projectSuccessRating);
}

int main() {
    Project project;

    std::cout << "Impact Assessment Tool" << std::endl;

    std::cout << "Enter project name: ";
    std::getline(std::cin, project.name);

    while (project.name.empty()) {
        std::cout << "Project name cannot be empty. Please enter a valid project name: ";
        std::getline(std::cin, project.name);
    }

    do {
        std::cout << "Enter the number of beneficiaries reached: ";
        std::cin >> project.beneficiariesReached;

        // Check for invalid input (non-negative integer)
        if (std::cin.fail() || project.beneficiariesReached < 0) {
            std::cout << "Invalid input. Please enter a non-negative integer value." << std::endl;
            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
        }
    } while (project.beneficiariesReached < 0);

    do {
        std::cout << "Enter funds utilized (in USD): $";
        std::cin >> project.fundsUtilized;

        // Check for invalid input (non-negative double)
        if (std::cin.fail() || project.fundsUtilized < 0) {
            std::cout << "Invalid input. Please enter a non-negative value." << std::endl;
            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
        }
    } while (project.fundsUtilized < 0);

    do {
        std::cout << "Enter project success rating (out of 10): ";
        std::cin >> project.projectSuccessRating;

        // Check for invalid input (between 0 and 10)
        if (std::cin.fail() || project.projectSuccessRating < 0 || project.projectSuccessRating > 10) {
            std::cout << "Invalid input. Please enter a value between 0 and 10." << std::endl;
            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
        }
    } while (project.projectSuccessRating < 0 || project.projectSuccessRating > 10);

    // Clear any remaining input from the buffer
    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');

    // Calculate the impact score
    double impactScore = calculateImpactScore(project);

    std::cout << "\nImpact Assessment Summary" << std::endl;
    std::cout << "Project Name: " << project.name << std::endl;
    std::cout << "Beneficiaries Reached: " << project.beneficiariesReached << std::endl;
    std::cout << "Funds Utilized: $" << project.fundsUtilized << std::endl;
    std::cout << "Project Success Rating: " << project.projectSuccessRating << "/10" << std::endl;
    std::cout << "Impact Score: " << impactScore << std::endl;

    return 0;
}
