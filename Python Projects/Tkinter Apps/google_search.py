#Import the required libraries
from tkinter import *
import webbrowser
from PIL import ImageTk, Image

#Create an instance of tkinter frame
root = Tk()
root.geometry("450x250")
root.configure(background="black")
root.title("Just Google It")

#Define a callback function
def callback(url):
   webbrowser.open_new_tab(url)


my_img=ImageTk.PhotoImage(Image.open("images/google2.png"))
my_label = Label(root,image=my_img, cursor="hand2", bg="black",height=70)     #cursor parameter changes cursor to hand
my_label.pack(pady=30)
my_label.bind("<Button-1>", lambda e : callback("https://www.google.com/"))

entry=Entry(root,bg="white", fg="black", width=25,font="century" )
entry.pack(pady=20)
button=Button(root,text="Search", fg="white",bd=5,bg="black",padx=20, cursor="hand2")
button.pack()

button.bind("<Button-1>", lambda e : callback("https://www.google.com/search?q="+ str(entry.get()) ))        #binding to link

root.mainloop()