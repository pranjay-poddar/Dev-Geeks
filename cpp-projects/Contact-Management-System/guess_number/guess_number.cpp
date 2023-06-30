#include <iostream>
#include <algorithm>
#include <cstring>
#include <cstdlib>
#include <ctime>

using namespace std;

const char *FILENAME = "leaderboard.txt";
const int MAX_PLAYERS = 5;

struct Player
{
    string name;
    int score;
};

bool compareByScore(const Player &player1, const Player &player2)
{
    return player1.score < player2.score;
}

void displayLeaderboard(const Player leaderboard[], int size)
{
    cout << "------ Leaderboard ------" << endl;
    cout << "Rank\tName\tScore" << endl;

    for (int i = 0; i < size; ++i)
    {
        cout << (i + 1) << "\t" << leaderboard[i].name << "\t" << leaderboard[i].score << endl;
    }

    cout << "-------------------------" << endl;
}

void loadLeaderboard(Player leaderboard[])
{
    FILE *file = fopen(FILENAME, "r");
    if (file)
    {
        for (int i = 0; i < MAX_PLAYERS; ++i)
        {
            char name[100];
            int score;
            fscanf(file, "%s %d", name, &score);
            leaderboard[i].name = name;
            leaderboard[i].score = score;
        }
        fclose(file);
    }
}

void saveLeaderboard(const Player leaderboard[])
{
    FILE *file = fopen(FILENAME, "w");
    if (file)
    {
        for (int i = 0; i < MAX_PLAYERS; ++i)
        {
            fprintf(file, "%s %d\n", leaderboard[i].name.c_str(), leaderboard[i].score);
        }
        fclose(file);
    }
}

int playGame()
{
    srand(time(0));
    int secretNumber = rand() % 100 + 1;
    int guess;
    int attempts = 0;

    cout << "Guess the number between 1 and 100!" << endl;

    do
    {
        cout << "Enter your guess: ";
        cin >> guess;
        cin.ignore();

        ++attempts;

        if (guess > secretNumber)
        {
            cout << "Too high! Try again." << endl;
        }
        else if (guess < secretNumber)
        {
            cout << "Too low! Try again." << endl;
        }
        else
        {
            cout << "Congratulations! You guessed the number in " << attempts << " attempts." << endl;
        }
    } while (guess != secretNumber);

    return attempts;
}

int main()
{
    Player leaderboard[MAX_PLAYERS];

    // Initialize leaderboard with default values
    for (int i = 0; i < MAX_PLAYERS; ++i)
    {
        leaderboard[i].name = "N/A";
        leaderboard[i].score = 0;
    }

    // Load previous leaderboard from file
    loadLeaderboard(leaderboard);

    cout << "Previous leaderboard:" << endl;
    displayLeaderboard(leaderboard, MAX_PLAYERS);

    // Player plays and achieves a score
    Player currentPlayer;
    cout << "Enter the name of the current player: ";
    getline(cin, currentPlayer.name);

    currentPlayer.score = playGame();

    if (currentPlayer.score > leaderboard[MAX_PLAYERS - 1].score)
    {
        leaderboard[MAX_PLAYERS - 1] = currentPlayer;
        // Sort the leaderboard based on score in ascending order
        sort(leaderboard, leaderboard + MAX_PLAYERS, compareByScore);
    }

    cout << "\nUpdated leaderboard:" << endl;
    displayLeaderboard(leaderboard, MAX_PLAYERS);

    // Save the updated leaderboard to file
    saveLeaderboard(leaderboard);

    return 0;
}
