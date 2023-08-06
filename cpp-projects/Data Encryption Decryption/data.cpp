#include <iostream>
#include <string>
#include <limits>

// Helper function to clear the input buffer
void clearInputBuffer() {
    std::cin.clear();
    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
}

class CaesarCipher {
public:
    CaesarCipher(int shift) : shift(shift) {}

    // Encryption function, takes the message and a custom shift (optional)
    std::string encrypt(const std::string& message, int customShift = 0, bool preserveCase = true, bool includeNonAlphabetic = true) {
        // Calculate the effective shift based on the customShift or the default shift value
        int currentShift = (customShift == 0) ? shift : customShift;
        std::string encryptedMessage = "";
        for (char ch : message) {
            if (std::isalpha(ch)) {
                char base = std::islower(ch) ? 'a' : 'A'; // Determine the base value for shifting based on the case of the character
                encryptedMessage += static_cast<char>((ch - base + currentShift) % 26 + base); // Perform Caesar cipher encryption
            } else {
                encryptedMessage += ch; // Keep non-alphabetic characters as they are
            }
        }
        return encryptedMessage;
    }

    // Decryption function, simply calls the encryption function with the opposite shift to decrypt the message
    std::string decrypt(const std::string& encryptedMessage, bool preserveCase = true, bool includeNonAlphabetic = true) {
        int reverseShift = 26 - shift; // Calculate the reverse shift
        std::string decryptedMessage = encrypt(encryptedMessage, reverseShift, preserveCase, includeNonAlphabetic); // Use the encrypt function with the reverse shift
        return decryptedMessage;
    }

    // Setter function to change the shift value
    void setShift(int shift) {
        this->shift = shift;
    }

private:
    int shift; // Shift value for encryption/decryption, determines how many positions the characters are shifted in the alphabet
};

int main() {
    int shift;
    std::cout << "Enter the shift value for encryption (1-25): ";
    std::cin >> shift;

    // Validate the shift value to ensure it is within the valid range
    while (shift < 1 || shift > 25) {
        std::cout << "Invalid shift value. Please enter a number between 1 and 25: ";
        std::cin >> shift;
    }

    CaesarCipher caesarCipher(shift); // Create a CaesarCipher object with the provided shift value

    char modeChoice;
    do {
        int mode;
        std::cout << "\nEnter 1 for Encryption or 2 for Decryption: ";
        std::cin >> mode;

        clearInputBuffer(); // Clear the input buffer

        std::string message;
        std::cout << "Enter the message: ";
        std::getline(std::cin, message);

        std::string result;
        if (mode == 1) {
            result = caesarCipher.encrypt(message);
            std::cout << "Encrypted Message: " << result << std::endl;
        } else if (mode == 2) {
            result = caesarCipher.decrypt(message);
            std::cout << "Decrypted Message: " << result << std::endl;
        } else {
            std::cout << "Invalid choice. Please enter 1 for Encryption or 2 for Decryption.\n";
        }

        std::cout << "Do you want to continue? (y/n): ";
        std::cin >> modeChoice;
    } while (modeChoice == 'y' || modeChoice == 'Y');

    return 0;
}
