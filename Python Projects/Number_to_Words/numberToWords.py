import tkinter as tk
from tkinter.filedialog import *

global groups

first_twenty = ["", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten ",
 "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen ", "Twenty "]

tens = ["","","twenty ","thirty ", "fourty ","fifty ","sixty ","seventy ","eighty ","ninety "]
hundreds = ["","One hundred ", "Two hundred ","Three hundred ","Four hundred ","Five hundred ",
"Six hundred ","Seven hundred ","Eight hundred ","Nine hundred " ]

mult = ["","thousand", "million", "billion"]


window = tk.Tk()
window.title("Number to words")
window.geometry('300x100')

def count_dig(number): # function to count numner of digits 
    sum = 0
    while(number>0):
        sum += 1
        number = number//10
    return sum


def numof3dig(samp): # finding name of a set of 3 digits
    answer = ""
    if count_dig(samp)==3 and samp%100!=0:
        while samp>0:
            answer = hundreds[samp//100] 
            if samp%100<=20:
                answer = answer + first_twenty[samp%100] 
            else:
                answer = answer + hundreds[(samp//100)] + tens[((samp%100)//10)] + first_twenty[samp%10] 
    elif count_dig(samp)==3 and samp%100==0:
        answer = answer + hundreds[(samp//100)]
    else:
        answer = answer + tens[((samp%100)//10)] + first_twenty[samp%10]
    return answer

def number_words(n):
    global groups
    fin_answer = ""
    ncopy = n
    groups = 0
    if(ncopy == 0):
        fin_answer = "zero"
    elif(ncopy>0 and ncopy<=20):
        fin_answer = first_twenty[num]
        label = tk.Label(window, text="Output: ").grid(row=2, column=0)
        label = tk.Label(window, text=fin_answer).grid(row=2, column=1)
        return
    while(ncopy>0):
        fin_answer = numof3dig(ncopy%1000) + mult[groups] + fin_answer
        groups += 1
        ncopy = ncopy//1000
    label = tk.Label(window, text="Output: ").grid(row=2, column=0)
    label = tk.Label(window, text=fin_answer).grid(row=2, column=1)
    return


def proceeds():
    global num
    num = t.get(1.0, "end-1c")
    num = int(num)
    number_words(num)

label = tk.Label(window, text="Enter a number").grid(row=0, column=0)
t = tk.Text(window, height=1, width=15)
proceed = tk.Button(window, text='Proceed', command=proceeds)

t.grid(row=0,column=1)
proceed.grid(row=1,column=1)

window.mainloop()
