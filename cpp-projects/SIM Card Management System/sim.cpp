#include <iostream>
#include <string>
#include <vector>
#include <ctime>
#include <fstream>

class SimCard {
private:
    std::string phoneNumber;
    double balance;
    double dataUsage;
    bool isBlocked;
    std::vector<std::string> callHistory;
    std::vector<std::string> smsHistory;

public:
    SimCard(const std::string& number) : phoneNumber(number), balance(0.0), dataUsage(0.0), isBlocked(false) {}

    std::string getPhoneNumber() const {
        return phoneNumber;
    }

    void rechargeBalance(double amount) {
        balance += amount;
    }

    void makeCall(const std::string& number, double duration) {
        if (!isBlocked && duration <= balance) {
            balance -= duration;
            callHistory.push_back("Outgoing call to " + number + " for " + std::to_string(duration) + " minutes");
        }
    }

    void sendSMS(const std::string& number, const std::string& message) {
        if (!isBlocked) {
            smsHistory.push_back("Sent SMS to " + number + ": " + message);
        }
    }

    // ... other member functions

};

class SimCardManager {
private:
    std::vector<SimCard> simCards;

public:
    void addSimCard(const std::string& number) {
        simCards.push_back(SimCard(number));
    }

    SimCard* findSimCard(const std::string& number) {
        for (auto& sim : simCards) {
            if (sim.getPhoneNumber() == number) {
                return &sim;
            }
        }
        return nullptr;
    }
};

int main() {
    SimCardManager manager;

    while (true) {
        std::cout << "SIM Card Management System\n";
        std::cout << "1. Add New SIM Card\n";
        std::cout << "2. Recharge Balance\n";
        std::cout << "3. Make Call\n";
        std::cout << "4. Send SMS\n";
        std::cout << "5. Block/Unblock SIM\n";
        std::cout << "6. Display SIM Info\n";
        std::cout << "7. Exit\n";
        int choice;
        std::cin >> choice;
        std::cin.ignore(); // Clear newline

        switch (choice) {
            case 1: {
                std::string phoneNumber;
                std::cout << "Enter phone number: ";
                std::getline(std::cin, phoneNumber);
                manager.addSimCard(phoneNumber);
                break;
            }
            case 2: {
                std::string phoneNumber;
                double amount;
                std::cout << "Enter phone number: ";
                std::getline(std::cin, phoneNumber);
                SimCard* sim = manager.findSimCard(phoneNumber);
                if (sim) {
                    std::cout << "Enter recharge amount: ";
                    std::cin >> amount;
                    sim->rechargeBalance(amount);
                    std::cout << "Balance recharged successfully!\n";
                } else {
                    std::cout << "SIM card not found.\n";
                }
                break;
            }
            // ... Implement other features similarly
            case 7:
                std::cout << "Exiting...\n";
                return 0;
            default:
                std::cout << "Invalid choice.\n";
        }
    }

    return 0;
}
