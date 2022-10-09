# Import the  tkinter module
import tkinter as tk
root = tk.Tk()
# Initialise the variables and lists
score = 0
count = 0
buttons = []
temp = []


# Define the function 'go' which is used as a command by the buttons
def go(index):
    global count
    global score
    count = count + 1
    temp.append(buttons[index])
    if count == 2:
        if temp[0] == temp[1]:
            count = 0
            temp.clear()
        else:
            if temp[0]["activebackground"] == temp[1]["activebackground"]:
                temp[0]["state"] = "disabled"
                temp[1]["state"] = "disabled"
                score = score + 1
                buttonscore.configure(text="score = " + str(score))
                count = 0
                temp.clear()
            else:
                count = 0
                temp.clear()

counter = 0


# Define a function to initiate a timer and to track the game
def counter_label(label):
    # Define the function for a countdown timer
    def counttime():
        global counter
        global score
        if counter != 10:
            counter += 1
            label.config(text='time :' + str(counter))
            label.after(1000, counttime)
        else:
            labelout = tk.Label(root, text='Time up', font='Courier', fg="red")
            labelout.grid(row=16, column=20)
            for i in range(len(buttons)):
                buttons[i].destroy()
            if score == 4:
                labelwin = tk.Label(root, text="Congrats! You win the game",
                                    fg="blue", font=('Times New Roman', '14'))
                labelwin.grid(row=17, column=20)
            else:
                labelloss = tk.Label(root, text="Better luck next time!",
                                     fg="red", font=('Times New Roman', '14'))
                labelloss.grid(row=17, column=20)
    counttime()

# Create a label for timer
label = tk.Label(root, fg="dark green")
label.grid(row=19, column=20)
counter_label(label)
# Create a button to display score
buttonscore = tk.Button(root, text="score", height=2, width=10)
buttonscore.grid(row=20, column=20)
# Create a label for instruction
labeltitle = tk.Label(root, text="Match two buttons with same colour",
                      fg="black", font=('Times New Roman', '14'))
labeltitle.grid(row=0, column=20)
# Create eight buttons to display colours when clicked
button1 = tk.Button(root, text="a", command=lambda: go(0),
                    height=2, width=10, activebackground="blue")
button1.grid(row=0, column=0)
buttons.append(button1)
button2 = tk.Button(root, text="b", command=lambda: go(1),
                    height=2, width=10, activebackground="pink")
button2.grid(row=0, column=1)
buttons.append(button2)
button3 = tk.Button(root, text="c", command=lambda: go(2),
                    height=2, width=10, activebackground="yellow")
button3.grid(row=1, column=0)
buttons.append(button3)
button4 = tk.Button(root, text="d", command=lambda: go(3),
                    height=2, width=10, activebackground="green")
button4.grid(row=1, column=1)
buttons.append(button4)
button5 = tk.Button(root, text="e", command=lambda: go(4),
                    height=2, width=10, activebackground="pink")
button5.grid(row=2, column=0)
buttons.append(button5)
button6 = tk.Button(root, text="f", command=lambda: go(5),
                    height=2, width=10, activebackground="blue")
button6.grid(row=2, column=1)
buttons.append(button6)
button7 = tk.Button(root, text="g", command=lambda: go(6),
                    height=2, width=10, activebackground="green")
button7.grid(row=3, column=0)
buttons.append(button7)
button8 = tk.Button(root, text="h", command=lambda: go(7),
                    height=2, width=10, activebackground="yellow")
button8.grid(row=3, column=1)
buttons.append(button8)
# tkinter mainloop
root.mainloop()
