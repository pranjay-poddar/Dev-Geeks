#include <iostream>
#include <string>
#include <vector>

class Modem {
private:
    std::string port;
    int baudRate;
    std::string phoneNumber;
    bool isConnected;

public:
    Modem(const std::string& p) : port(p), baudRate(9600), isConnected(false) {}

    void setBaudRate(int rate) {
        baudRate = rate;
    }

    void setPhoneNumber(const std::string& number) {
        phoneNumber = number;
    }

    void connect() {
        std::cout << "Connecting to " << phoneNumber << " at " << baudRate << " baud...\n";
        // Simulate modem connection process
        isConnected = true;
        std::cout << "Connected!\n";
    }

    void disconnect() {
        std::cout << "Disconnecting...\n";
        // Simulate modem disconnection process
        isConnected = false;
        std::cout << "Disconnected.\n";
    }

    bool isConnectedState() const {
        return isConnected;
    }
};

int main() {
    std::cout << "Modem Configuration Utility\n";

    std::string port;
    std::cout << "Enter COM port: ";
    std::cin >> port;

    Modem modem(port);

    int baudRate;
    std::cout << "Enter baud rate: ";
    std::cin >> baudRate;
    modem.setBaudRate(baudRate);

    std::string phoneNumber;
    std::cout << "Enter phone number: ";
    std::cin.ignore(); // Clear newline
    std::getline(std::cin, phoneNumber);
    modem.setPhoneNumber(phoneNumber);

    char choice;
    std::cout << "Do you want to connect? (y/n): ";
    std::cin >> choice;

    if (choice == 'y' || choice == 'Y') {
        modem.connect();
    } else {
        std::cout << "Connection aborted.\n";
    }

    std::vector<std::string> configOptions = {"Change Baud Rate", "Change Phone Number"};
    std::cout << "\nAdditional Options:\n";
    for (size_t i = 0; i < configOptions.size(); ++i) {
        std::cout << i + 1 << ". " << configOptions[i] << "\n";
    }

    if (modem.isConnectedState()) {
        std::cout << configOptions.size() + 1 << ". Disconnect\n";
    }

    int option;
    std::cout << "Select an option: ";
    std::cin >> option;

    switch (option) {
        case 1:
            int newBaudRate;
            std::cout << "Enter new baud rate: ";
            std::cin >> newBaudRate;
            modem.setBaudRate(newBaudRate);
            std::cout << "Baud rate updated.\n";
            break;
        case 2:
            std::cout << "Enter new phone number: ";
            std::cin.ignore(); // Clear newline
            std::getline(std::cin, phoneNumber);
            modem.setPhoneNumber(phoneNumber);
            std::cout << "Phone number updated.\n";
            break;
        case 3:
            if (modem.isConnectedState()) {
                modem.disconnect();
                std::cout << "Disconnected from modem.\n";
            } else {
                std::cout << "Modem is not connected.\n";
            }
            break;
        default:
            std::cout << "Invalid option.\n";
            break;
    }

    return 0;
}
