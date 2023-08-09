#include <iostream>
#include <vector>
#include <string>
#include <cstdlib>
#include <ctime>
#include <fstream>

class StartupPitchGenerator {
private:
    std::vector<std::string> problems;
    std::vector<std::string> solutions;
    std::vector<std::string> advantages;
    std::vector<std::string> markets;

public:
    // Constructor to initialize random seed
    StartupPitchGenerator() {
        srand(time(nullptr));
    }

    // Method to load data for different pitch components
    void loadData(const std::vector<std::string>& problemList,
                  const std::vector<std::string>& solutionList,
                  const std::vector<std::string>& advantageList,
                  const std::vector<std::string>& marketList) {
        problems = problemList;
        solutions = solutionList;
        advantages = advantageList;
        markets = marketList;
    }

    // Generate a random element from a given vector
    std::string getRandomElement(const std::vector<std::string>& elements) {
        return elements[rand() % elements.size()];
    }

    // Generate a startup pitch
    std::string generatePitch() {
        std::string problem = getRandomElement(problems);
        std::string solution = getRandomElement(solutions);
        std::string advantage = getRandomElement(advantages);
        std::string market = getRandomElement(markets);

        std::string pitch = "We're addressing the problem of " + problem +
                            " with " + solution +
                            ". Our distinct advantage is " + advantage +
                            " in the " + market + " market.";

        return pitch;
    }

    // Save generated pitches to a file
    void savePitchesToFile(const std::string& filename, int count) {
        std::ofstream file(filename);
        if (file.is_open()) {
            for (int i = 0; i < count; ++i) {
                std::string pitch = generatePitch();
                file << "Startup Pitch " << i + 1 << ":\n" << pitch << "\n\n";
            }
            file.close();
            std::cout << count << " startup pitches saved to " << filename << std::endl;
        } else {
            std::cout << "Error: Unable to save to file." << std::endl;
        }
    }
};

int main() {
    StartupPitchGenerator pitchGenerator;

    // Load sample data
    std::vector<std::string> sampleProblems = {
        "inefficient time management",
        "lack of personalized learning",
        "poor customer service",
        "food waste",
        "limited access to clean water"
    };

    std::vector<std::string> sampleSolutions = {
        "an AI-powered scheduling app",
        "an adaptive learning platform",
        "a chatbot-driven support system",
        "a food redistribution network",
        "a portable water purification device"
    };

    std::vector<std::string> sampleAdvantages = {
        "using predictive algorithms",
        "leveraging machine learning",
        "offering 24/7 availability",
        "utilizing IoT technology",
        "implementing sustainable practices"
    };

    std::vector<std::string> sampleMarkets = {
        "education",
        "retail",
        "hospitality",
        "environmental",
        "healthcare"
    };

    pitchGenerator.loadData(sampleProblems, sampleSolutions, sampleAdvantages, sampleMarkets);

    int pitchCount;

    // Get user input for the number of pitches to generate
    std::cout << "Enter the number of startup pitches to generate: ";
    std::cin >> pitchCount;

    // Generate and save startup pitches to a file
    pitchGenerator.savePitchesToFile("startup_pitches.txt", pitchCount);

    return 0;
}
