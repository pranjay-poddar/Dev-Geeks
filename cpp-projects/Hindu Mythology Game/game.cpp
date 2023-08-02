#include <iostream>
#include <map>
#include <string>

// Function to display the question and options
void displayQuestion(const std::string& question, const std::map<char, std::string>& options) {
    std::cout << question << "\n";
    for (const auto& option : options) {
        std::cout << option.first << ") " << option.second << "\n";
    }
}

// Function to get user's answer and validate it
char getAnswer() {
    char answer;
    std::cout << "Your answer (A/B/C/D): ";
    std::cin >> answer;
    return std::toupper(answer); // Convert the answer to uppercase
}

int main() {
    std::map<std::string, std::map<char, std::string>> questions = {
        {
            "In the Ramayana, who was the demon king of Lanka?",
            {
                {'A', "Ravana"},
                {'B', "Kumbhakarna"},
                {'C', "Shurpanakha"},
                {'D', "Vibhishana"}
            }
        },
        {
            "Who is considered the eighth avatar of Lord Vishnu?",
            {
                {'A', "Krishna"},
                {'B', "Parashurama"},
                {'C', "Buddha"},
                {'D', "Balarama"}
            }
        },
        {
            "In the Mahabharata, who was the eldest of the Pandavas?",
            {
                {'A', "Yudhishthira"},
                {'B', "Arjuna"},
                {'C', "Bhima"},
                {'D', "Nakula"}
            }
        },
        {
            "In the Ramayana, who is Lord Rama's loyal devotee and a great warrior?",
            {
                {'A', "Hanuman"},
                {'B', "Bhishma"},
                {'C', "Dasharatha"},
                {'D', "Vishwamitra"}
            }
        },
        {
            "According to Hindu mythology, who is the goddess of wealth and prosperity?",
            {
                {'A', "Saraswati"},
                {'B', "Durga"},
                {'C', "Lakshmi"},
                {'D', "Kali"}
            }
        },
        {
            "Who is the wife of Lord Shiva and the goddess of destruction and transformation?",
            {
                {'A', "Parvati"},
                {'B', "Sita"},
                {'C', "Radha"},
                {'D', "Ganga"}
            }
        },
        {
            "In the Mahabharata, who was the teacher of the Pandavas and Kauravas?",
            {
                {'A', "Vidura"},
                {'B', "Dronacharya"},
                {'C', "Karna"},
                {'D', "Bhishma"}
            }
        },
        {
            "Who is the demon king and ruler of Lanka in some versions of the Ramayana?",
            {
                {'A', "Dasharatha"},
                {'B', "Vibhishana"},
                {'C', "Ravana"},
                {'D', "Kaikeyi"}
            }
        }
    };

    int score = 0;
    char continuePlaying = 'Y';

    while (std::toupper(continuePlaying) == 'Y') {
        for (const auto& q : questions) {
            displayQuestion(q.first, q.second);
            char userAnswer = getAnswer();

            if (userAnswer == q.second.begin()->first) {
                std::cout << "Correct!\n";
                score++;
            } else {
                std::cout << "Incorrect! The correct answer is: " << q.second.begin()->second << "\n";
            }
        }

        std::cout << "Quiz complete! Your score: " << score << "/" << questions.size() << "\n";
        std::cout << "Do you want to play again? (Y/N): ";
        std::cin >> continuePlaying;

        // Reset score if the user wants to play again
        if (std::toupper(continuePlaying) == 'Y') {
            score = 0;
        }
    }

    std::cout << "Thank you for playing the Hindi Mythology Quiz Game!\n";
    return 0;
}
