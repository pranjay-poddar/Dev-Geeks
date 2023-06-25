from tkinter import *
from PIL import Image, ImageTk
from random import randint  


# main window
root = Tk()         
root.title("Rock Paper Scissors Game")  
root.configure(background="#9b59b6")  

# picture
rock_img = ImageTk.PhotoImage(Image.open("rock-user.png"))
paper_img = ImageTk.PhotoImage(Image.open("paper-user.png"))
scissor_img = ImageTk.PhotoImage(Image.open("scissors-user.png"))
rock_img_comp = ImageTk.PhotoImage(Image.open("rock.png"))
paper_img_comp = ImageTk.PhotoImage(Image.open("paper.png"))
scissor_img_comp = ImageTk.PhotoImage(Image.open("scissors.png"))


# insert picture
user_label = Label(root, image=scissor_img, bg="#9b59b6")         
comp_label = Label(root, image=scissor_img_comp, bg="#9b59b6")
comp_label.grid(row=1, column=0)
user_label.grid(row=1, column=4)


# scores
playerScore = Label(root, text=0, font=100, bg="#9b59b6", fg="white")
computerScore = Label(root, text=0, font=100, bg="#9b59b6", fg="white")
computerScore.grid(row=1, column=1)
playerScore.grid(row=1, column=3)

# indicators
user_indicator = Label(root, font=50, text="USER", bg="#9b59b6", fg="white")
comp_indicator = Label(root, font=50, text="COMPUTER",bg="#9b59b6", fg="white")
user_indicator.grid(row=0, column=3)
comp_indicator.grid(row=0, column=1)

# messages
msg = Label(root, font=50, bg="#9b59b6", fg="white")
msg.grid(row=3, column=2)

# update message
def updateMessage(x):
    msg['text'] = x


# update user score
def updateUserScore():
    score = int(playerScore["text"])  
    score += 1                        
    playerScore["text"] = str(score)  

# update computer score
def updateCompScore():
    score = int(computerScore["text"])
    score += 1
    computerScore["text"] = str(score)

# check winner
def checkWin(player, computer):
    if player == computer:
        updateMessage("Its a tie!!!")
    elif player == "rock":
        if computer == "paper":
            updateMessage("You loose")
            updateCompScore()
        else:
            updateMessage("You Win")
            updateUserScore()
    elif player == "paper":
        if computer == "scissor":
            updateMessage("You loose")
            updateCompScore()
        else:
            updateMessage("You Win")
            updateUserScore()
    else:
        if computer == "rock":
            updateMessage("You loose")
            updateCompScore()
        else:
            updateMessage("You Win")
            updateUserScore()


# update choices
choices = ["rock", "paper", "scissor"]

def updateChoice(x):

    # for computer
    compChoice = choices[randint(0, 2)]  #this will generate random integer number from 0 to 2
    if compChoice == "rock":
        comp_label.configure(image=rock_img_comp)   
    elif compChoice == "paper":
        comp_label.configure(image=paper_img_comp)
    else:
        comp_label.configure(image=scissor_img_comp)


    # for user
    if x == "rock":
        user_label.configure(image=rock_img)  #Changing image of user to rock
    elif x == "paper":
        user_label.configure(image=paper_img)
    else:
        user_label.configure(image=scissor_img)

    checkWin(x, compChoice)


# buttons
rock = Button(root, width=20, height=2, text="ROCK",
              bg="#FF3E4D", fg="white", command=lambda: updateChoice("rock")).grid(row=2, column=1)  #lambda function
paper = Button(root, width=20, height=2, text="PAPER",
               bg="#FAD02E", fg="white", command=lambda: updateChoice("paper")).grid(row=2, column=2)
scissor = Button(root, width=20, height=2, text="SCISSOR",
                 bg="#0ABDE3", fg="white", command=lambda: updateChoice("scissor")).grid(row=2, column=3)

root.mainloop()

