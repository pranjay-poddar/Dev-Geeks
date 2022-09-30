from tkinter import *
import tkinter.messagebox as tmsg
from elements import *


def click():
    entered_text = textentry.get()  # this will collect the text from the text entry box
    output.delete(0.0, END)  # makes sure textbox is clear
    try:
        results = elements[entered_text]
    except Exception as e:
        e = tmsg.showerror("Error Encoured", "Please enter a valid element")
        print(e)
    output.insert(END, results)


def exe():
    cncl = tmsg.askquestion("Confirm Exit Message",
                            "Do You Really want to Exit??")
    if cncl == "yes":
        quit()


# main:
root = Tk()
root.geometry("1000x750")
root.minsize(1000, 750)
root.maxsize(1000, 750)
root.title("Periodic Elements")
root.wm_iconbitmap(r"Periodic.ico")


f1 = Frame(root, bg="#EE5537", height=20, width=30, relief=SUNKEN)
labl = Label(
    f1, text="Periodic Elements", font="hack 17 bold"
).pack(padx=10, pady=10)
f1.pack(padx=10, pady=10)
# create label
lab = Label(
    root, text='Enter an Element, Symbol or Atomic number:', font="Consolas 16 bold")
lab.pack(fill=BOTH)

# create a text entry box
textentry = Entry(root, width=30, borderwidth=5,
                  font="firacode 18", fg="#000000")
textentry.pack(padx=10, pady=10, ipady=14, ipadx=10, fill=X)

# add a submit button
Button(root, text="SUBMIT", font="Comicsansms 16", width=9,
       command=click).pack(padx=10, pady=10, anchor=W)

Button(root, text="EXIT", font="Comicsansms 16", width=9,
       command=exe).pack(padx=10, pady=10, anchor=NE)

# create another label
Label(root, text="\nResults:", font="Helvetica 18").pack()

# create a text box
output = Text(root, width=75, height=10, wrap=WORD,
              background="#DAF7A6", font="Firacode 17")
output.pack()


root.mainloop()