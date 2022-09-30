from tkinter import *
import numpy as np
root=Tk()
root.title("MATRIX CALCULATOR")
root.iconbitmap(r'favicon.ico')

matrix_1=[]
matrix_2=[]

def addition():
	list1=[]
	list2=[]
	for a in matrix_1:
		list1.append(int(a.get()))

	for b in matrix_2:
		list2.append(int(b.get()))

	matrix1a= np.array(list1)
	matrix1=np.reshape(matrix1a,(3,3))
	matrix2a= np.array(list2)
	matrix2=np.reshape(matrix2a,(3,3))
	matrix3= (matrix1+matrix2)
	Label_3.config(text=matrix3)

def multiplication():
	list1=[]
	list2=[]
	for a in matrix_1:
		list1.append(int(a.get()))

	for b in matrix_2:
		list2.append(int(b.get()))
	matrix1a= np.array(list1)
	matrix1=np.reshape(matrix1a,(3,3))
	matrix2a= np.array(list2)
	matrix2=np.reshape(matrix2a,(3,3))
	matrix3=np.matmul(matrix1,matrix2)
	Label_4.config(text=matrix3)

Label_1=Label(root, text="ENTER VALUES OF MATRIX 1: ")
Label_1.grid(row=0,column=0)
for y in range(1,4):
	for x in range(3):
		elements = Entry(root)
		elements.grid(row=y, column=x, pady=20, padx=5)
		matrix_1.append(elements)

Label_2=Label(root, text="ENTER VALUES OF MATRIX 2: ")
Label_2.grid(row=4,column=0)

for y in range(5,8):
	for x in range(3):
		elements = Entry(root)
		elements.grid(row=y, column=x, pady=20, padx=5)
		matrix_2.append(elements)

my_button_1 = Button(root, text="ADD", command=addition)
my_button_1.grid(row=8, column=0, pady=20)

Label_3=Label(root, text="")
Label_3.grid(row=9,column=0)


my_button_1 = Button(root, text="MULTIPLY", command=multiplication)
my_button_1.grid(row=10, column=0, pady=20)

Label_4=Label(root, text="")
Label_4.grid(row=11,column=0)


root.mainloop()