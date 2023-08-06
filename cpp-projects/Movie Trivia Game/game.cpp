#include <iostream>
#include <string>
#include <ctime>
#include <cstdlib>
#include <algorithm>
#include <vector>

using namespace std;

// Struct to represent a movie question and answer
struct MovieTrivia {
    string question;
    string answer;
};

// Function to display a movie question and get the user's answer
bool askQuestion(const MovieTrivia& trivia) {
    cout << trivia.question << endl;
    string userAnswer;
    getline(cin, userAnswer);

    // Convert both the user answer and the actual answer to lowercase for case-insensitive comparison
    string lowerUserAnswer = userAnswer;
    string lowerTriviaAnswer = trivia.answer;
    transform(lowerUserAnswer.begin(), lowerUserAnswer.end(), lowerUserAnswer.begin(), ::tolower);
    transform(lowerTriviaAnswer.begin(), lowerTriviaAnswer.end(), lowerTriviaAnswer.begin(), ::tolower);

    return lowerUserAnswer == lowerTriviaAnswer;
}

int main() {
    // Seed the random number generator
    srand(static_cast<unsigned>(time(0)));

    // Vector of movie trivia questions and answers
    vector<MovieTrivia> triviaList = {
        {"In the movie 'The Shawshank Redemption', what is the name of the main character?", "Andy Dufresne"},
        {"Which actor played the role of Tony Stark in the 'Iron Man' movie series?", "Robert Downey Jr."},
        {"What is the name of the fictional African country in the movie 'Black Panther'?", "Wakanda"},
        {"Which film won the Academy Award for Best Picture in 2020?", "Parasite"},
        {"In the movie 'Forrest Gump', what is Forrest's famous catchphrase?", "Life is like a box of chocolates"},
        {"Who directed the 'Lord of the Rings' film trilogy?", "Peter Jackson"},
        {"Which movie features a group of elderly people trying to rob a bank?", "Going in Style"},
        {"What is the name of the artificial intelligence in the movie '2001: A Space Odyssey'?", "HAL 9000"},
        {"Which actress played the lead role in the movie 'La La Land'?", "Emma Stone"},
        {"In the film 'The Godfather', what is the famous quote by Marlon Brando's character?", "I'm gonna make him an offer he can't refuse"},
        // Add more questions here
    };

    const int numQuestions = triviaList.size();

    cout << "Welcome to the Movie Trivia Game!" << endl;
    cout << "You will be asked " << numQuestions << " questions. Let's begin!" << endl;

    int score = 0;

    // Shuffle the questions randomly
    for (int i = 0; i < numQuestions; i++) {
        int randomIndex = rand() % numQuestions;
        swap(triviaList[i], triviaList[randomIndex]);
    }

    // Ask each question and check the user's answer
    for (int i = 0; i < numQuestions; i++) {
        cout << "Question " << i + 1 << ":" << endl;
        if (askQuestion(triviaList[i])) {
            cout << "Correct!" << endl;
            score++;
        } else {
            cout << "Incorrect. The correct answer is: " << triviaList[i].answer << endl;
        }
        cout << endl;
    }

    // Display the final score
    cout << "Quiz complete!" << endl;
    cout << "Your final score: " << score << " out of " << numQuestions << endl;

    return 0;
}
