import pyspeedtest
import tkinter as tk
import threading

# Function to perform speed test
def speed_test():
    internet = pyspeedtest.SpeedTest(url_entry.get())
    final_ping = 0
    final_download = 0
    
    # performing speed test of ping three times
    for _ in range(3):
        final_ping = final_ping + internet.ping()
    
    # taking the average of ping result
    final_ping = final_ping/3

    # performing speed test of download three times
    for _ in range(3):
        final_download = final_download + internet.download()
    
    # taking the average of ping result
    final_download = final_download/3

    ping_speed.set(final_ping)
    down_speed.set(final_download)

# using multithreading that targets to the function speed_test and enhances the speed
def run_speed_test():
    threading.Thread(target=speed_test).start()


def create_label(root, row, column, text, font='Arial 14 bold', fg='white', bg='black'):
    label = tk.Label(root, text=text, font=font, fg=fg, bg=bg)
    label.grid(row=row, column=column, pady=10)
    return label

# Create Tkinter application
app = tk.Tk()
app.configure(background="greenyellow")
app.geometry("750x350")
app.title("Internet Speed Checker App - Jyotsana")

# Define StringVars to hold the speed values
ping_speed = tk.StringVar()
down_speed = tk.StringVar()

# Create labels
heading_text = create_label(app, 0, 1, "Welcome To Internet Speed Checker - Jyotsana", 'Arial 16 bold', 'yellow', 'black')
web_url = create_label(app, 1, 0, "Enter Web URL")
ping_result = create_label(app, 3, 0, "Ping Result", bg='red')
download_result = create_label(app, 4, 0, "Download Result", bg='purple')

# Create result labels
result1 = create_label(app, 3, 1, "", font='Arial 14', fg='white', bg='black')
result1.config(textvariable=ping_speed)
result2 = create_label(app, 4, 1, "", font='Arial 14', fg='yellow', bg='black')
result2.config(textvariable=down_speed)

# Create entry for URL
url_entry = tk.Entry(app, width=25, font='Arial 14 bold')
url_entry.grid(row=1, column=1, pady=10)

# Create button to trigger speed test
btn = tk.Button(app, text="Check Speed here", font='Arial 14', fg='black', bg='aqua', border=5, command=run_speed_test)
btn.grid(row=2, column=1, pady=10)

# Start the Tkinter event loop
app.mainloop()
