#Importing the libraries
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from tkinter import *
import pyttsx3 as pp
import speech_recognition as s
import threading
import time
time.clock = time.time

#Initializing the chatbot
engine = pp.init()
#Setting the properties of the speech
voice = engine.getProperty('voices')
engine.setProperty('voice',voice[0].id)


#Defining the speak function which will take the word as input and speak it
def speak(word):
    engine.say(word)
    engine.runAndWait()

#Creating the chatbot object using chatterbot
bot = ChatBot("My Chatbot")
conversation = [
    'hello',
    'Hi!'
    'What is your name?',
    'My name is TheBot, I am created by Disha Modi',
    'How are you',
    'I am fine',
    'Where do you live?',
    'I live in Nadiad',
    'Using which language you are built',
    'I am built using Python',
    'What is your fav book?',
    'My fav book is Rich Dad, Poor Dad'
]

#Training the chatbot
trainer = ListTrainer(bot);
trainer.train(conversation)

#Creating the GUI
main = Tk()
main.geometry("500x650")  #Setting the size of the window
main.title("My New ChatBot") #Setting the title of the window
img = PhotoImage(file = "bot.png") #Setting the icon of the window
photoL = Label(main,image = img) #Creating the label for the image
photoL.pack(pady=5) #Setting the padding of the image and packing it

#Creating the function which will take the query from the user and convert it into text
def take_query():
    sr = s.Recognizer()
    sr.pause_threshold = 1
    print("Bot is listening, Try to speak")
    with s.Microphone() as m:
        try :
            #Getting the audio from the user
            audio = sr.listen(m)
            query = sr.recognize_google(audio, language='eng-in')
            textF.delete(0, END)    #Deleting the previous text
            textF.insert(0, query) #Inserting the new text
            msgs.yview(END) #Setting the view of the text
        except Exception as e:
            print(e)

def ask_from_bot():
    print("Button Clicked")
    query = textF.get()         #Getting value from Text Field
    answer_from_bot = bot.get_response(query)
    msgs.insert(END,"You : "+query)
    msgs.insert(END,"Bot : "+str(answer_from_bot))
    speak(answer_from_bot)
    textF.delete(0,END)
    msgs.yview(END)

#Creating the frame for the chatbot
frame = Frame(main)
#Creating the scrollbar for the chatbot
sc = Scrollbar(frame)
#Creating the listbox for the chatbot
msgs = Listbox(frame,width=80,height=20,yscrollcommand=sc.set)
# Packing the frame,scrollbar and listbox
sc.pack(side=RIGHT,fill = Y)
msgs.pack(side=LEFT,fill = BOTH,pady=10)
frame.pack()

#Creating Text field
textF = Entry(main,font=("Comic Sans",20))
textF.pack(fill=X,pady=10)
#Creating the button
btn = Button(main,text="Ask from Bot",font=("Comic Sans",20),command=ask_from_bot)
btn.pack()

#Creating the function which will take the query from the user and convert it into text
def enter_function(event):
    btn.invoke()

#Going to bind main window with event(click on enter key)
main.bind('<Return>',enter_function)

def repeatL():
    while True:
        take_query()

#Creating the thread
t = threading.Thread(target=repeatL)
t.start()

main.mainloop()
