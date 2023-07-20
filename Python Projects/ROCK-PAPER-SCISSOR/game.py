import random

def get_choices():
    player_choice=input("Enter a choice(rock,paper,scissor):")
    options=["rock","paper","scissor"]
    computer_choice=random.choice(options)
    Choices={"player":player_choice,"computer":computer_choice}
    return Choices

def check_win(player,computer):
    print(f"your chose {player}, computer chose {computer}")
    if player == computer:
        return "Its a tie!"
    elif player=="rock":
     if computer=="scissors":
      return "Rock smashes scissors!You win!"
     else:
      return "paper cover rock!You lose!"
    elif player=="paper":
     if computer=="rock":
      return "paper cover rock!You win!"
     else:
      return "scissor cuts paper!you lose!"
    elif player=="scissor":
     if computer=="paper":
      return "scissor cuts paper!you win!"
     else:
      return "rock smashes scissor!you lose!"

choices=get_choices()
result= check_win(choices["player"],choices["computer"])
print(result)
