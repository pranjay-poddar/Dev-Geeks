################################################ Open & Close Apps Automation ###############################################
################################################## Made By Avdhesh Varshney #################################################
############################################ (https://github.com/Avdhesh-Varshney) ##########################################

'''Install Python Packages as listed below using these commands in the terminal

Sr. No.         Package Name             Commands
1.              pyttsx3                  pip install pyttsx3
2.              speech_recognition       pip install SpeechRecognition
3.              time                     pip install time
4.              os                       pip install os
5.              subprocess               pip install subprocess

After install all these packages then import all of them in this file.'''

print("\nImporting required Libraries !\n\nWait for some time.")

# Importing Libraries
from time import sleep

try:
    import os
    import pyttsx3
    import speech_recognition as sr
    import subprocess as sp
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
            command = command.recognize_google(audio, language = 'en-in')
            os.system('cls')
            print(f"You: {command}")

            # Greet the user on each command
            if 'wait' in command:
                speak("Sir, I will wake up after 30 seconds !")
                sleep(30)
            if not 'exit' in command or 'stop' in command:
                speak(choice(opening_text))
            else:
                speak('Have a good day sir!')
                exit()
        except Exception as Error:
            speak("Sorry, Could you please say that again?")
            return "None"
        return command.lower()


# Function to take input of yours system name
def takePCName():
    speak("Sir, What's your PC name ?")
    pcName = input("\nEnter your PC name: ")
    return pcName

pcName = takePCName()

os.system('cls')


# Different Function in your PC to open that programs

# Function to open command prompt
def open_cmd():
    os.system('start cmd')

# Function to open the camera of your system
def open_camera():
    sp.run('start microsoft.windows.camera:', shell=True)

# This function will handle to open any programs
def OpenApps(command):
    os.system('cls')
    command = command.replace("open ","")
    command = command.replace("the","")
    command = command.replace(" ","")

    speak(f"Ok sir, Searching for {command}...")
    flag = 1
    
    try:
        if 'code' in command:
            os.startfile(f"C:\\Users\\{pcName}\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe")

        elif 'telegram' in command:
            os.startfile(f"C:\\Users\\{pcName}\\AppData\\Roaming\\Telegram Desktop\\Telegram.exe")

        elif 'whatsapp' in command:
            os.startfile(f"C:\\Users\\{pcName}\\AppData\\Local\\WhatsApp\\WhatsApp.exe")

        elif 'brave' in command:
            os.startfile("C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe")

        elif 'firefox' in command:
            os.startfile("C:\\Program Files\\Mozilla Firefox\\firefox.exe")

        elif 'idm' in command or 'downloadmanager' in command:
            os.startfile("C:\\Program Files (x86)\\Internet Download Manager\\IDMan.exe")
        
        elif 'microsoftedge' in command or 'edge' in command or 'microsofttis' in command:
            os.startfile("C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe")

        elif 'msword' in command or 'word' in command:
            os.startfile("C:\\Program Files (x86)\\Microsoft Office\\root\\Office16\\WINWORD.EXE")

        elif 'excel' in command:
            os.startfile("C:\\Program Files (x86)\\Microsoft Office\\root\\Office16\\EXCEL.EXE")

        elif 'powerpoint' in command:
            os.startfile("C:\\Program Files (x86)\\Microsoft Office\\root\\Office16\\POWERPNT.EXE")

        elif 'msnote' in command or 'onenote' in command or '1note' in command:
            os.startfile("C:\\Program Files (x86)\\Microsoft Office\\root\\Office16\\ONENOTE.EXE")

        elif 'skype' in command:
            os.startfile("C:\\Program Files (x86)\\Microsoft Office\\root\\Office16\\lync.exe")

        elif 'teamviewer' in command:
            os.startfile("C:\\Program Files\\TeamViewer\\TeamViewer.exe")

        elif 'winrar' in command:
            os.startfile("C:\\Program Files\\WinRAR\\WinRAR.exe")

        elif 'zoom' in command:
            os.startfile(f"C:\\Users\\{pcName}\\AppData\\Roaming\\Zoom\\bin\\Zoom.exe")

        elif 'commandprompt' in command or 'cmd' in command:
            open_cmd()

        elif 'camera' in command:
            open_camera()

        elif 'githubdesktop' in command or 'desktop' in command:
            os.startfile(f"C:\\Users\\{pcName}\\AppData\\Local\\GitHubDesktop\\GitHubDesktop.exe")

        elif 'calculator' in command:
            os.startfile("C:\\Windows\\System32\\calc.exe")
        
        else:
            speak("Sorry sir! No apps found!!")
            flag = 0
        
        if flag:
            speak(f"Sir, {command} has opened.")

    except:
        speak("Sir, Either path of file is wrong or this is not install in your system !")


# This function will handle to close any open programs
def CloseApps(command):
    os.system('cls')
    command = command.replace("close ","")
    command = command.replace("the","")
    command = command.replace(" ","")

    speak(f"Ok sir, Checking {command} is open or not...")
    flag = 1
    
    try:
        if 'code' in command:
            os.system("TASKKILL /F /im Code.exe")

        elif 'telegram' in command:
            os.system("TASKKILL /F /im Telegram.exe")

        elif 'whatsapp' in command:
            os.system("TASKKILL /F /im Whatsapp.exe")

        elif 'brave' in command:
            os.system("TASKKILL /F /im brave.exe")

        elif 'firefox' in command:
            os.system("TASKKILL /F /im firefox.exe")
            
        elif 'idm' in command or 'downloadmanager' in command:
            os.system("TASKKILL /F /im IDMan.exe")
            
        elif 'edge' in command:
            os.system("TASKKILL /F /im msedge.exe")
            
        elif 'msword' in command or 'word' in command:
            os.system("TASKKILL /F /im WINWORD.exe")
            
        elif 'excel' in command:
            os.system("TASKKILL /F /im EXCEL.exe")
            
        elif 'powerpoint' in command:
            os.system("TASKKILL /F /im POWERPNT.exe")
            
        elif 'msnote' in command or 'onenote' in command or '1note' in command:
            os.system("TASKKILL /F /im ONENOTE.exe")
            
        elif 'skype' in command:
            os.system("TASKKILL /F /im lync.exe")
            
        elif 'teamviewer' in command:
            os.system("TASKKILL /F /im TeamViewer.exe")
            
        elif 'winrar' in command:
            os.system("TASKKILL /F /im WinRAR.exe")
            
        elif 'zoom' in command:
            os.system("TASKKILL /F /im Zoom.exe")
            
        elif 'githubdesktop' in command or 'desktop' in command:
            os.system("TASKKILL /F /im GitHubDesktop.exe")

        else:
            speak("Sorry sir! No apps found!!")
            flag = 0

        if flag:
            speak(f"Sir, {command} has closed.")

    except:
        speak("Sir, Either path of file is wrong or this application is not open in your system !")


# Dismiss all the apps in one go
def dismissAllApps():
    os.system('cls')

    speak(f"Ok sir, Closing all apps...")
    
    try:
        os.system("TASKKILL /F /im Code.exe")
        os.system("TASKKILL /F /im Telegram.exe")
        os.system("TASKKILL /F /im Whatsapp.exe")
        os.system("TASKKILL /F /im brave.exe")
        os.system("TASKKILL /F /im firefox.exe")
        os.system("TASKKILL /F /im IDMan.exe")
        os.system("TASKKILL /F /im msedge.exe")
        os.system("TASKKILL /F /im WINWORD.exe")
        os.system("TASKKILL /F /im EXCEL.exe")
        os.system("TASKKILL /F /im POWERPNT.exe")
        os.system("TASKKILL /F /im ONENOTE.exe")
        os.system("TASKKILL /F /im lync.exe")
        os.system("TASKKILL /F /im TeamViewer.exe")
        os.system("TASKKILL /F /im WinRAR.exe")
        os.system("TASKKILL /F /im Zoom.exe")
        os.system("TASKKILL /F /im GitHubDesktop.exe")

    except:
        speak("Sir, Either path of file is wrong or this application is not open in your system !")


# Function explaining about yourself
def introduceYourSelf():
    speak('''Sir, I am Automated degined program on the basis of Artificial Intelligence.
    I can automate the windows installed applications.
    I can open or close any apps installed on your system as per your choice.''')

# Function take command / operation from the user to perform
def userCommand():
    os.system('cls')

    # Taking the task as input which action user wants to perform
    print('''
#########################################  Welcome to Open & Close Apps Automation  #########################################
######################################            Made by Avdhesh Varshney            #######################################
###############################             (https://github.com/Avdhesh-Varshney)             ###############################\n
\t\t\t\t\t\t1. Open any app
\t\t\t\t\t\t2. Close any app
\t\t\t\t\t\t3. Dismiss all the apps

Say "wait" to pause the program for 30 seconds !
To close or exit the program, just say "exit" program will terminated.''')
    sleep(1)
    speak("Sir, What's the task ? ")

    command = takeCommand()
    return command


# Function which trigger to both functions [open, close]
def Commandar():
    while True:
        command = userCommand()

        if 'introduce' in command or 'introduction' in command or 'about' in command:
            introduceYourSelf()
            sleep(3)

        elif 'open' in command:
            OpenApps(command)
            sleep(3)
        
        elif 'close' in command or 'dismiss' in command:
            CloseApps(command)
            sleep(3)


# Driver function
Commandar()

