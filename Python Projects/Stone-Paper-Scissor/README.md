# Stone Paper Scissors Game
This is a simple command-line Python game of Stone Paper Scissors. The user plays against the computer, and the winner is determined based on the rules of the game.

# How to Play
- Run the code in a Python environment.

- The game will display the following message:

```
Welcome To Code With Crazy Stone paper scissor 
Winning Rules of the Stone paper scissor game as follows:
Stone vs paper->paper wins
Stone vs scissor->Stone wins
paper vs scissor->scissor wins
```

- The user will be prompted to enter their choice: 1 for stone, 2 for paper, 3 for scissor, or 0 to exit the game.

- The computer will randomly select its choice.

- The user's choice and the computer's choice will be displayed.

- The winner will be determined based on the rules of the game.

- The scores of the user and the computer will be displayed.

- Steps 3-7 will be repeated until the user chooses to exit the game by entering 0.

# Game Rules
The game follows the standard rules of Stone Paper Scissors:

- Stone vs paper: paper wins
- Stone vs scissor: Stone wins
- paper vs scissor: scissor wins

# Example Output

```
* * * Welcome To Code With Crazy Stone paper scissor * * *
Winning Rules of the Stone paper scissor game as follows:
Stone vs paper->paper wins
Stone vs scissor->Stone wins
paper vs scissor->scissor wins

Enter 1 for stone, 2 for paper, and 3 for scissor, or 0 to exit: 1
You have opted STONE
Now it's the computer's turn...
Computer has opted SCISSOR

Your score: 1
Computer score: 0

Enter 1 for stone, 2 for paper, and 3 for scissor, or 0 to exit: 2
You have opted PAPER
Now it's the computer's turn...
Computer has opted STONE

Your score: 2
Computer score: 0

Enter 1 for stone, 2 for paper, and 3 for scissor, or 0 to exit: 3
You have opted SCISSOR
Now it's the computer's turn...
Computer has opted PAPER

Your score: 2
Computer score: 1

Enter 1 for stone, 2 for paper, and 3 for scissor, or 0 to exit: 0
```

# Notes
- The game will keep track of the user's score and the computer's score.
- Invalid input (other than 0, 1, 2, or 3) will be handled by displaying an error message.
- The game will continue until the user chooses to exit by entering 0.

Made with :heavy_heart_exclamation: by Soubhik