#include <iostream>
#include <string>
#include <vector>

class TaxForm {
public:
    virtual double calculateTax() const = 0;
    virtual void displayForm() const = 0;
};

class IndividualTaxForm : public TaxForm {
private:
    std::string name;
    double income;

public:
    IndividualTaxForm(const std::string& n, double i) : name(n), income(i) {}

    double calculateTax() const override {
        // Simplified tax calculation based on income
        return income * 0.15;
    }

    void displayForm() const override {
        std::cout << "Individual Tax Form\n";
        std::cout << "Name: " << name << "\n";
        std::cout << "Income: $" << income << "\n";
    }
};

class BusinessTaxForm : public TaxForm {
private:
    std::string businessName;
    double revenue;
    double expenses;

public:
    BusinessTaxForm(const std::string& bn, double rev, double exp) : businessName(bn), revenue(rev), expenses(exp) {}

    double calculateTax() const override {
        // Simplified tax calculation based on revenue and expenses
        return (revenue - expenses) * 0.2;
    }

    void displayForm() const override {
        std::cout << "Business Tax Form\n";
        std::cout << "Business Name: " << businessName << "\n";
        std::cout << "Revenue: $" << revenue << "\n";
        std::cout << "Expenses: $" << expenses << "\n";
    }
};

int main() {
    std::vector<TaxForm*> taxForms;

    int numForms;
    std::cout << "Enter the number of tax forms: ";
    std::cin >> numForms;
    std::cin.ignore(); // Clear newline

    for (int i = 0; i < numForms; ++i) {
        std::cout << "Tax Form " << i + 1 << ":\n";
        std::string formType;
        std::cout << "Enter form type (Individual/Business): ";
        std::getline(std::cin, formType);

        if (formType == "Individual") {
            std::string individualName;
            double individualIncome;
            std::cout << "Enter individual's name: ";
            std::getline(std::cin, individualName);
            std::cout << "Enter individual's income: ";
            std::cin >> individualIncome;
            std::cin.ignore(); // Clear newline
            taxForms.push_back(new IndividualTaxForm(individualName, individualIncome));
        } else if (formType == "Business") {
            std::string businessName;
            double businessRevenue, businessExpenses;
            std::cout << "Enter business name: ";
            std::getline(std::cin, businessName);
            std::cout << "Enter business revenue: ";
            std::cin >> businessRevenue;
            std::cout << "Enter business expenses: ";
            std::cin >> businessExpenses;
            std::cin.ignore(); // Clear newline
            taxForms.push_back(new BusinessTaxForm(businessName, businessRevenue, businessExpenses));
        } else {
            std::cout << "Invalid form type. Skipping.\n";
        }
    }

    // Display tax forms and calculated taxes
    double totalTax = 0.0;
    for (const TaxForm* form : taxForms) {
        form->displayForm();
        double taxAmount = form->calculateTax();
        std::cout << "Calculated Tax: $" << taxAmount << "\n";
        std::cout << "----------------------------\n";
        totalTax += taxAmount;
    }

    std::cout << "Total Tax Amount: $" << totalTax << "\n";

    // Cleanup memory
    for (TaxForm* form : taxForms) {
        delete form;
    }

    return 0;
}
