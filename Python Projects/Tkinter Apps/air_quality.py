# using ambee
# email=kumarashishranjan4971@gmail.com
# pass = Ashish@4971
# api token : a622459c406157f2ea73dcd4a621c702e13ebb09fc58021b4b0695729cd69994
# url :https://api.ambeedata.com/latest/by-city?city=Bengaluru
# this does not work

from tkinter import *
import requests
import json


root=Tk()
#root.geometry("300x200")
root.title("Air Quality App")
root.configure(bg="white")
root.iconbitmap("images/icon_def.ico")

# defining the worst air quality
def worst_aqi():
    pass

def fun():
    root2=Toplevel()
    global e1
    global e2
    root2.title("Air Quality Data")
    root2.iconbitmap("images/icon_final.ico")
    root2.geometry("400x730")

    try:
        #api_request=requests.get("https://api.weatherbit.io/v2.0/current/airquality?city="+ str(e1.get()) +"&country="+ str(e2.get()) +"&key=83a68eb07f8644529b40b4bf35821364")
        #api_request=requests.get("https://api.weatherbit.io/v2.0/current/airquality?city=Muzaffarpur&country=India&key=83a68eb07f8644529b40b4bf35821364")
        #api_request=requests.get("https://api.ambeedata.com/latest/by-city?city=Bengaluru&x-api-key=a622459c406157f2ea73dcd4a621c702e13ebb09fc58021b4b0695729cd69994&Content-type=application/json")
        #api=json.loads(api_request.content)
        #p=api
        
        url = "http://api.waqi.info/feed/shanghai/?token=demo"
        api_request=requests.get("http://api.waqi.info/feed/Delhi/?token=demo")
        api=json.loads(api_request.content)
        print(api)
        querystring = {"city":"Bengaluru"}
        headers = {
            'x-api-key': "a622459c406157f2ea73dcd4a621c702e13ebb09fc58021b4b0695729cd69994",
            'Content-type': "application/json"
            }
        #response = requests.request("GET", url, headers=headers, params=querystring)
        #print(response.text)
        frame1=LabelFrame(root2,text="Location",pady=10)
        frame1.pack(pady=10)
        p=api
        for k in p:
            mylabel=Label(frame1,text= f" {k} : {p[k]}" ,font=("Helvetica", 10),anchor=W)
            mylabel.pack()
        '''# the data frame
        q=api["data"][0]
        frame2=LabelFrame(root2,text="DATA", pady=10)
        frame2.pack(pady=10)
        for k in q:
            
            mylabel=Label(frame2,text= f" {k} : {q[k]}" ,font=("Helvetica", 10),anchor=W)
            mylabel.pack()
        '''
        quit_btn=Button(root2,text="Quit",bd=5,command=root2.destroy).pack()

    except Exception as e:
        print(e)
        root2.destroy()
        api="Error : "
        l2=Label(root,text= f"{api} \n {e} ", padx=10,pady=10,bg="white", fg="red")
        l2.grid(row=4,column=0,padx=10,pady=10)
        

e1=Entry(root,bd=2)
e1.grid(row=0,column=1,padx=10,pady=10)

l1=Label(root,text="City Name :", padx=10,pady=10,bg="white")
l1.grid(row=0,column=0,padx=10,pady=10)

e2=Entry(root,bd=2)
e2.grid(row=1,column=1,padx=10,pady=10)

l2=Label(root,text="Country Name :", padx=10,pady=10,bg="white")
l2.grid(row=1,column=0,padx=10,pady=10)

button=Button(root, text="Submit", command=fun,bd=5,width=10)
button.grid(row=2,column=0,columnspan=2)

quit_btn=Button(root,text="Quit",bd=5,command=root.quit, fg="red", bg="cyan",width=10).grid(row=3,column=0,pady=10,columnspan=2)

root.mainloop()

'''
api_request=requests.get("https://api.weatherbit.io/v2.0/current/airquality?city=Muzaffarpur&country=India&key=83a68eb07f8644529b40b4bf35821364")
api=json.loads(api_request.content)
print(api) '''