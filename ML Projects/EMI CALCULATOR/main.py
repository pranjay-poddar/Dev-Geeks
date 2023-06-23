from tkinter import *
import math 
root=Tk()
root.title("EMI CALCULATOR")
root.iconbitmap(r'favicon.ico')
def emi(): 
	p = float(txt.get())
	r = float(txt_2.get())/100/12
	n = float(txt_3.get())
	ans = (p * r * math.pow((1 + r),n))/(math.pow((1 + r),n) - 1)
	Label_2.config(text="Loan EMI = "+str(ans))
	ans_2 = ans * 12
	Label_3.config(text="Total Interest Payable = "+ str(ans_2))
	ans_3 = ans_2 - float(txt.get())
	Label_4.config(text="Total Payment(Principal + Interest) = "+ str(ans_3))
	
Label_1=Label(root, text="ENTER PRINCIPAL : ").pack()
txt=Entry(root, text="")
txt.pack()
Label_1=Label(root, text="ENTER RATE : ").pack()
txt_2=Entry(root, text="")
txt_2.pack()
Label_1=Label(root, text="ENTER TIME : ").pack()
txt_3=Entry(root, text="")
txt_3.pack()
butt=Button(root, text="CALCULATE", command=emi).pack()
Label_2=Label(root, text=" Loan EMI ")
Label_2.pack()
Label_3=Label(root, text=" Total Interest Payable ")
Label_3.pack()
Label_4=Label(root, text=" Total Payment(Principal + Interest) ")
Label_4.pack()
root.mainloop()