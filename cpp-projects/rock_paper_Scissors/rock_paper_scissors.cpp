#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

enum Choice {
    ROCK,
    PAPER,
    SCISSORS
};

Choice getPlayerChoice() {
    int choice;
    cout << "Enter your choice (0 for Rock, 1 for Paper, 2 for Scissors): ";
    cin >> choice;
    return static_cast<Choice>(choice);
}

Choice getComputerChoice() {
    srand(static_cast<unsigned int>(time(0))); // Seed the random number generator
    int choice = rand() % 3;
    return static_cast<Choice>(choice);
}

void determineWinner(Choice playerChoice, Choice computerChoice, int& playerScore, int& computerScore) {
    if (playerChoice == computerChoice) {
        cout << "It's a tie!" << endl;
    } else if ((playerChoice == ROCK && computerChoice == SCISSORS) ||
               (playerChoice == PAPER && computerChoice == ROCK) ||
               (playerChoice == SCISSORS && computerChoice == PAPER)) {
        cout << "You win!" << endl;
        playerScore++;
    } else {
        cout << "Computer wins!" << endl;
        computerScore++;
    }
}

int main() {
    cout << "Welcome to Rock-Paper-Scissors!" << endl;

    int playerScore = 0;
    int computerScore = 0;

    while (true) {
        Choice playerChoice = getPlayerChoice();
        Choice computerChoice = getComputerChoice();

        cout << "Player chose: " << playerChoice << endl;
        cout << "Computer chose: " << computerChoice << endl;

        determineWinner(playerChoice, computerChoice, playerScore, computerScore);

        cout << "Player score: " << playerScore << endl;
        cout << "Computer score: " << computerScore << endl;

        char playAgain;
        cout << "Play again? (y/n): ";
        cin >> playAgain;

        if (playAgain != 'y' && playAgain != 'Y') {
            break;
        }
    }

    cout << "Final scores:" << endl;
    cout << "Player score: " << playerScore << endl;
    cout << "Computer score: " << computerScore << endl;

    cout << "Thank you for playing Rock-Paper-Scissors!" << endl;

    return 0;
}