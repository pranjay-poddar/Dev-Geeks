#include <iostream>
#include <cstdlib>
#include <ctime>

enum class Choice { ROCK, PAPER, SCISSORS };

Choice getPlayerChoice() {
    int choice;
    std::cout << "Enter your choice (0 for Rock, 1 for Paper, 2 for Scissors): ";
    std::cin >> choice;
    return static_cast<Choice>(choice);
}

Choice getComputerChoice() {
    int choice = std::rand() % 3;
    return static_cast<Choice>(choice);
}

bool playAgain() {
    char again;
    std::cout << "Do you want to play again? (y/n): ";
    std::cin >> again;
    return (again == 'y' || again == 'Y');
}

std::string choiceToString(Choice choice) {
    switch (choice) {
        case Choice::ROCK:
            return "Rock";
        case Choice::PAPER:
            return "Paper";
        case Choice::SCISSORS:
            return "Scissors";
    }
    return "";
}

std::string getWinner(Choice playerChoice, Choice computerChoice) {
    if (playerChoice == computerChoice) {
        return "It's a tie!";
    } else if ((playerChoice == Choice::ROCK && computerChoice == Choice::SCISSORS) ||
               (playerChoice == Choice::PAPER && computerChoice == Choice::ROCK) ||
               (playerChoice == Choice::SCISSORS && computerChoice == Choice::PAPER)) {
        return "Congratulations! You win!";
    } else {
        return "Computer wins! Better luck next time.";
    }
}

int main() {
    std::srand(static_cast<unsigned int>(std::time(nullptr)));

    std::cout << "Welcome to Rock, Paper, Scissors Game!" << std::endl;

    do {
        Choice playerChoice = getPlayerChoice();
        Choice computerChoice = getComputerChoice();

        std::cout << "You chose: " << choiceToString(playerChoice) << std::endl;
        std::cout << "Computer chose: " << choiceToString(computerChoice) << std::endl;

        std::string result = getWinner(playerChoice, computerChoice);
        std::cout << result << std::endl;

    } while (playAgain());

    return 0;
}
