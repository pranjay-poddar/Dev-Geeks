#  courtesy = freeCodeCamp.org  (youtube)
#  Library = Tkinter

from tkinter import *
from tkinter.font import Font
from typing import Match
root= Tk()
root.title('DMAS Calculator')


#creating input field
e=Entry(root,  width=35, borderwidth=5, bg='white', fg='purple')
e.grid(row=0, column=0, columnspan=3,padx=10, pady=10)

#Defining the Functions
def button_click(number):
    c=e.get()
    e.delete(0,END)
    e.insert(0, str(c)+str(number))

def button_clear():
    e.delete(0,END)

def button_add():
    first_number=e.get()
    global f_num
    global m
    m= 'add'
    f_num = int(first_number)
    e.delete(0,END)

def button_subtract():
    first_number=e.get()
    global f_num
    global m
    m= 'subs'
    f_num = int(first_number)
    e.delete(0,END)

def button_multiply():
    first_number=e.get()
    global f_num
    global m
    m= 'multiply'
    f_num = int(first_number)
    e.delete(0,END)

def button_divide():
    first_number=e.get()
    global f_num
    global m
    m='divide'
    f_num = int(first_number)
    e.delete(0,END)

def button_equal():
    second_number=e.get()
    e.delete(0, END)

    if m=='add' :        #f_num of add is in action. It means we have to add
        e.insert(0, f_num + int(second_number))
    if m=='subs' :        #f_num of subs is in action. It means we have to subtract
        e.insert(0, f_num - int(second_number))
    if m=='multiply' :        #f_num of multiply is in action. It means we have to multiply
        e.insert(0, f_num * int(second_number))
    if m=='divide' :        #f_num of divide is in action. It means we have to divide
        e.insert(0, f_num / int(second_number))

#defining the global variable
m='hello'





#Defining the buttons
button_1=Button(root, text='1',padx=40, pady=20, command= lambda:button_click(1), bg='cyan', fg='red')
button_2=Button(root, text='2',padx=40, pady=20, command= lambda:button_click(2),bg='cyan', fg='red')
button_3=Button(root, text='3',padx=40, pady=20, command= lambda:button_click(3),bg='cyan', fg='red')
button_4=Button(root, text='4',padx=40, pady=20, command= lambda:button_click(4),bg='cyan', fg='red')
button_5=Button(root, text='5',padx=40, pady=20, command= lambda:button_click(5),bg='cyan', fg='red')
button_6=Button(root, text='6',padx=40, pady=20, command= lambda:button_click(6),bg='cyan', fg='red')
button_7=Button(root, text='7',padx=40, pady=20, command= lambda:button_click(7),bg='cyan', fg='red')
button_8=Button(root, text='8',padx=40, pady=20, command= lambda:button_click(8),bg='cyan', fg='red')
button_9=Button(root, text='9',padx=40, pady=20, command= lambda:button_click(9),bg='cyan', fg='red')
button_0=Button(root, text='0',padx=40, pady=20, command= lambda:button_click(0),bg='cyan', fg='red')
button_clear=Button(root, text='CLEAR',padx=73, pady=20, command=button_clear,bg='pink', fg='red')
button_add=Button(root, text='+',padx=39, pady=20, command=button_add, bg='pink', fg='red')
button_equal=Button(root, text='=',padx=86.49, pady=20, command=button_equal, bg='pink', fg='red')

button_subs=Button(root, text='-',padx=40, pady=20, command=button_subtract,bg='pink', fg='red')
button_mul=Button(root, text='X',padx=40, pady=20, command=button_multiply,bg='pink', fg='red')
button_div=Button(root, text='/',padx=40, pady=20, command=button_divide,bg='pink', fg='red')


#Shoving the buttons on screen
button_1.grid(row=3,column=0)
button_2.grid(row=3,column=1)
button_3.grid(row=3,column=2)

button_4.grid(row=2,column=0)
button_5.grid(row=2,column=1)
button_6.grid(row=2,column=2)

button_7.grid(row=1,column=0)   #row=1  as row=1 is for input field
button_8.grid(row=1,column=1)
button_9.grid(row=1,column=2)

button_0.grid(row=4,column=0)
button_clear.grid(row=4,column=1, columnspan=2)
button_add.grid(row=5,column=0)
button_equal.grid(row=5,column=1, columnspan=2)

button_subs.grid(row=6,column=0)
button_mul.grid(row=6,column=1)
button_div.grid(row=6,column=2)


root.mainloop()