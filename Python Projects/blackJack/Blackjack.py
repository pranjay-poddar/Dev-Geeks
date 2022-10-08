import time
from random import choice

def generate_radom_card():
    cards = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"]
    return choice(cards)

# Keeps repeating the capture of user input, as long as this input is not an integer raising error
def retry(function):
    while (True):
        try:
            return function()
        except ValueError:
            continue

# Get and validade user input for context of user choosing more cards or not (stop the game).
def get_user_more_cards_input():
    user_choice = input('One more card? [Y/N] ').lower()
    if (user_choice  == 'y' or user_choice == 'n'):
        return user_choice
    else:
        print('Select a valid choice. Only "Y" or "N" are approved.')
        get_user_more_cards_input()

# Get and validate user input for context of choosing Ace card value
def get_user_ace_input():
    try:
        user_choice = int(input('Do you receive a Ace card, you want it to have the value 1 or 10: '))
        return user_choice
    except ValueError:
        print('Invalid value. Choose integer values, 1 or 10.')
        raise(ValueError)

"""
In the blackjack game, Jack, Queen, King and Ace cards have stipulated values.
The other cards (2, 3, 4, ..., 9) have the value of the number they have.

The cards Jack, Queen and King are 10 points.
The Ace card can be 1 or 10 points, depending on player choice.
This method manage this values and return the computed result.
"""
def convert_card_values(card):
    if (card == "Jack" or card == "Queen" or card == "King"):
        return 10
    elif (card == 'Ace'):
        # The retry() method, in this case, guarantees that the input will 
        # be requested until the user enters an integer value
        # and, in addition, the while loop ensures that the user enters the number 1 or 10
        user_choice = retry(get_user_ace_input)
        while (True):
            if ((user_choice != 1) and (user_choice != 10)):
                print('Invalid chosen value. Choose number 1 or 10.')
                user_choice = retry(get_user_ace_input)
            else:
                return user_choice
    else:
        return card


# print the welcome message and an animation involving the cards suits
def welcome_terminal_animation(time_seconds=4):
    print('#######################################')
    print(' ♠ ♥ WELCOME TO THE BACKJACK GAME ♦ ♣')
    print('#######################################')
    
    animation_characters = "♠ ♥ ♦ ♣"
    i = 0
    animation_duration = time.time() + time_seconds
    while (time.time() < animation_duration):
        print(
            'The Card Dealer is shuffling cards...',
            animation_characters[i % len(animation_characters)],
            end="\r"
        )
        i += 1
        time.sleep(0.4)
    print('\n')


def blackjack_game():
    user_cards = []
    while (True):
        user_card = generate_radom_card()
        print(f'You Receive the card: {user_card}')

        card_value = convert_card_values(user_card)
        user_cards.append(card_value)

        user_input_sum = sum(user_cards)
        print(f'Your score is: {user_input_sum}', '\n')

        if user_input_sum > 21:
            print('You loose')
            break
        elif user_input_sum == 21:
            print('BLACKJACK! YOU WIN')
            break
        else:
            user_more_cards = get_user_more_cards_input()    
            if(user_more_cards == 'n'):
                print(f'Your final score is: {user_input_sum}', '\n')
                break

if __name__ == '__main__':
    welcome_terminal_animation()
    blackjack_game()