#include <iostream>
#include <vector>
#include <algorithm>
#include <ctime>
#include <cstdlib>

enum Rank {
    ACE = 1, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN, JACK, QUEEN, KING
};

enum Suit {
    CLUBS, DIAMONDS, HEARTS, SPADES
};

struct Card {
    Rank rank;
    Suit suit;
};

int getCardValue(const Card& card) {
    if (card.rank >= TWO && card.rank <= NINE) {
        return card.rank;
    } else if (card.rank >= TEN && card.rank <= KING) {
        return 10;
    } else {
        return 11; // ACE
    }
}

void printCard(const Card& card) {
    switch (card.rank) {
        case ACE:     std::cout << "A"; break;
        case TWO:     std::cout << "2"; break;
        case THREE:   std::cout << "3"; break;
        case FOUR:    std::cout << "4"; break;
        case FIVE:    std::cout << "5"; break;
        case SIX:     std::cout << "6"; break;
        case SEVEN:   std::cout << "7"; break;
        case EIGHT:   std::cout << "8"; break;
        case NINE:    std::cout << "9"; break;
        case TEN:     std::cout << "10"; break;
        case JACK:    std::cout << "J"; break;
        case QUEEN:   std::cout << "Q"; break;
        case KING:    std::cout << "K"; break;
    }

    switch (card.suit) {
        case CLUBS:    std::cout << "♣"; break;
        case DIAMONDS: std::cout << "♦"; break;
        case HEARTS:   std::cout << "♥"; break;
        case SPADES:   std::cout << "♠"; break;
    }
}

int main() {
    srand(static_cast<unsigned>(time(0)));

    std::vector<Card> deck;

    // Create a standard deck of cards (52 cards)
    for (int rank = ACE; rank <= KING; ++rank) {
        for (int suit = CLUBS; suit <= SPADES; ++suit) {
            deck.push_back({ static_cast<Rank>(rank), static_cast<Suit>(suit) });
        }
    }

    // Shuffle the deck
    std::random_shuffle(deck.begin(), deck.end());

    int playerScore = 0;
    int dealerScore = 0;

    // Deal initial two cards to the player and the dealer
    playerScore += getCardValue(deck.back());
    deck.pop_back();
    playerScore += getCardValue(deck.back());
    deck.pop_back();

    dealerScore += getCardValue(deck.back());
    deck.pop_back();
    dealerScore += getCardValue(deck.back());
    deck.pop_back();

    std::cout << "Your cards: ";
    printCard({ deck[0].rank, deck[0].suit });
    std::cout << " ";
    printCard({ deck[1].rank, deck[1].suit });
    std::cout << std::endl;
    std::cout << "Your score: " << playerScore << std::endl;

    std::cout << "Dealer's face-up card: ";
    printCard({ deck[2].rank, deck[2].suit });
    std::cout << std::endl;

    // Player's turn
    char choice;
    do {
        std::cout << "Do you want to hit (h) or stand (s)? ";
        std::cin >> choice;

        if (choice == 'h') {
            playerScore += getCardValue(deck.back());
            deck.pop_back();

            std::cout << "Your cards: ";
            for (const auto& card : deck) {
                printCard({ card.rank, card.suit });
                std::cout << " ";
            }
            std::cout << std::endl;
            std::cout << "Your score: " << playerScore << std::endl;

            if (playerScore > 21) {
                std::cout << "Busted! You lose." << std::endl;
                return 0;
            }
        }
    } while (choice == 'h');

    // Dealer's turn
    std::cout << "Dealer's cards: ";
    for (const auto& card : deck) {
        printCard({ card.rank, card.suit });
        std::cout << " ";
    }
    std::cout << std::endl;
    std::cout << "Dealer's score: " << dealerScore << std::endl;

    while (dealerScore < 17) {
        dealerScore += getCardValue(deck.back());
        deck.pop_back();

        std::cout << "Dealer's cards: ";
        for (const auto& card : deck) {
            printCard({ card.rank, card.suit });
            std::cout << " ";
        }
        std::cout << std::endl;
        std::cout << "Dealer's score: " << dealerScore << std::endl;
    }

    // Determine the winner
    if (dealerScore > 21 || (playerScore <= 21 && playerScore > dealerScore)) {
        std::cout << "Congratulations! You win." << std::endl;
    } else {
        std::cout << "Sorry, you lose." << std::endl;
    }

    return 0;
}
