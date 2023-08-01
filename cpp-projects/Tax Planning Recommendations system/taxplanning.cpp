#include <iostream>
#include <vector>

class TaxPlanner {
public:
    static double calculateTaxLiability(double income) {
        // Simplified tax calculation logic (replace with real tax rules)
        double taxRate = 0.15; // Example flat tax rate
        return income * taxRate;
    }

    static double calculateDeductions(const std::vector<double>& deductions) {
        // Simplified deduction calculation logic (replace with real rules)
        double totalDeductions = 0;

        for (double deduction : deductions) {
            totalDeductions += deduction;
        }

        return totalDeductions;
    }

    static void recommendTaxPlanning(double income, const std::vector<double>& deductions) {
        double taxLiability = calculateTaxLiability(income);
        double totalDeductions = calculateDeductions(deductions);

        double netTaxPayable = taxLiability - totalDeductions;
        if (netTaxPayable > 0) {
            std::cout << "You can save on taxes by considering the following recommendations:\n";
            if (totalDeductions > 0) {
                std::cout << "- Increase your investments in tax-deductible schemes.\n";
            }
            // Add more recommendations based on individual circumstances (e.g., home loan interest, medical expenses, etc.)
        } else {
            std::cout << "Your tax planning is already optimized. No further recommendations at this time.\n";
        }
    }
};

int main() {
    double income;
    std::vector<double> deductions;

    std::cout << "Tax Planning Recommendations System\n";
    std::cout << "Enter your annual income: ";
    std::cin >> income;

    if (income < 0) {
        std::cout << "Income cannot be negative.\n";
        return 1;
    }

    int numDeductions;
    std::cout << "Enter the number of deduction categories: ";
    std::cin >> numDeductions;

    if (numDeductions <= 0) {
        std::cout << "Number of deductions must be greater than zero.\n";
        return 1;
    }

    for (int i = 1; i <= numDeductions; i++) {
        double deduction;
        std::cout << "Enter the amount for deduction category " << i << ": ";
        std::cin >> deduction;

        if (deduction < 0) {
            std::cout << "Deduction amount cannot be negative.\n";
            return 1;
        }

        deductions.push_back(deduction);
    }

    TaxPlanner::recommendTaxPlanning(income, deductions);

    return 0;
}
