#include <iostream>
#include <fstream>
#include <string>

// Function to read and display the contents of a text file
void readTextFile(const std::string& filename) {
    std::ifstream file(filename);
    if (!file) {
        // Check if the file was successfully opened
        std::cout << "Error: Unable to open the file " << filename << std::endl;
        return;
    }

    std::string line;
    while (std::getline(file, line)) {
        // Read and print each line of the file
        std::cout << line << std::endl;
    }

    file.close();
}

// Function to display the menu options
void displayMenu() {
    std::cout << "===== Hindu Scriptures Reader =====" << std::endl;
    std::cout << "1. Read Ramayana" << std::endl;
    std::cout << "2. Read Mahabharata" << std::endl;
    std::cout << "3. Read Bhagavad Gita" << std::endl;
    std::cout << "4. Read Garg Samhita" << std::endl;
    std::cout << "5. Exit" << std::endl;
    std::cout << "===================================" << std::endl;
}

int main() {
    int choice;

    do {
        displayMenu();
        std::cout << "Enter your choice (1-5): ";
        std::cin >> choice;

        switch (choice) {
            case 1:
                readTextFile("texts/ramayana.txt");
                break;
            case 2:
                readTextFile("texts/mahabharata.txt");
                break;
            case 3:
                readTextFile("texts/bhagavad_gita.txt");
                break;
            case 4:
                readTextFile("texts/garg_samhita.txt");
                break;
            case 5:
                std::cout << "Thank you for using the Hindu Scriptures Reader. Have a blessed day!" << std::endl;
                break;
            default:
                std::cout << "Invalid choice. Please enter a number from 1 to 5." << std::endl;
        }
    } while (choice != 5);

    return 0;
}
