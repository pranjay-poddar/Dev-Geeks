#include <iostream>
#include <fstream>
#include <sstream> 
#include <vector>
#include <string>
#include <map>

class Animal {
protected:
    std::string type;
    int age;
public:
    Animal(std::string _type, int _age) : type(_type), age(_age) {}
    virtual void printInfo() {
        std::cout << "Type: " << type << ", Age: " << age << " years";
    }
    virtual double calculateProduction() { return 0; }
};

class Cow : public Animal {
private:
    double milkProduction;
public:
    Cow(int _age, double _milkProduction) : Animal("Cow", _age), milkProduction(_milkProduction) {}
    void printInfo() override {
        Animal::printInfo();
        std::cout << ", Milk Production: " << milkProduction << " liters per day" << std::endl;
    }
    double calculateProduction() override {
        return milkProduction * 365; // Annual milk production
    }
};

class Sheep : public Animal {
private:
    int woolProduction;
public:
    Sheep(int _age, int _woolProduction) : Animal("Sheep", _age), woolProduction(_woolProduction) {}
    void printInfo() override {
        Animal::printInfo();
        std::cout << ", Wool Production: " << woolProduction << " kilograms per year" << std::endl;
    }
    double calculateProduction() override {
        return woolProduction; // Annual wool production
    }
};

class Pig : public Animal {
private:
    int meatProduction;
public:
    Pig(int _age, int _meatProduction) : Animal("Pig", _age), meatProduction(_meatProduction) {}
    void printInfo() override {
        Animal::printInfo();
        std::cout << ", Meat Production: " << meatProduction << " kilograms" << std::endl;
    }
    double calculateProduction() override {
        return meatProduction; // Total meat production
    }
};

void saveData(const std::map<std::string, Animal*>& livestock) {
    std::ofstream outFile("livestock_data.txt");
    if (outFile.is_open()) {
        for (const auto& entry : livestock) {
            outFile << entry.first << "," << entry.second->calculateProduction() << "\n";
        }
        outFile.close();
        std::cout << "Data saved to 'livestock_data.txt'." << std::endl;
    } else {
        std::cout << "Error saving data." << std::endl;
    }
}

int main() {
    std::map<std::string, Animal*> livestockDatabase;

    // Load data from file if available
    std::ifstream inFile("livestock_data.txt");
    if (inFile.is_open()) {
        std::string line;
        while (std::getline(inFile, line)) {
            std::string name;
            double production;
            std::istringstream iss(line);
            if (iss >> name >> production) {
                livestockDatabase[name] = new Animal("Unknown", 0); // Placeholder animal
            }
        }
        inFile.close();
    }

    // Interactive menu for managing livestock
    while (true) {
        std::cout << "\nLivestock Management Menu:\n";
        std::cout << "1. Add Animal\n";
        std::cout << "2. View Animal Info\n";
        std::cout << "3. List All Animals\n";
        std::cout << "4. Save Data\n";
        std::cout << "5. Exit\n";
        int choice;
        std::cout << "Enter your choice: ";
        std::cin >> choice;

        if (choice == 1) {
            // ... (Same as before)
        } else if (choice == 2) {
            // ... (Same as before)
        } else if (choice == 3) {
            // ... (Same as before)
        } else if (choice == 4) {
            saveData(livestockDatabase);
        } else if (choice == 5) {
            std::cout << "Exiting the program. Goodbye!" << std::endl;
            break;
        } else {
            std::cout << "Invalid choice. Please enter a valid option." << std::endl;
        }
    }

    // Clean up memory
    for (const auto& entry : livestockDatabase) {
        delete entry.second;
    }

    return 0;
}
