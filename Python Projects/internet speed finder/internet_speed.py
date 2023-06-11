import pyspeedtest
from tkinter import *

# Create Tkinter application
app = Tk()
app.configure(background="greenyellow")
app.geometry("750x350")
app.resizable(0, 0)
app.title("Internet Speed Checker App")

# Define StringVars to hold the speed values
ping_speed = StringVar()
down_speed = StringVar()

# Create labels
heading_text = Label(app, text="Welcome To Internet Speed Checker", font='Arial 16 bold', fg='yellow', bg='black')
web_url = Label(app, text="Enter Web URL", font='Arial 14 bold', fg='white', bg='blue')
ping_result = Label(app, text="Ping Result", font='Arial 14 bold', fg='white', bg='red')
download_result = Label(app, text="Download Result", font='Arial 14 bold', fg='white', bg='purple')

# Grid placement for labels
heading_text.grid(row=0, column=1, pady=20)
web_url.grid(row=1, column=0, pady=10)
ping_result.grid(row=3, column=0, pady=10)
download_result.grid(row=4, column=0, pady=10)

# Create result labels with StringVar values
result1 = Label(app, text="", textvariable=ping_speed, font='Arial 14', fg='white', bg='black')
result1.grid(row=3, column=1)
result2 = Label(app, text="", textvariable=down_speed, font='Arial 14', fg='yellow', bg='black')
result2.grid(row=4, column=1)

# Create entry for URL
url_entry = Entry(app, width=25, font='Arial 14 bold')
url_entry.grid(row=1, column=1, pady=10)

# Function to perform speed test
def speed_test():
    internet = pyspeedtest.SpeedTest(url_entry.get())
    ping_speed.set(internet.ping())
    down_speed.set(internet.download())

# Create button to trigger speed test
btn = Button(app, text="Check Speed here", font='Arial 14', fg='black', bg='aqua', border=5, command=speed_test)
btn.grid(row=2, column=1, pady=10)

# Start the Tkinter event loop
app.mainloop()
