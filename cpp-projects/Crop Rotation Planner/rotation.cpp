#include <iostream>
#include <vector>
#include <map>

struct Crop {
    std::string name;
    int growthTime; // in months
};

// Display the list of available crops
void displayAvailableCrops(const std::vector<Crop>& crops) {
    std::cout << "Available Crops:\n";
    for (const Crop& crop : crops) {
        std::cout << "- " << crop.name << " (" << crop.growthTime << " months)\n";
    }
}

// Display the rotation plan for selected crops
void displayRotationPlan(const std::vector<Crop>& planCrops) {
    std::cout << "Rotation Plan:\n";
    for (const Crop& crop : planCrops) {
        std::cout << "- " << crop.name << " (" << crop.growthTime << " months)\n";
    }
}

int main() {
    // Available crops and predefined rotation plans
    std::vector<Crop> availableCrops = {
        {"Wheat", 4},
        {"Corn", 6},
        {"Soybean", 3},
        {"Potato", 5},
        {"Tomato", 2}
    };

    std::map<int, std::vector<Crop>> rotationPlans = {
        {1, {availableCrops[0], availableCrops[1], availableCrops[2]}},
        {2, {availableCrops[3], availableCrops[4], availableCrops[0]}}
    };

    // Introduction
    std::cout << "Crop Rotation Planner\n";
    displayAvailableCrops(availableCrops);

    // Select a rotation plan
    int selectedRotationPlan;
    std::cout << "Select a rotation plan (1 or 2): ";
    std::cin >> selectedRotationPlan;

    // Check if the selected plan exists
    if (rotationPlans.find(selectedRotationPlan) != rotationPlans.end()) {
        const std::vector<Crop>& planCrops = rotationPlans[selectedRotationPlan];
        displayRotationPlan(planCrops);

        // Input the elapsed months
        int monthsElapsed;
        std::cout << "Enter the number of months that have elapsed since the start of the rotation: ";
        std::cin >> monthsElapsed;

        // Display projected crops after the given months
        std::cout << "Projected Crops after " << monthsElapsed << " months:\n";
        for (const Crop& crop : planCrops) {
            int remainingMonths = (crop.growthTime - (monthsElapsed % crop.growthTime)) % crop.growthTime;
            std::cout << "- " << crop.name << " (Growth Time: " << crop.growthTime << " months, Remaining: " << remainingMonths << " months)\n";
        }

        // Offer to analyze disease risk
        char analyzeRisk;
        std::cout << "Do you want to analyze disease risk? (y/n): ";
        std::cin >> analyzeRisk;

        if (analyzeRisk == 'y' || analyzeRisk == 'Y') {
            // Add disease risk analysis logic here
            std::cout << "Disease risk analysis results:\n";
            // Perform risk analysis based on factors like crop history, soil health, weather, etc.
        }

        // Educational insights about crop rotation benefits
        std::cout << "\nEducational Insights:\n";
        std::cout << "Crop rotation is a farming practice that involves planting different crops in sequence.\n";
        std::cout << "Benefits of crop rotation:\n";
        std::cout << "- Improved soil health and fertility\n";
        std::cout << "- Reduced risk of pests and diseases\n";
        std::cout << "- Efficient use of nutrients\n";
        std::cout << "- Prevention of soil erosion\n";
    } else {
        std::cout << "Invalid rotation plan selection.\n";
    }

    return 0;
}
