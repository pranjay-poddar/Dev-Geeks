# pip install tkinter
from tkinter import *
# pip install pyperclip
import pyperclip
import random

root = Tk()
root.geometry("700x300")
passwrd = StringVar()
passlen = IntVar()
passlen.set(0)


def generate(): # Function to generate the password
	pass1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
			'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
			'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D',
			'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
			'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
			'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8',
			'9', '0', ' ', '!', '@', '#', '$', '%', '^', '&',
			'*', '(', ')']
	password = ""
	for x in range(passlen.get()):
		password = password + random.choice(pass1)
	passwrd.set(password)

# function to copy the passcode


def copyclipboard():
	random_password = passwrd.get()
	pyperclip.copy(random_password)
# Labels


Label(root, text="Password Generator", font="Courier 30 bold",bg="black",fg="green").pack()
Label(root, text="USING PYTHON", font="Courier 20 italic").pack()
Label(root, text="Enter the number to get password").pack(pady=3)
Entry(root, textvariable=passlen).pack(pady=3)
Button(root, text="Tap to get", command=generate).pack(pady=7)
Entry(root, textvariable=passwrd).pack(pady=3)
Button(root, text="Tap to copy clipboard", command=copyclipboard).pack()
root.mainloop()
