#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>

using namespace std;

string LOWPassword(int length)
{

    string lowercaseCharset = "abcdefghijklmnopqrstuvwxyz";
    string numberCharset = "0123456789";

    srand(time(0));

    // Initialize the password with one character from each character set
    string password;
    password += lowercaseCharset[rand() % lowercaseCharset.length()];
    password += numberCharset[rand() % numberCharset.length()];

    // Generate the remaining characters of the password
    int remainingLength = length - 2;
    string allCharsets = lowercaseCharset + numberCharset;
    for (int i = 0; i < remainingLength; i++)
    {
        password += allCharsets[rand() % allCharsets.length()];
    }

    // Shuffle the password characters to ensure randomness
    for (int i = 0; i < length; i++)
    {
        int randomIndex = rand() % length;
        swap(password[i], password[randomIndex]);
    }

    return password;
}

string MEDPassword(int length)
{

    string lowercaseCharset = "abcdefghijklmnopqrstuvwxyz";
    string uppercaseCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    string numberCharset = "0123456789";

    srand(time(0));

    // Initialize the password with one character from each character set
    string password;
    password += lowercaseCharset[rand() % lowercaseCharset.length()];
    password += uppercaseCharset[rand() % uppercaseCharset.length()];
    password += numberCharset[rand() % numberCharset.length()];

    // Generate the remaining characters of the password
    int remainingLength = length - 3;
    string allCharsets = lowercaseCharset + uppercaseCharset + numberCharset;
    for (int i = 0; i < remainingLength; i++)
    {
        password += allCharsets[rand() % allCharsets.length()];
    }

    // Shuffle the password characters to ensure randomness
    for (int i = 0; i < length; i++)
    {
        int randomIndex = rand() % length;
        swap(password[i], password[randomIndex]);
    }

    return password;
}

string HIGHPassword(int length)
{

    string lowercaseCharset = "abcdefghijklmnopqrstuvwxyz";
    string uppercaseCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    string numberCharset = "0123456789";
    string specialCharset = "!@#$%^&*()";

    // Seed the random number generator
    srand(time(0));

    // Initialize the password with one character from each character set
    string password;
    password += lowercaseCharset[rand() % lowercaseCharset.length()];
    password += uppercaseCharset[rand() % uppercaseCharset.length()];
    password += numberCharset[rand() % numberCharset.length()];
    password += specialCharset[rand() % specialCharset.length()];

    // Generate the remaining characters of the password
    int remainingLength = length - 4;
    string allCharsets = lowercaseCharset + uppercaseCharset + numberCharset + specialCharset;
    for (int i = 0; i < remainingLength; i++)
    {
        password += allCharsets[rand() % allCharsets.length()];
    }

    // Shuffle the password characters to ensure randomness
    for (int i = 0; i < length; i++)
    {
        int randomIndex = rand() % length;
        swap(password[i], password[randomIndex]);
    }

    return password;
}

string CUSTOMPassword(string custom)
{

    if (custom.empty())
    {
        cout << "Error: No custom characters provided!" << endl;
        return "";
    }

    // Seed the random number generator
    srand(time(0));

    // Generate the password
    string password;
    for (int i = 0; i < custom.length(); i++)
    {
        int randomIndex = rand() % custom.length();
        password += custom[randomIndex];
    }

    return password;
}

// password strength calculator
int calculatePasswordStrength(string password)
{
    int strength = 0;

    // Check the length of the password
    int length = password.length();
    if (length >= 8 && length <= 12)
    {
        strength += 1;
    }
    else if (length > 12)
    {
        strength += 2;
    }

    // Check for the presence of different character types
    bool hasLowercase = false;
    bool hasUppercase = false;
    bool hasNumber = false;
    bool hasSpecialChar = false;

    for (char c : password)
    {
        if (islower(c))
            hasLowercase = true;
        else if (isupper(c))
            hasUppercase = true;
        else if (isdigit(c))
            hasNumber = true;
        else if (!isalnum(c))
            hasSpecialChar = true;
    }

    if (hasLowercase)
        strength++;
    if (hasUppercase)
        strength++;
    if (hasNumber)
        strength++;
    if (hasSpecialChar)
        strength++;

    return strength;
}

string categorizePasswordStrength(int strength)
{
    if (strength <= 3)
        return "Low";
    else if (strength <= 4)
        return "Medium";
    else
        return "High";
}

int main()
{

    int choice;
    cout << "====PASSWORD GENERATOR====" << endl;
    cout << "Strength Levels" << endl;
    cout << "1. High\n2. Medium\n3. Low\n4. Customize" << endl;
    cout << "Choose a strength level: ";
    cin >> choice;
    cout << endl;

    int length;

    switch (choice)
    {
    case 1:
        cout << "Enter the length of password (minimum 12)" << endl;
        cin >> length;
        cout << "Generated password: " << HIGHPassword(length) << endl;
        break;
    case 2:
        cout << "Enter the length of password (minimum 8)" << endl;
        cin >> length;
        cout << "Generated password: " << MEDPassword(length) << endl;
        break;
    case 3:
        cout << "Enter the length of password (8 or less than 8)" << endl;
        cin >> length;
        cout << "Generated password: " << LOWPassword(length) << endl;
        break;
    case 4:
        string custom;
        cout << "Enter the custom characters to include in the password " << endl;
        cin >> custom;
        string password = CUSTOMPassword(custom);
        cout << "Generated password: " << password << endl;
        cout << "Strength of generated password: " << categorizePasswordStrength(calculatePasswordStrength(password)) << endl;
    }

    return 0;
}
