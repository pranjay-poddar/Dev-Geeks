#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

class Investment {
public:
    std::string name;
    double amount;
};

class DiversificationAnalyzer {
private:
    std::vector<Investment> investments;

public:
    void addInvestment(const Investment& investment) {
        investments.push_back(investment);
    }

    double calculateDiversificationScore() {
        double totalInvestment = 0.0;
        for (const Investment& investment : investments) {
            totalInvestment += investment.amount;
        }

        double diversificationScore = 0.0;
        for (const Investment& investment : investments) {
            double proportion = investment.amount / totalInvestment;
            diversificationScore += proportion * proportion;
        }

        return diversificationScore;
    }

    void displayInvestments() {
        std::cout << "Investments:\n";
        for (const Investment& investment : investments) {
            std::cout << "Name: " << investment.name << ", Amount: " << investment.amount << "\n";
        }
    }

    void sortByAmount() {
        std::sort(investments.begin(), investments.end(), [](const Investment& a, const Investment& b) {
            return a.amount > b.amount;
        });
    }

    void suggestInvestmentSplit(double targetDiversification) {
        double totalInvestment = 0.0;
        for (const Investment& investment : investments) {
            totalInvestment += investment.amount;
        }

        std::cout << "Suggested Investment Split:\n";
        for (const Investment& investment : investments) {
            double targetAmount = totalInvestment * targetDiversification;
            double suggestedAmount = targetAmount * (investment.amount / totalInvestment);
            std::cout << "Name: " << investment.name << ", Suggested Amount: " << suggestedAmount << "\n";
        }
    }
};

int main() {
    DiversificationAnalyzer analyzer;

    int numInvestments;
    std::cout << "Enter the number of investments: ";
    std::cin >> numInvestments;

    for (int i = 0; i < numInvestments; ++i) {
        Investment investment;
        std::cout << "Enter investment " << i + 1 << " name: ";
        std::cin.ignore();
        std::getline(std::cin, investment.name);

        std::cout << "Enter investment " << i + 1 << " amount: ";
        std::cin >> investment.amount;

        analyzer.addInvestment(investment);
    }

    double diversificationScore = analyzer.calculateDiversificationScore();
    std::cout << "Diversification Score: " << diversificationScore << "\n";

    analyzer.displayInvestments();

    // Sort investments by amount and display
    analyzer.sortByAmount();
    std::cout << "\nInvestments sorted by amount:\n";
    analyzer.displayInvestments();

    // Suggest investment split for a target diversification score
    double targetDiversification;
    std::cout << "\nEnter target diversification score (0.0 - 1.0): ";
    std::cin >> targetDiversification;

    analyzer.suggestInvestmentSplit(targetDiversification);

    return 0;
}
