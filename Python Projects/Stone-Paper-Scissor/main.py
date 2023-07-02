import random
userpt = 0
systempt = 0
def randomValue():
    return random.randint(1, 3)
def tie():
    print("Tie No One win")

def option(n):
    if (n == 1):
        return ("STONE")
    if (n == 2):
        return ("PAPER")
    if (n == 3):
        return ("SCISSOR")

print("\n\n* * * Welcome To Code With Crazy Stone paper scissor * * *")

print("Winning Rules of the Stone paper scissor game as follows: \n"
                                + "Stone vs paper->paper wins \n"
                                + "Stone vs scissor->Stone wins \n"
                                + "paper vs scissor->scissor wins \n")

while (1):
            userInput = int(input("\n\n#  #  #  Enter 1 for stone 2 for paper and 3 for scissor 0 for exit -\t"))
            if (userInput == 0):
               break
            computerInput = randomValue()
            print(f"You have opted {option(userInput)}")
            print(f"Now Computers turn....... \nComputer has opted {option(computerInput)}")

            if (userInput == 1 or userInput == 2 or userInput == 3):
                
                if (userInput == computerInput):
                    tie()
                
                elif (userInput == 1):
                    if (userInput == 1 and computerInput == 2):
                        systempt += 1
                    if (userInput == 1 and computerInput == 3):
                        userpt += 1

                elif (userInput == 2):
                    if (userInput == 2 and computerInput == 1):
                        userpt += 1
                    if (userInput == 2 and computerInput == 3):
                        systempt += 1
                else:
                    if (userInput == 3 and computerInput == 1):
                        systempt += 1
                    if (userInput == 3 and computerInput == 2):
                        userpt += 1
                print(f"\nYour score - {userpt}")
                print(f"Computer score - {systempt}\n")
            else:
                print("Enter a valid input !")
            
