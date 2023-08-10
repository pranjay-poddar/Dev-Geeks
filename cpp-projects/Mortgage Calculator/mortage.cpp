#include <iostream>
#include <cmath>
#include <iomanip>

class MortgageCalculator {
private:
    double loanAmount;
    double annualInterestRate;
    int loanTermMonths;
    double additionalPayment;

public:
    MortgageCalculator(double amount, double rate, int termMonths, double additional)
        : loanAmount(amount), annualInterestRate(rate), loanTermMonths(termMonths), additionalPayment(additional) {}

    double calculateMonthlyPayment() {
        double monthlyRate = annualInterestRate / 12 / 100;
        double denominator = 1 - pow(1 + monthlyRate, -loanTermMonths);
        return (loanAmount * (monthlyRate / denominator)) + additionalPayment;
    }

    void generateAmortizationSchedule() {
        double balance = loanAmount;
        double monthlyPayment = calculateMonthlyPayment();
        
        std::cout << "\nAmortization Schedule:\n";
        std::cout << "Month\tPayment\tPrincipal\tInterest\tBalance\n";

        for (int month = 1; month <= loanTermMonths; ++month) {
            double interestPayment = balance * (annualInterestRate / 12 / 100);
            double principalPayment = monthlyPayment - interestPayment;
            balance -= principalPayment;

            std::cout << std::fixed << std::setprecision(2);
            std::cout << month << "\t$" << monthlyPayment << "\t$" << principalPayment << "\t$" << interestPayment << "\t$" << balance << "\n";
        }
    }

    double calculateTotalInterestPaid() {
        double totalInterest = 0.0;
        double balance = loanAmount;
        double monthlyPayment = calculateMonthlyPayment();

        for (int month = 1; month <= loanTermMonths; ++month) {
            double interestPayment = balance * (annualInterestRate / 12 / 100);
            totalInterest += interestPayment;

            double principalPayment = monthlyPayment - interestPayment;
            balance -= principalPayment;
        }

        return totalInterest;
    }

    int calculatePayoffYear() {
        int years = loanTermMonths / 12;
        if (loanTermMonths % 12 != 0) {
            years += 1;
        }
        return years;
    }
};

int main() {
    double loanAmount, annualInterestRate, additionalPayment;
    int loanTermYears;

    std::cout << "Mortgage Calculator\n";
    std::cout << "Enter Loan Amount: ";
    std::cin >> loanAmount;

    std::cout << "Enter Annual Interest Rate (%): ";
    std::cin >> annualInterestRate;

    std::cout << "Enter Loan Term (in years): ";
    std::cin >> loanTermYears;

    std::cout << "Enter Additional Monthly Payment: ";
    std::cin >> additionalPayment;

    int loanTermMonths = loanTermYears * 12;

    MortgageCalculator calculator(loanAmount, annualInterestRate, loanTermMonths, additionalPayment);
    double monthlyPayment = calculator.calculateMonthlyPayment();

    std::cout << "Monthly Payment (including additional payment): $" << monthlyPayment << "\n";

    calculator.generateAmortizationSchedule();

    double totalInterest = calculator.calculateTotalInterestPaid();
    std::cout << "Total Interest Paid: $" << totalInterest << "\n";

    int payoffYear = calculator.calculatePayoffYear();
    std::cout << "Loan Payoff Year: " << payoffYear << "\n";

    return 0;
}
