#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <cstdlib>
#include <ctime>
#include <chrono>  // Add this line for <chrono> header
#include <thread> 

struct Question {
    std::string question;
    std::vector<std::string> options;
    int correctOption;
    std::string explanation;
};

class RenewableEnergyQuiz {
private:
    std::vector<Question> questions;
    int score;

public:
    RenewableEnergyQuiz() : score(0) {
        loadQuestions();
    }

    void loadQuestions() {
        questions.push_back({"Which renewable energy source relies on the sun?", {"Solar", "Wind", "Hydro", "Geothermal"}, 0,
                             "Solar energy is harnessed from the sun's rays using solar panels or other technologies."});
        questions.push_back({"What is the primary component of biomass?", {"Water", "Sunlight", "Carbon", "Oxygen"}, 2,
                             "Biomass is primarily composed of carbon-based organic materials."});
        questions.push_back({"What is the main environmental advantage of wind power?", {"Low cost", "Zero emissions", "High efficiency", "Abundant resources"}, 1,
                             "Wind power generates electricity without producing greenhouse gas emissions."});
        questions.push_back({"Which renewable energy source is created by capturing heat from the Earth's internal heat?", {"Solar", "Wind", "Hydro", "Geothermal"}, 3,
                             "Geothermal energy utilizes the Earth's heat to produce electricity or direct heating."});
        // Add more questions here
    }

    void displayQuestion(const Question& q) {
        std::cout << q.question << "\n";
        for (size_t i = 0; i < q.options.size(); ++i) {
            std::cout << i + 1 << ". " << q.options[i] << "\n";
        }
    }

    void startQuiz() {
        std::srand(static_cast<unsigned>(std::time(nullptr)));
        std::random_shuffle(questions.begin(), questions.end());

        for (const Question& q : questions) {
            displayQuestion(q);

            auto start = std::chrono::high_resolution_clock::now();
            int userChoice;
            std::cout << "Enter your choice (1-" << q.options.size() << "): ";
            std::cin >> userChoice;
            auto end = std::chrono::high_resolution_clock::now();
            std::chrono::duration<double> elapsed = end - start;
            std::cout << "Time taken: " << elapsed.count() << " seconds\n";

            if (userChoice == q.correctOption + 1) {
                std::cout << "Correct!\n";
                ++score;
            } else {
                std::cout << "Incorrect! The correct answer is: " << q.options[q.correctOption] << "\n";
            }
            std::cout << "Explanation: " << q.explanation << "\n";
            std::this_thread::sleep_for(std::chrono::seconds(2)); // Pause for 2 seconds

            std::cout << "----------------\n";
        }

        std::cout << "Quiz completed!\n";
        std::cout << "Your score: " << score << "/" << questions.size() << "\n";
    }
};

int main() {
    RenewableEnergyQuiz quiz;
    quiz.startQuiz();

    return 0;
}