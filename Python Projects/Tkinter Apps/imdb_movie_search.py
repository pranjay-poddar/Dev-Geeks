# url : http://www.omdbapi.com/?apikey=[yourkey]&
# api : 9339eb0a

#this app searchs movie on imdb. It does not give much information about the movie

'''
import requests
import json
api_request=requests.get("http://www.omdbapi.com/?apikey=9339eb0a&s=iron man")
api=json.loads(api_request.content)
print(api)  ''' 


from tkinter import *
import requests
import json
import webbrowser
from PIL import ImageTk, Image

root=Tk()
#root.geometry("300x200")
root.title("Movie App")
root.configure(bg="lightblue")
root.iconbitmap("images/icon_def.ico")

def fun():
    root2=Toplevel()
    global e1
    root2.title("Movie Data")
    root2.iconbitmap("images/icon_final.ico")
    #root2.geometry("400x730")
    

    try:
        api_request=requests.get("http://www.omdbapi.com/?apikey=9339eb0a&s=" + str(e1.get()))
        api=json.loads(api_request.content)
        p=api["Search"]
        t=len(p)
        for i in range(len(p)):
            
            frame1=LabelFrame(root2,text=f"data : {i}",pady=3)
            frame1.grid(row=i%6, column=i//6 ,pady=3,padx=5,sticky=W)
            
            for k in p[i]:
                if k != "Poster":        
                    mylabel=Label(frame1,text= f" {k} : {p[i][k]}" ,font=("Helvetica", 10),anchor=W)
                    mylabel.pack(anchor=W)



        quit_btn=Button(root2,text="Quit",bd=5,command=root2.destroy,padx=30).grid(row=7,column=5 ,pady=5)

    except Exception as e:
        print(e)
        root2.destroy()
        api="Error : "
        l2=Label(root,text= f"{api} \n {e} ", padx=10,pady=10,bg="white", fg="red")
        l2.grid(row=4,column=0,padx=10,pady=10)
        


my_img=ImageTk.PhotoImage(Image.open("images/4.jfif"))
my_label=Label(root, image=my_img,height=50,width=35)
my_label.grid(row=0,column=0,columnspan=2)                #the image is under the Movie App line

l2=Label(root,text="Movie App", font=("chiller", 70),bg="lightblue")
l2.grid(row=0,column=0,columnspan=2,pady=20)

e1=Entry(root,bd=2)
e1.grid(row=1,column=1,padx=10,pady=20)

l1=Label(root,text="Movie Name", padx=10,pady=10,bg="lightblue")
l1.grid(row=1,column=0,padx=10,pady=20)

button=Button(root, text="Submit", command=fun,bd=5, padx=32)
button.grid(row=2,column=0,columnspan=2,pady=20)

quit_btn=Button(root,text="Quit",bd=5,command=root.quit, fg="red", bg="white",padx=40).grid(row=3,column=0,pady=10,columnspan=2)

root.mainloop()