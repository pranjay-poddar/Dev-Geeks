# Import Module
from tkinter import * 
from Converter import pdfconverter
from tkinter import filedialog

# create root window
root = Tk()
filename = "" 
def browse_pdf_file():
    file_path = filedialog.askopenfilename(filetypes=[("PDF Files", "*.pdf")])
    if file_path:
        global filename
        filename = file_path.split("/")[-1]  # Extract the filename from the full path
        selected_file_label.config(text="Selected PDF File: " + filename)
    else:
        selected_file_label.config(text="No PDF file selected.")

# root window title and dimension
root.title("Welcome to PDF to Text Converter")
# Set geometry (widthxheight)
root.geometry('500x300')

# Create a label to display the selected PDF file's filename
select_button = Button(root, text="Select PDF File", command=browse_pdf_file)
select_button.grid(column =1, row =0)

selected_file_label = Label(root, text="No PDF file selected.", wraplength=300)
selected_file_label.grid(column =2, row =0)


lbl2 = Label(root, text = "Select The Text file")
lbl2.grid(column =0, row =5)
txt2 = Entry(root, width=10)
txt2.grid(column =1, row =5)


# function to display user text when
# button is clicked
def clicked(): 
    pdfconverter(filename,txt2.get())


 
# button widget with red color text inside
btn = Button(root, text = "Click me" ,
             fg = "red", command=clicked)
# Set Button Grid
btn.grid(column=2, row=7)

# all widgets will be here
# Execute Tkinter
root.mainloop()
