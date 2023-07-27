#include <iostream>
#include <vector>
#include <iomanip>
#include <limits>
#include <algorithm>


using namespace std;

struct Product {
    string name;
    int quantity;
    double price;
};

void displayProducts(const vector<Product>& products) {
    cout << "Product List:" << endl;
    cout << "----------------------------------------------------" << endl;
    cout << setw(15) << "Product Name" << setw(15) << "Quantity" << setw(15) << "Price" << endl;
    cout << "----------------------------------------------------" << endl;

    for (const auto& product : products) {
        cout << setw(15) << product.name << setw(15) << product.quantity << setw(15) << product.price << endl;
    }

    cout << "----------------------------------------------------" << endl;
}

void addToCart(vector<Product>& products, vector<Product>& cart) {
    string itemName;
    cout << "Enter the product name to add to the cart: ";
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
    getline(cin, itemName);

    for (auto& product : products) {
        if (product.name == itemName) {
            int quantity;
            cout << "Enter the quantity: ";
            cin >> quantity;

            if (product.quantity >= quantity) {
                product.quantity -= quantity;
                cart.push_back({ product.name, quantity, product.price });
                cout << "Item added to the cart!" << endl;
            } else {
                cout << "Insufficient quantity available!" << endl;
            }

            return;
        }
    }

    cout << "Product not found!" << endl;
}

void displayCart(const vector<Product>& cart) {
    if (cart.empty()) {
        cout << "Your cart is empty." << endl;
        return;
    }

    cout << "Cart Items:" << endl;
    cout << "----------------------------------------------------" << endl;
    cout << setw(15) << "Product Name" << setw(15) << "Quantity" << setw(15) << "Price" << endl;
    cout << "----------------------------------------------------" << endl;

    for (const auto& item : cart) {
        cout << setw(15) << item.name << setw(15) << item.quantity << setw(15) << item.price << endl;
    }

    cout << "----------------------------------------------------" << endl;
}

double calculateBill(const vector<Product>& cart) {
    double totalBill = 0.0;

    for (const auto& item : cart) {
        double itemTotal = item.quantity * item.price;
        totalBill += itemTotal;
    }

    return totalBill;
}

void modifyProducts(vector<Product>& products) {
    string itemName;
    cout << "Enter the product name to modify: ";
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
    getline(cin, itemName);

    for (auto& product : products) {
        if (product.name == itemName) {
            cout << "Enter the new quantity: ";
            cin >> product.quantity;

            cout << "Enter the new price: ";
            cin >> product.price;

            cout << "Product modified successfully!" << endl;
            return;
        }
    }

    cout << "Product not found!" << endl;
}

void addNewProduct(vector<Product>& products) {
    Product newProduct;

    cout << "Enter the product name: ";
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
    getline(cin, newProduct.name);

    cout << "Enter the quantity: ";
    cin >> newProduct.quantity;

    cout << "Enter the price: ";
    cin >> newProduct.price;

    products.push_back(newProduct);

    cout << "Product added successfully!" << endl;
}

void deleteProduct(vector<Product>& products) {
    string itemName;
    cout << "Enter the product name to delete: ";
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
    getline(cin, itemName);

    for (auto it = products.begin(); it != products.end(); ++it) {
        if (it->name == itemName) {
            products.erase(it);
            cout << "Product deleted successfully!" << endl;
            return;
        }
    }

    cout << "Product not found!" << endl;
}

void staffViewProducts(const vector<Product>& products) {
    displayProducts(products);
}

void customerViewProducts(const vector<Product>& products) {
    displayProducts(products);
}

void customerSection(vector<Product>& products, vector<Product>& cart) {
    int choice;
    while (true) {
        cout << "\nCustomer Section" << endl;
        cout << "1. View Products" << endl;
        cout << "2. Add Item to Cart" << endl;
        cout << "3. Display Cart" << endl;
        cout << "4. Calculate Bill" << endl;
        cout << "5. Exit" << endl;
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice) {
            case 1:
                customerViewProducts(products);
                break;
            case 2:
                addToCart(products, cart);
                break;
            case 3:
                displayCart(cart);
                break;
            case 4: {
                double totalBill = calculateBill(cart);
                cout << "Total Bill: " << totalBill << endl;
                break;
            }
            case 5:
                cout << "Exiting the customer section." << endl;
                return;
            default:
                cout << "Invalid choice. Please try again." << endl;
        }
    }
}

void staffSection(vector<Product>& products) {
    int choice;
    while (true) {
        cout << "\nStaff Section" << endl;
        cout << "1. Modify Products" << endl;
        cout << "2. Add New Product" << endl;
        cout << "3. Delete Product" << endl;
        cout << "4. View Products" << endl;
        cout << "5. Exit" << endl;
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice) {
            case 1:
                modifyProducts(products);
                break;
            case 2:
                addNewProduct(products);
                break;
            case 3:
                deleteProduct(products);
                break;
            case 4:
                staffViewProducts(products);
                break;
            case 5:
                cout << "Exiting the staff section." << endl;
                return;
            default:
                cout << "Invalid choice. Please try again." << endl;
        }
    }
}

int main() {
    vector<Product> products = {
        { "Apple", 10, 1.5 },
        { "Banana", 20, 0.75 },
        { "Milk", 5, 2.0 },
        { "Bread", 15, 1.25 }
    };

    vector<Product> cart;

    int choice;
    while (true) {
        cout << "Grocery Store Management" << endl;
        cout << "1. Customer Section" << endl;
        cout << "2. Staff Section" << endl;
        cout << "3. Exit" << endl;
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice) {
            case 1:
                customerSection(products, cart);
                break;
            case 2:
                staffSection(products);
                break;
            case 3:
                cout << "Exiting the program." << endl;
                return 0;
            default:
                cout << "Invalid choice. Please try again." << endl;
        }
    }
}
