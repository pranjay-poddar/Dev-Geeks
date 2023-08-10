#include <iostream>
#include <string>
#include <map>

class WasteItem {
public:
    std::string type;
    double weight;

    WasteItem(std::string _type, double _weight) : type(_type), weight(_weight) {}
};

class WasteSorter {
private:
    std::map<std::string, std::string> sortingRules;

public:
    WasteSorter() {
        // Initialize sorting rules (You can add more rules here)
        sortingRules["plastic"] = "Recyclable";
        sortingRules["paper"] = "Recyclable";
        sortingRules["glass"] = "Recyclable";
        sortingRules["metal"] = "Recyclable";
        sortingRules["organic"] = "Organic Waste";
        sortingRules["electronic"] = "E-Waste";
        sortingRules["other"] = "Non-Recyclable";
    }

    std::string sortWaste(const WasteItem& item) {
        std::string itemType = item.type;
        if (sortingRules.find(itemType) != sortingRules.end()) {
            return sortingRules[itemType];
        }
        return "Unknown";
    }
};

int main() {
    WasteSorter wasteSorter;

    std::cout << "Waste Sorting Simulator\n";
    std::cout << "Enter waste item type (plastic, paper, glass, metal, organic, electronic, other): ";
    std::string itemType;
    std::cin >> itemType;

    std::cout << "Enter weight of waste item (in kg): ";
    double weight;
    std::cin >> weight;

    WasteItem wasteItem(itemType, weight);

    std::string sortingResult = wasteSorter.sortWaste(wasteItem);
    std::cout << "Waste item type: " << wasteItem.type << std::endl;
    std::cout << "Weight: " << wasteItem.weight << " kg" << std::endl;
    std::cout << "Sorting Result: " << sortingResult << std::endl;

    // Additional features
    if (sortingResult == "Recyclable") {
        std::cout << "You can recycle this waste item!" << std::endl;
    } else if (sortingResult == "Organic Waste") {
        std::cout << "Consider composting this organic waste." << std::endl;
    } else if (sortingResult == "E-Waste") {
        std::cout << "Properly dispose of this electronic waste." << std::endl;
    } else {
        std::cout << "This waste item should be disposed of as non-recyclable waste." << std::endl;
    }

    // Additional features: Calculate carbon footprint
    if (sortingResult != "Non-Recyclable") {
        double carbonFootprint = weight * 0.1; // Arbitrary factor for carbon footprint calculation
        std::cout << "Estimated carbon footprint for this waste: " << carbonFootprint << " kg CO2" << std::endl;
    }

    // Additional features: Suggest recycling centers
    if (sortingResult == "Recyclable" || sortingResult == "E-Waste") {
        std::cout << "You might consider taking this waste to a nearby recycling center." << std::endl;
    }

    return 0;
}
