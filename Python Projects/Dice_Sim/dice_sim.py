from tkinter import *
import random

root=Tk()
root.title("Dice Simulator")
root.geometry("500x400")

label= Label(root,font=("poppins","25"),text="Krutiks's Dice Simulator")
label.pack()


label2= Label(root,font=("poppins","200"),text="")

def rolldice():
    val = ["\u2680","\u2681","\u2682","\u2683","\u2684","\u2685"]
    label2.configure(text=f'{random.choice(val)}')
    label2.pack()

button = Button(root,font=("poppins","30"),text="Roll Die",command=rolldice)
button.pack()

root.mainloop()
