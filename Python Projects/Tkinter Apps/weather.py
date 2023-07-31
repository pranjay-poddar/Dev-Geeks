# api key : 57c8daa000c7c60a7ce6b98a31933429
#  link: http://api.weatherstack.com/current?access_key=57c8daa000c7c60a7ce6b98a31933429&query={API key}

from tkinter import *
import requests
import json
root=Tk()
root.geometry("300x200")
root.title("Weather App")
root.configure(bg="white")
root.iconbitmap("images/icon_def.ico")

def fun():
    root2=Toplevel()
    global e1
    root2.title("Weather Data")
    root2.iconbitmap("images/icon_final.ico")
    root2.geometry("400x730")

    try:
        api_request=requests.get("http://api.weatherstack.com/current?access_key=57c8daa000c7c60a7ce6b98a31933429&query=" + str(e1.get()))
        api=json.loads(api_request.content)
        p=api["location"]
        frame1=LabelFrame(root2,text="Location",pady=10)
        frame1.pack(pady=10)
        for k in p:              
            mylabel=Label(frame1,text= f" {k} : {p[k]}" ,font=("Helvetica", 10),anchor=W)
            mylabel.pack()
        #print(api,p)
        q=api["current"]
        frame2=LabelFrame(root2,text="DATA", pady=10)
        frame2.pack(pady=10)
        for k in q:
            if k != "weather_icons":        #removing the weather_icon from labels
                mylabel=Label(frame2,text= f" {k} : {q[k]}" ,font=("Helvetica", 10),anchor=W)
                mylabel.pack()

        quit_btn=Button(root2,text="Quit",bd=5,command=root2.destroy).pack()

    except Exception as e:
        print(e)
        root2.destroy()
        api="Error : "
        l2=Label(root,text= f"{api} \n {e} ", padx=10,pady=10,bg="white", fg="red")
        l2.grid(row=3,column=0,padx=10,pady=10)
        

e1=Entry(root,bd=2)
e1.grid(row=0,column=1,padx=10,pady=10)

l1=Label(root,text="City Name", padx=10,pady=10,bg="white")
l1.grid(row=0,column=0,padx=10,pady=10)

button=Button(root, text="Submit", command=fun,bd=5)
button.grid(row=1,column=0,columnspan=2)

quit_btn=Button(root,text="Quit",bd=5,command=root.quit, fg="red", bg="cyan").grid(row=2,column=0,pady=10,columnspan=2)

root.mainloop()