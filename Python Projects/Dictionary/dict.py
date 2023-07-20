from tkinter import *
import json
from difflib import get_close_matches
from tkinter import messagebox

data = json.load(open("dictionary.json"))

def search_word():
    word = input_var.get().lower()
    if word in data:
        meaning.delete(1.0, END)
        meaning.insert(END, data[word])
    elif len(get_close_matches(word, data.keys())) > 0:
        close_match = get_close_matches(word, data.keys())[0]
        confirm = messagebox.askyesno("Confirmation", f"Did you mean '{close_match}'?")
        if confirm:
            meaning.delete(1.0, END)
            meaning.insert(END, data[close_match])
        else:
            messagebox.showinfo("Word Not Found", "The word does not exist in the dictionary.")
    else:
        messagebox.showinfo("Word Not Found", "The word does not exist in the dictionary.")

root = Tk()
root.title("Dictionary")
root.geometry("800x600")
root.configure(bg="#F7F7F7")

header_frame = Frame(root, bg="#333333", pady=20)
header_frame.pack(fill=X)

header_label = Label(header_frame, text="Dictionary", font=("Helvetica", 24, "bold"), fg="white", bg="#333333")
header_label.pack()

input_frame = Frame(root, bg="#F7F7F7", pady=20)
input_frame.pack()

input_var = StringVar()
word_entry = Entry(input_frame, textvariable=input_var, background="#E6E6E6", fg="#333333", font=("Helvetica", 18))
word_entry.pack(side=LEFT, padx=10)

search_button = Button(input_frame, text="Search", command=search_word, background="#333333", fg="white", font=("Helvetica", 16, "bold"))
search_button.pack(side=LEFT)

meaning_frame = Frame(root, bg="#F7F7F7")
meaning_frame.pack(expand=True, padx=50, pady=20)

scrollbar = Scrollbar(meaning_frame)
scrollbar.pack(side=RIGHT, fill=Y)

meaning = Text(meaning_frame, font=("Helvetica", 14), wrap=WORD, yscrollcommand=scrollbar.set, bg="#E6E6E6", fg="#333333")
meaning.pack(fill=BOTH, expand=True)

scrollbar.config(command=meaning.yview)

root.mainloop()
