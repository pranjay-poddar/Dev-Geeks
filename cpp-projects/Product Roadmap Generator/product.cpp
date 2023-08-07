#include <iostream>
#include <vector>
#include <string>
#include <iomanip>
#include <fstream>

// Define a structure to represent a roadmap item
struct RoadmapItem {
    std::string task;
    std::string deadline;
};

// Define a class to manage the product roadmap
class ProductRoadmap {
private:
    std::vector<RoadmapItem> items;

public:
    // Method to add a new item to the roadmap
    void addItem(const std::string& task, const std::string& deadline) {
        items.push_back({task, deadline});
    }

    // Method to display the entire roadmap
    void displayRoadmap() {
        std::cout << "Product Roadmap:\n";
        std::cout << std::left << std::setw(30) << "Task" << "Deadline\n";
        std::cout << "---------------------------------------------\n";
        for (const auto& item : items) {
            std::cout << std::left << std::setw(30) << item.task << item.deadline << "\n";
        }
    }

    // Method to save the roadmap to a text file
    void saveToFile(const std::string& filename) {
        std::ofstream file(filename);
        if (file.is_open()) {
            for (const auto& item : items) {
                file << item.task << "," << item.deadline << "\n";
            }
            file.close();
            std::cout << "Roadmap saved to " << filename << std::endl;
        } else {
            std::cout << "Error: Unable to save to file." << std::endl;
        }
    }

    // Method to load roadmap items from a text file
    void loadFromFile(const std::string& filename) {
        std::ifstream file(filename);
        if (file.is_open()) {
            items.clear();
            std::string line;
            while (std::getline(file, line)) {
                size_t pos = line.find(",");
                if (pos != std::string::npos) {
                    std::string task = line.substr(0, pos);
                    std::string deadline = line.substr(pos + 1);
                    addItem(task, deadline);
                }
            }
            file.close();
            std::cout << "Roadmap loaded from " << filename << std::endl;
        } else {
            std::cout << "Error: Unable to load from file." << std::endl;
        }
    }
};

int main() {
    ProductRoadmap roadmap;

    // Interactive menu loop
    while (true) {
        std::cout << "Choose an option:\n";
        std::cout << "1. Add Item\n";
        std::cout << "2. Display Roadmap\n";
        std::cout << "3. Save to File\n";
        std::cout << "4. Load from File\n";
        std::cout << "5. Quit\n";

        int choice;
        std::cin >> choice;

        // Handle user's choice
        if (choice == 1) {
            std::string task, deadline;
            std::cout << "Enter task: ";
            std::cin.ignore();
            std::getline(std::cin, task);
            std::cout << "Enter deadline: ";
            std::cin >> deadline;
            roadmap.addItem(task, deadline);
        } else if (choice == 2) {
            roadmap.displayRoadmap();
        } else if (choice == 3) {
            roadmap.saveToFile("roadmap.txt");
        } else if (choice == 4) {
            roadmap.loadFromFile("roadmap.txt");
        } else if (choice == 5) {
            break;
        } else {
            std::cout << "Invalid choice. Please select again." << std::endl;
        }
    }

    return 0;
}
