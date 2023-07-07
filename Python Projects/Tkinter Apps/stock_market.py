# api token:  61a5cc82d3f250.57930188
#  url : "https://eodhistoricaldata.com/api/eod/MCD.US?from=2021-01-05&to=2021-02-10&period=d&api_token=61a5cc82d3f250.57930188&fmt=json"





from tkinter import *
import requests
import json
root=Tk()
#root.geometry("300x300")
root.title(" Stock App")
root.configure(bg="#00ffeb")
root.iconbitmap("images/icon_def.ico")

def fun():
    root2=Toplevel()
    global e1
    global e2
    global e3
    root2.title("Stock Data")
    root2.iconbitmap("images/icon_final.ico")
    #root2.geometry("400x730")
    root2.configure(bg="#ffd1ef")

    try:
        api_request=requests.get("https://eodhistoricaldata.com/api/eod/MCD."+ e3.get() +"?from=" + str(e1.get())+ "&to="+ str(e2.get()) +"&period=d&api_token=61a5cc82d3f250.57930188&fmt=json")
        api=json.loads(api_request.content)
        for i in range(len(api)):
            p=api[i]

            frame1=LabelFrame(root2 ,pady=10,bg="#ffd1ef", fg="red")
            frame1.pack(pady=10)
            for k in p:
                mylabel=Label(frame1,text= f" {k} : {p[k]}" ,font=("Helvetica", 10),anchor=W, bg="#ffd1ef")
                mylabel.pack()
        

        quit_btn=Button(root2,text="Quit",bd=5,command=root2.destroy).pack()

    except Exception as e:
        print(e)
        root2.destroy()
        api="Error Occured : "
        l2=Label(root,text= f"{api} \n {e} ", padx=10,pady=10,bg="#00ffeb", fg="red")
        l2.grid(row=5,column=0,padx=10,pady=10,columnspan=2)
        

e1=Entry(root,bd=2)
e1.grid(row=0,column=1,padx=10,pady=10,sticky=N+E+W+S)
e1.insert(0,"2021-5-21")

l1=Label(root,text="Date From :", padx=10,pady=10,bg="#00ffeb")
l1.grid(row=0,column=0,padx=10,pady=10,sticky=N+E+W+S)

e2=Entry(root,bd=2)
e2.grid(row=1,column=1,padx=10,pady=10,sticky=N+E+W+S)
e2.insert(0,"2021-5-25")

l2=Label(root,text="Date To :", padx=10,pady=10,bg="#00ffeb")
l2.grid(row=1,column=0,padx=10,pady=10,sticky=N+E+W+S)

e3=Entry(root,bd=2)
e3.grid(row=2,column=1,padx=10,pady=10,sticky=N+E+W+S)
e3.insert(0,"US")

l3=Label(root,text="Exchange", padx=10,pady=10,bg="#00ffeb")
l3.grid(row=2,column=0,padx=10,pady=10,sticky=N+E+W+S)

button=Button(root, text="Submit", command=fun,bd=5)
button.grid(row=3,column=0,columnspan=2)

quit_btn=Button(root,text="Quit",bd=5,command=root.quit, fg="red", bg="cyan").grid(row=4,column=0,pady=10,columnspan=2)

l4=Label(root,text= f"We provide data for previous 1 year only. \n Data is End-Of-Day Historical Stock Market Data", padx=10,pady=10,bg="#00ffeb", fg="black")
l4.grid(row=6,column=0,padx=10,pady=10,columnspan=2)

l5=Label(root,text= f"For documentation of supported Exchange please visit : \n https://eodhistoricaldata.com/financial-apis/list-supported-exchanges/ ", padx=10,pady=10,bg="#00ffeb", fg="blue")
l5.grid(row=7,column=0,padx=10,pady=10,columnspan=2)

root.mainloop()
