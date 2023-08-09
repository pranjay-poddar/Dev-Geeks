#include <iostream>
#include <vector>
#include <algorithm> // for std::transform
#include <locale>    // for std::locale and std::tolower

using namespace std;

struct Souvenir {
    string name;
    double price;
    string category;
    bool purchased;
};

// Function to add a new souvenir to the shopping list
void addSouvenir(vector<Souvenir>& shoppingList) {
    Souvenir newSouvenir;
    cout << "Enter the name of the souvenir: ";
    cin.ignore();
    getline(cin, newSouvenir.name);
    cout << "Enter the price of the souvenir: $";
    cin >> newSouvenir.price;
    cout << "Enter the category of the souvenir: ";
    cin.ignore();
    getline(cin, newSouvenir.category);
    newSouvenir.purchased = false;

    shoppingList.push_back(newSouvenir);
}

// Function to mark a souvenir as purchased
void markPurchased(vector<Souvenir>& shoppingList, int index) {
    if (index >= 0 && index < shoppingList.size()) {
        shoppingList[index].purchased = true;
        cout << shoppingList[index].name << " has been marked as purchased!" << endl;
    } else {
        cout << "Invalid index. Please try again." << endl;
    }
}

// Function to mark a purchased souvenir as "unpurchased"
void markUnpurchased(vector<Souvenir>& shoppingList, int index) {
    if (index >= 0 && index < shoppingList.size()) {
        shoppingList[index].purchased = false;
        cout << shoppingList[index].name << " has been marked as unpurchased!" << endl;
    } else {
        cout << "Invalid index. Please try again." << endl;
    }
}

// Function to edit a souvenir's name, price, or category
void editSouvenir(vector<Souvenir>& shoppingList, int index) {
    if (index >= 0 && index < shoppingList.size()) {
        cout << "Enter the new name of the souvenir: ";
        cin.ignore();
        getline(cin, shoppingList[index].name);
        cout << "Enter the new price of the souvenir: $";
        cin >> shoppingList[index].price;
        cout << "Enter the new category of the souvenir: ";
        cin.ignore();
        getline(cin, shoppingList[index].category);
        cout << "Souvenir details updated!" << endl;
    } else {
        cout << "Invalid index. Please try again." << endl;
    }
}

// Function to remove a souvenir from the shopping list
void removeSouvenir(vector<Souvenir>& shoppingList, int index) {
    if (index >= 0 && index < shoppingList.size()) {
        shoppingList.erase(shoppingList.begin() + index);
        cout << "Souvenir removed from the shopping list!" << endl;
    } else {
        cout << "Invalid index. Please try again." << endl;
    }
}

// Function to display the shopping list and remaining budget
void displayShoppingList(const vector<Souvenir>& shoppingList, double budget) {
    cout << "Souvenir Shopping List:" << endl;
    for (int i = 0; i < shoppingList.size(); ++i) {
        cout << i + 1 << ". ";
        if (shoppingList[i].purchased) {
            cout << "[Purchased] ";
        }
        cout << shoppingList[i].name << " - $" << shoppingList[i].price;
        cout << " (Category: " << shoppingList[i].category << ")" << endl;
    }

    double totalSpent = 0.0;
    for (const Souvenir& souvenir : shoppingList) {
        if (souvenir.purchased) {
            totalSpent += souvenir.price;
        }
    }
    cout << "Total Spent: $" << totalSpent << endl;

    double remainingBudget = budget - totalSpent;
    cout << "Remaining Budget: $" << remainingBudget << endl;
    cout << "Remaining Budget Percentage: " << (remainingBudget / budget) * 100 << "%" << endl;
}

// Function to find souvenirs by category
void findSouvenirByCategory(const vector<Souvenir>& shoppingList, const string& category) {
    cout << "Souvenirs in the category '" << category << "':" << endl;
    for (const Souvenir& souvenir : shoppingList) {
        if (souvenir.category == category) {
            cout << souvenir.name << " - $" << souvenir.price << endl;
        }
    }
}

// Function to clear the entire shopping list
void clearShoppingList(vector<Souvenir>& shoppingList) {
    shoppingList.clear();
    cout << "Shopping list cleared!" << endl;
}

// Function to display all purchased souvenirs
void viewPurchasedSouvenirs(const vector<Souvenir>& shoppingList) {
    cout << "Purchased Souvenirs:" << endl;
    for (const Souvenir& souvenir : shoppingList) {
        if (souvenir.purchased) {
            cout << souvenir.name << " - $" << souvenir.price << endl;
        }
    }
}

// Function to compare souvenirs by name (for sorting)
bool compareByName(const Souvenir& a, const Souvenir& b) {
    return a.name < b.name;
}

// Function to compare souvenirs by price (for sorting)
bool compareByPrice(const Souvenir& a, const Souvenir& b) {
    return a.price < b.price;
}

// Function to search for souvenirs by name or category
void searchSouvenirs(const vector<Souvenir>& shoppingList, const string& searchTerm) {
    cout << "Search results for '" << searchTerm << "':" << endl;
    for (const Souvenir& souvenir : shoppingList) {
        if (souvenir.name.find(searchTerm) != string::npos || souvenir.category.find(searchTerm) != string::npos) {
            cout << souvenir.name << " - $" << souvenir.price << " (Category: " << souvenir.category << ")" << endl;
        }
    }
}

// Function to adjust the budget
void adjustBudget(double& budget) {
    double additionalBudget;
    cout << "Enter the additional budget amount: $";
    cin >> additionalBudget;
    budget += additionalBudget;
    cout << "Budget adjusted! New budget: $" << budget << endl;
}

int main() {
    vector<Souvenir> shoppingList;
    double budget;

    cout << "Welcome to the Souvenir Shopping Assistant!" << endl;
    cout << "Please enter your budget for souvenirs: $";
    cin >> budget;

    char choice;
    do {
        cout << "Menu:" << endl;
        cout << "1. Add a new souvenir to the shopping list" << endl;
        cout << "2. Mark a souvenir as purchased" << endl;
        cout << "3. Mark a purchased souvenir as unpurchased" << endl;
        cout << "4. Edit a souvenir's name, price, or category" << endl;
        cout << "5. Remove a souvenir from the shopping list" << endl;
        cout << "6. Sort the shopping list by name" << endl;
        cout << "7. Sort the shopping list by price" << endl;
        cout << "8. Find souvenirs by category" << endl;
        cout << "9. Clear the shopping list" << endl;
        cout << "10. View purchased souvenirs" << endl;
        cout << "11. Display the shopping list and remaining budget" << endl;
        cout << "12. Set a reminder for a souvenir" << endl;
        cout << "13. Search for souvenirs by name or category" << endl;
        cout << "14. Adjust budget" << endl;
        cout << "15. Exit" << endl;
        cout << "Enter your choice (1/2/3/4/5/6/7/8/9/10/11/12/13/14/15): ";
        cin >> choice;

        switch (choice) {
            case 1:
                addSouvenir(shoppingList);
                break;
            case 2: {
                int index;
                cout << "Enter the index of the souvenir to mark as purchased: ";
                cin >> index;
                markPurchased(shoppingList, index - 1);
                break;
            }
            case 3: {
                int index;
                cout << "Enter the index of the souvenir to mark as unpurchased: ";
                cin >> index;
                markUnpurchased(shoppingList, index - 1);
                break;
            }
            case 4: {
                int index;
                cout << "Enter the index of the souvenir to edit: ";
                cin >> index;
                editSouvenir(shoppingList, index - 1);
                break;
            }
            case 5: {
                int index;
                cout << "Enter the index of the souvenir to remove: ";
                cin >> index;
                removeSouvenir(shoppingList, index - 1);
                break;
            }
            case 6:
                sort(shoppingList.begin(), shoppingList.end(), compareByName);
                cout << "Shopping list sorted by name." << endl;
                break;
            case 7:
                sort(shoppingList.begin(), shoppingList.end(), compareByPrice);
                cout << "Shopping list sorted by price." << endl;
                break;
            case 8: {
                string category;
                cout << "Enter the category to find souvenirs: ";
                cin.ignore();
                getline(cin, category);
                findSouvenirByCategory(shoppingList, category);
                break;
            }
            case 9:
                clearShoppingList(shoppingList);
                break;
            case 10:
                viewPurchasedSouvenirs(shoppingList);
                break;
            case 11:
                displayShoppingList(shoppingList, budget);
                break;
            case 12: {
                int index;
                cout << "Enter the index of the souvenir to set a reminder: ";
                cin >> index;
                markUnpurchased(shoppingList, index - 1);
                break;
            }
            case 13: {
                string searchTerm;
                cout << "Enter the search term: ";
                cin.ignore();
                getline(cin, searchTerm);
                searchSouvenirs(shoppingList, searchTerm);
                break;
            }
            case 14:
                adjustBudget(budget);
                break;
           case 15:
                cout << "Thank you for using the Souvenir Shopping Assistant!" << endl;
                break;
            default:
                cout << "Invalid choice. Please try again." << endl;
        }
    } while (choice != 15);

    return 0;
}
