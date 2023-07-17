#  Language : Python
#  Library : Tkinter, PIL
#  This is a working form of Image Viewer.
#  this final result shows no overlapping of images.
#  On pressing Exit it will show a message.
#  And it contains Status Bar.
#  It quits like GTA games.

#Imports
from tkinter import *
from typing import Sized
from PIL import ImageTk, Image
from threading import Timer         #using Timer of threading to auto terminate the application

#work on root
root=Tk()
root.title('IMAGE  Viewer')
root.iconbitmap('images/icon_final.ico')

i=0
my_label=Label()      #It labels nothing as we didnot put it on the screen.  It just helps create a global variable.
b= Button()

#making things thst will appear before images
l=Label(root,text='WELCOME \n\n To an IMAGE viewer created by: \n\n KUMAR ASHISH RANJAN',height=25,bg='pink', fg='red',padx=120, font=14)
l.grid(row=0,column=0,columnspan=3)



#Defining the images
my_img1=ImageTk.PhotoImage(Image.open('images/1.jpeg'))
my_img2=ImageTk.PhotoImage(Image.open('images/2.jpeg'))
my_img3=ImageTk.PhotoImage(Image.open('images/3.jpg'))
my_img4=ImageTk.PhotoImage(Image.open('images/4.jfif'))
my_img5=ImageTk.PhotoImage(Image.open('images/6.jpg'))
my_img6=ImageTk.PhotoImage(Image.open('images/7.jpeg'))


#Creating List of defined images
my_list=[my_img1,my_img2,my_img3,my_img4,my_img5,my_img6]

#defining Status Bar (lower end)
status=Label(root,text=f'\tStatus Bar\n Your Folder comtains: {len(my_list)} images ', bd=1, relief=SUNKEN, anchor=W ,bg='white', fg='blue')


#Defining the Functions
def next():
    l.grid_forget()
    global my_label
    my_label.grid_forget()
    global i
    i += 1
    p=abs(i%5)
    my_label=Label(image=my_list[p], height=500,bg='cyan')
    my_label.grid(row=0,column=0, columnspan=3)

    #some update in status bar
    status['text']= 'Image ' + str(p) + ' of ' + str(len(my_list)) + '   '
    status['anchor'] = E
    status.grid(row=2,column=0, columnspan=3, sticky=W+E)


def previous():
    l.grid_forget()
    global my_label
    my_label.grid_forget()
    global i
    i -= 1
    p=abs(i%5)
    my_label=Label(image=my_list[p],height=500,bg='cyan')
    my_label.grid(row=0,column=0, columnspan=3)

    #some update in status bar
    status['text']= 'Image ' + str(p) + ' of ' + str(len(my_list)) + '   '
    status['anchor'] = E
    status.grid(row=2,column=0, columnspan=3, sticky=W+E)


#creating different exit page
def auto_terminate():
    root.quit()
    

def quitting():
    global b
    l=Label(root,text='Thanks For Using Our Software \n This Software is Created Using: \n Python.Tkinter\n\n\nThis window will Quit Automatically',height=25, bg='white', fg='red',font=14,padx=70,relief=SUNKEN).grid(row=0,column=0,columnspan=3)
    b.grid_forget()
    root.title('Quitting....')
    
    timer=Timer(2 , auto_terminate)
    timer.start()
    

def exit():
    global l
    l.grid_forget()
    global my_label
    my_label.grid_forget()
    global b
    button_prev.grid_forget()
    button_exit.grid_forget()
    button_next.grid_forget()

    global status            #accessing global status
    status.grid_forget()     #deleting the status bar
    
    l=Label(root,text='Do YOU Really Wish to EXIT ?' ,height=25, bg='white', fg='red',font=14,padx=70,relief=SUNKEN).grid(row=0,column=0,columnspan=3)
    b=Button(root, text='Confirm and EXIT',command=quitting, padx=60,bd=5, bg='cyan', fg= 'red', font=10 )
    b.grid(row=1,column=1,columnspan=1)
    

#defining Buttons
button_prev=Button(root,text='<<', command=previous, padx=10, pady=10,bd=5,bg='white')
button_exit=Button(root,text='Exit', command=exit, padx=20, pady=10,bd=5,bg='white')
button_next=Button(root,text='>>', command=next, padx=10, pady=10,bd=5,bg='white')


#putting the defined buttons on screen
button_prev.grid(row=1,column=0,pady=10)
button_exit.grid(row=1,column=1,pady=10)
button_next.grid(row=1,column=2, pady=10)
status.grid(row=2,column=0, columnspan=3, sticky=W+E)
root.mainloop()