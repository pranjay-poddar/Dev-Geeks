from tkinter import *
import time

root=Tk()
root.title('Clock')
root.iconbitmap('images/icon_def.ico')
root.geometry('600x600')

def update():
    hour=time.strftime('%I')
    minute=time.strftime('%M')
    sec=time.strftime('%S')
    day=time.strftime('%A')
    year=time.strftime('%Y')
    timezone=time.strftime('%Z')
    month=time.strftime('%B')
    am_pm=time.strftime('%p')

    l1.config(text=f"{hour} : {minute} : {sec}  {am_pm}  ")
    l1.after(1000, update)
    l2.config(text=f" \n\n Day : {day} \n\n")
    l2.after(1000, update)
    l3.config(text=f"Time Zone : {timezone}")
    l3.after(1000, update)

l1=Label(root,text='Welcome', font=('Helvetica',48), fg='red', bg='cyan' )
l1.pack()
l2=Label(root,text='Day of week', font=('Helvetica',20))
l2.pack()
l3=Label(root,text='Timezone', font=('Helvetica',14))
l3.pack()

update()
mainloop()