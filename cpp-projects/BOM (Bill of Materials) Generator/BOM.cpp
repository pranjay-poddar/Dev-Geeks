#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <algorithm>

using namespace std;

// Structure to represent a component
struct Component {
    string name;
    double quantity;
};

// BOMGenerator class for managing Bill of Materials
class BOMGenerator {
private:
    map<string, vector<Component>> bom;

public:
    // Function to add a component to the Bill of Materials for a product
    void addComponent(const string& product, const Component& component) {
        bom[product].push_back(component);
    }

    // Function to display the Bill of Materials for a specific product
    void displayBOM(const string& product) const {
        auto it = bom.find(product);
        if (it != bom.end()) {
            cout << "Bill of Materials for " << product << ":\n";
            for (const Component& component : it->second) {
                cout << "Component: " << component.name << ", Quantity: " << component.quantity << "\n";
            }
        } else {
            cout << "Bill of Materials not found for " << product << ".\n";
        }
    }

    // Function to display all available products for which the Bill of Materials have been created
    void displayAllProducts() const {
        cout << "Available Products:\n";
        for (const auto& entry : bom) {
            cout << entry.first << "\n";
        }
    }

    // Function to remove a specific component from the Bill of Materials of a product
    void removeComponent(const string& product, const string& componentName) {
        auto it = bom.find(product);
        if (it != bom.end()) {
            vector<Component>& components = it->second;
            // Use remove_if and erase to remove the component from the vector
            components.erase(remove_if(components.begin(), components.end(),
                [componentName](const Component& component) {
                    return component.name == componentName;
                }), components.end());
            cout << "Removed component: " << componentName << " from the Bill of Materials of " << product << ".\n";
        } else {
            cout << "Product " << product << " not found. Cannot remove component.\n";
        }
    }

    // Function to clear the entire Bill of Materials for a product
    void clearBOM(const string& product) {
        auto it = bom.find(product);
        if (it != bom.end()) {
            it->second.clear();
            cout << "Cleared the Bill of Materials for " << product << ".\n";
        } else {
            cout << "Bill of Materials not found for " << product << ".\n";
        }
    }
};

// Main function to run the BOM Generator application
int main() {
    BOMGenerator bomGenerator;

    int option;
    while (true) {
        cout << "BOM Generator Menu:\n";
        cout << "1. Add Component to Product\n";
        cout << "2. Display Bill of Materials\n";
        cout << "3. Display All Products\n";
        cout << "4. Remove Component from Product\n";
        cout << "5. Clear Bill of Materials for Product\n";
        cout << "6. Exit\n";
        cout << "Enter your choice: ";
        cin >> option;

        string productName, componentName;
        double quantity;

        switch (option) {
            case 1:
                cout << "Enter the product name: ";
                cin.ignore();
                getline(cin, productName);

                cout << "Enter the component name: ";
                getline(cin, componentName);

                cout << "Enter the component quantity: ";
                cin >> quantity;

                bomGenerator.addComponent(productName, { componentName, quantity });
                cout << "Component added to the Bill of Materials.\n";
                break;

            case 2:
                cout << "Enter the product name: ";
                cin.ignore();
                getline(cin, productName);
                bomGenerator.displayBOM(productName);
                break;

            case 3:
                bomGenerator.displayAllProducts();
                break;

            case 4:
                cout << "Enter the product name: ";
                cin.ignore();
                getline(cin, productName);

                cout << "Enter the component name to remove: ";
                getline(cin, componentName);

                bomGenerator.removeComponent(productName, componentName);
                break;

            case 5:
                cout << "Enter the product name: ";
                cin.ignore();
                getline(cin, productName);
                bomGenerator.clearBOM(productName);
                break;

            case 6:
                cout << "Exiting BOM Generator. Goodbye!\n";
                return 0;

            default:
                cout << "Invalid option. Please try again.\n";
                break;
        }

        cout << "\n";
    }

    return 0;
}
