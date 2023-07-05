#include <iostream>
#include <fstream>
#include <vector>
#include <algorithm>
#include<ctime>
using namespace std;

const char* FILENAME = "leaderboard.txt";
const int MAX_PLAYERS = 5;

struct Player
{
    string name;
    int attempts;
};

bool compareByAttempts(const Player& player1, const Player& player2)
{
    return player1.attempts < player2.attempts;
}

void displayLeaderboard(const vector<Player>& leaderboard)
{
    cout << "------ Leaderboard ------" << endl;
    cout << "Rank\tName\tAttempts" << endl;

    for (size_t i = 0; i < leaderboard.size(); ++i)
    {
        cout << (i + 1) << "\t" << leaderboard[i].name << "\t" << leaderboard[i].attempts << endl;
    }

    cout << "-------------------------" << endl;
}

vector<Player> loadLeaderboard()
{
    vector<Player> leaderboard;

    ifstream file(FILENAME);
    if (file)
    {
        string name;
        int attempts;

        while (file >> name >> attempts)
        {
            Player player{ name, attempts };
            leaderboard.push_back(player);
        }

        file.close();
    }

    return leaderboard;
}

void saveLeaderboard(const vector<Player>& leaderboard)
{
    ofstream file(FILENAME);
    if (file)
    {
        for (const Player& player : leaderboard)
        {
            file << player.name << " " << player.attempts << endl;
        }

        file.close();
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
    vector<Player> leaderboard = loadLeaderboard();

    cout << "Previous leaderboard:" << endl;
    displayLeaderboard(leaderboard);

    Player currentPlayer;
    cout << "Enter the name of the current player: ";
    getline(cin, currentPlayer.name);

    currentPlayer.attempts = playGame();

    // Sort the leaderboard based on attempts in increasing order
    sort(leaderboard.begin(), leaderboard.end(), compareByAttempts);

    // Find the position to insert the current player
    auto it = find_if(leaderboard.begin(), leaderboard.end(), [&](const Player& player) {
        return player.attempts >= currentPlayer.attempts;
    });

    leaderboard.insert(it, currentPlayer);

    if (leaderboard.size() > MAX_PLAYERS)
    {
        leaderboard.pop_back(); // Remove the last player to keep only the top MAX_PLAYERS players
    }

    cout << "\nUpdated leaderboard:" << endl;
    displayLeaderboard(leaderboard);

    saveLeaderboard(leaderboard);

    return 0;
}
