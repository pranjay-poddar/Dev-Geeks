#include <iostream>
#include <map>
#include <string>
#include <algorithm> // for std::transform
#include <locale>    // for std::locale and std::tolower

using namespace std;

// Function to initialize the language translation map
map<string, map<string, string>> initializeLanguageMap() {
    map<string, map<string, string>> allLanguageMaps;

    // English to French translations
    map<string, string> englishToFrenchMap;
    englishToFrenchMap["hello"] = "bonjour";
    englishToFrenchMap["goodbye"] = "au revoir";
    englishToFrenchMap["thank you"] = "merci";
    englishToFrenchMap["yes"] = "oui";
    englishToFrenchMap["no"] = "non";
    allLanguageMaps["french"] = englishToFrenchMap;

    // English to Spanish translations
    map<string, string> englishToSpanishMap;
    englishToSpanishMap["hello"] = "hola";
    englishToSpanishMap["goodbye"] = "adiós";
    englishToSpanishMap["thank you"] = "gracias";
    englishToSpanishMap["yes"] = "sí";
    englishToSpanishMap["no"] = "no";
    allLanguageMaps["spanish"] = englishToSpanishMap;

    // Add more language translations here...

    return allLanguageMaps;
}

// Function to add custom translations for phrases in a language
void addCustomTranslations(map<string, string>& languageMap) {
    string customPhrase;
    string customTranslation;

    cout << "Enter a custom phrase in English: ";
    cin.ignore(); // Ignore newline from previous input
    getline(cin, customPhrase);

    cout << "Enter the translation in the selected language: ";
    getline(cin, customTranslation);

    languageMap[customPhrase] = customTranslation;
}

// Function to perform language translation
string translateText(const string& text, const map<string, string>& languageMap) {
    string lowercaseText = text;
    // Convert the input text to lowercase to make it case-insensitive for matching
    transform(lowercaseText.begin(), lowercaseText.end(), lowercaseText.begin(), ::tolower);

    if (languageMap.count(lowercaseText) > 0) {
        return languageMap.at(lowercaseText);
    } else {
        return "Translation not available";
    }
}

int main() {
    map<string, map<string, string>> allLanguageMaps = initializeLanguageMap();

    cout << "Language Translation for Travelers" << endl;
    cout << "Supported Languages: ";
    for (const auto& entry : allLanguageMaps) {
        cout << entry.first << ", ";
    }
    cout << endl;

    string selectedLanguage;
    cout << "Enter your preferred language: ";
    cin >> selectedLanguage;

    // Convert the input language to lowercase for matching
    transform(selectedLanguage.begin(), selectedLanguage.end(), selectedLanguage.begin(), ::tolower);

    if (allLanguageMaps.count(selectedLanguage) == 0) {
        cout << "Selected language is not supported." << endl;
        return 1;
    }

    map<string, string> languageMap = allLanguageMaps[selectedLanguage];

    cout << "Supported Phrases in " << selectedLanguage << ":";
    for (const auto& entry : languageMap) {
        cout << " " << entry.first << ",";
    }
    cout << endl;

    int choice;
    cout << "Do you want to add a custom translation? (1: Yes, 0: No): ";
    cin >> choice;

    if (choice == 1) {
        addCustomTranslations(languageMap);
    }

    cout << "Enter a phrase in English: ";

    string inputText;
    cin.ignore(); // Ignore newline from previous input
    getline(cin, inputText);

    string translatedText = translateText(inputText, languageMap);
    cout << "Translated Phrase: " << translatedText << endl;

    return 0;
}
