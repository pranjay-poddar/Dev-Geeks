##################################################### Telegram Automation ###################################################
################################################## Made By Avdhesh Varshney #################################################
############################################ (https://github.com/Avdhesh-Varshney) ##########################################

'''Install Python Packages as listed below using these commands in the terminal/powershell

Sr. No.         Package Name             Commands
1.              pyttsx3                  pip install pyttsx3
2.              speech_recognition       pip install SpeechRecognition
3.              time                     pip install time
4.              os                       pip install os
5.              pyautogui                pip install pyautogui
6.              keyboard                 pip install keyboard

After install all these packages then import all of them in this file.'''

print("\nImporting required Libraries !\n\nWait for some time.")

# Importing Libraries
from time import sleep

try:
    import os
    import pyttsx3
    import speech_recognition as sr
    from pyautogui import click
    from keyboard import press, write
except:
    print("Your system does not meet the minimum requirements for this program.")
    print("Please read the 'READ ME' file.")
    exit()

sleep(2)
print('\n\nRequired libraries have imported !')
sleep(2)
os.system('cls')

# Function to speak something to you
def speak(audio):
    # Creating a instance of pyttsx3
    engine = pyttsx3.init('sapi5')

    # Creating a variable to set the voice of JARVIS
    voices = engine.getProperty('voices')

    # Set the voice of JARVIS which is present on index 0
    engine.setProperty('voices',voices[0].id)

    # Set the speed of speaking of JARVIS
    engine.setProperty('rate',200)

    print("   ")
    # Speaking command
    engine.say(audio)
    # Printing Command
    print(f"AI: {audio}")
    print("   ")

    engine.runAndWait()

# Listening from the user or taking command from the user
opening_text = [
    "Cool, I'm on it sir.",
    "Okay sir, I'm working on it.",
    "Just a second sir.",
]

def takeCommand():
    from random import choice
    command = sr.Recognizer()
    with sr.Microphone() as source:
        print("\nListening.............")
        command.pause_threshold = 1
        audio = command.listen(source,timeout=5,phrase_time_limit=5)
        try:
            print("\nRecognizing...........")
            query = command.recognize_google(audio, language = 'en-in')
            os.system('cls')
            print(f"You: {query}")

            # Greet the user on each command
            if 'wait' in query:
                speak("Sir, I will wake up after 30 seconds !")
                sleep(30)
                Telegram()
            if not 'exit' in query or 'stop' in query:
                speak(choice(opening_text))
            else:
                speak('Have a good day sir!')
                exit()
        except Exception as Error:
            speak("Sorry, Could you please say that again?")
            return "None"
        return query.lower()

def takePCName():
    speak("Sir, What's your PC name ?")
    pcName = input("\nEnter your PC name: ")
    return pcName

pcName = takePCName()

os.system('cls')

try:
    # Telegram path
    os.startfile(f"C:\\Users\\{pcName}\\AppData\\Roaming\\Telegram Desktop\\Telegram.exe")
except:
    speak("Your system does not either have Telegram Desktop application or your PC name is incorret !")
    sleep(3)
    exit()

os.system('cls')

speak("Sir! Welcome to Telegram automation!!")

sleep(5)

speak('Wait sir! It takes a little time to open !')


# Co-ordinates of clicks
def searchBox():
    x = 177
    y = 63
    click(x, y)

def chatOnSearching():
    x = 278
    y = 128
    click(x, y)

def messageBox():
    x = 752
    y = 994
    click(x, y)

def call():
    x = 1794
    y = 61
    click(x, y)

def pressVoiceCall():
    x = 1043
    y = 793
    click(x, y)

def pressVideoCall():
    x = 872
    y = 794
    click(x, y)

def createVC():
    x = 1107
    y = 587
    click(x, y)

def unmuteVC():
    x = 951
    y = 781
    click(x, y)


# Functions to perform different telegram executions or automate the telegram

# Function open the telegram chat
def telegramChat(name):
    searchBox()
    speak(f"Searching for the {name}...")
    write(name)
    chatOnSearching()

# Function to send messages in bulk
def telegramSpam():
    name = takeName()
    message = takeMessage()

    telegramChat(name)
    messageBox()
    
    for i in range(0, 50):
        write(message)
        i = i +1
        sleep(0.3)
        press('enter')
    speak("Sir, All messages have sent.")

# Function to send a message to that person
def telegramMsg():
    name = takeName()
    message = takeMessage()

    telegramChat(name)
    messageBox()

    write(message)
    press('enter')

    speak("Sir, Message has sent.")

# Function to make a voice call
def telegramVoiceCall():
    name = takeName()
    telegramChat(name)
    call()
    pressVoiceCall()

    speak(f"Sir, I have called to {name} ...")

# Function to make a video call
def telegramVideoCall():
    name = takeName()
    telegramChat(name)
    call()
    pressVideoCall()

# Function to create a video chat
def telegramVideoChat():
    name = takeName()
    telegramChat(name)
    call()
    createVC()

    speak("Sir, You are mute by default.\nCan i unmute you ?")
    command = takeCommand()
    while command == None or command == '':
        command = takeCommand()
    
    if 'yes' in command or 'ok' in command or 'right' in command:
        unmuteVC()
        speak("Sir, You are audible to your Friends.")
    else:
        speak("Fine Sir!!")


# Input Taking functions

# Function asking for the message
def takeMessage():
    os.system('cls')
    # Taking input of the message, you want to send
    speak("Sir, What's the message ?")
    message = takeCommand()

    speak(f"Sir, Your message is \n{message}\nPlease verify this by saying yes or no!")
    flag = takeCommand()
    if(flag == 'no'):
        while message == "None" or message == '' or message is None:
            speak("Ok sir, What's the message ?")
            message = takeCommand()
            speak(f"Sir, now message is \n{message}\nNow, it's correct or not!")
            flag = takeCommand()
            if(flag == 'yes'):
                break
    return message

# Function asking for the name
def takeName():
    os.system('cls')
    # Taking the name of the group or person on the telegram account
    speak("Sir, Tell me full name of group or person ?")
    name = takeCommand()

    speak(f"Sir, Name is \n{name}\nPlease verify this by saying yes or no!")
    flag = takeCommand()
    if flag == 'no':
        while name == "None" or name == '' or name is None:
            speak("Ok sir, Tell me full name of group or person ?")
            name = takeCommand()
            speak(f"Sir, now name is \n{name}\nNow, it's correct or not !")
            flag = takeCommand()
            if(flag == 'yes'):
                break
    return name

# Function take command / operation from the user to perform
def takeOperation():
    os.system('cls')

    # Taking the task as input which action user wants to perform
    print('''
##############################################  Welcome to Telegram Automation  #############################################
######################################            Made by Avdhesh Varshney            #######################################
###############################             (https://github.com/Avdhesh-Varshney)             ###############################
#############################################################################################################################
1. Telegram Message
2. Telegram Voice Call
3. Show Telegram Chat
4. Telegram Video Call
5. Telegram Spam

Say "wait" to pause the program for 30 seconds !
To close or exit the program, just say "exit" program will terminated.''')
    speak("Sir, What's the task ? ")

    query = takeCommand()

    speak(f"Sir, Command is \n{query}\nPlease verify this by saying yes or no!")
    flag = takeCommand()
    if flag == 'no':
        while query == "None" or query == '' or query is None:
            speak('Ok sir! What\' the task ? ')
            query = takeCommand()
            speak(f"Sir, now command is \n{query}\nNow, it's correct or not !")
            flag = takeCommand()
            if(flag == 'yes'):
                break
    return query


# Function explaining about yourself
def introduceYourSelf():
    speak('''Sir, I am Automated degined program on the basis of Artificial Intelligence.
    I can automate the windows installed Telegram application.
    I can perform a varieties of tasks and operations like
    \n
    Open the chat history of either a person or a group
    Arrange a video call
    Arrange a voice call
    Creating a video chat in the group
    Send a message either a person or in a group
    Send a span message into the group or to a individual account, etc.
    \n
    I can perform a lots of activities on the telegram application.''')

# Function to handle of automate the telegram app
def Telegram():
    while True:
        query = takeOperation()

        # Performing different tasks or operations
        if 'introduce' in query or 'about' in query:
            introduceYourSelf()
        
        elif 'spam' in query:
            telegramSpam()
        
        elif 'voice' in query:
            telegramVoiceCall()

        elif 'video chat' in query:
            telegramVideoChat()

        elif 'video' in query:
            telegramVideoCall()

        elif 'Telegram message' or 'message' in query:
            telegramMsg()

        elif 'show' or 'chat' in query:
            name = takeName()
            telegramChat(name)
        
        speak("Sir, Task completed!\nIs there anything you want to do ?")
        flag = takeCommand()
        if flag == 'no' or flag == 'nothing' or flag == 'not' or flag == 'None':
            speak("Ok Sir, you can call me at any time.\nBye Sir")
            break

# Driver function
Telegram()
