import tkinter as tk
from tkinter import filedialog
import tkinter.font as tkFont
import moviepy.editor as mp


def convert():
    x = entry_a.get()
    y = entry_b.get()

    if not x:
        status.config(text="Please select an input file.", fg="red")
    elif not y:
        status.config(text="Please select an output file.", fg="red")
    else:
        try:
            video_clip = mp.VideoFileClip(x)
            video_clip.write_gif(y)
            status.config(text="Conversion successful!", fg="green")
        except Exception as e:
            status.config(text="Error: " + str(e), fg="red")


def select_input():
    x = filedialog.askopenfilename(filetypes=[("MP4 files", "*.mp4")])
    if x:
        entry_a.delete(0, tk.END)
        entry_a.insert(0, x)


def select_output():
    y = filedialog.asksaveasfilename(defaultextension=".gif", filetypes=[("GIF files", "*.gif")])
    if y:
        entry_b.delete(0, tk.END)
        entry_b.insert(0, y)


app = tk.Tk()
app.title("MP4 to GIF Converter")
app.geometry("500x250")
app.configure(bg="#f0f0f0")

# Setting Segoe UI font
font_a = tkFont.Font(family="Segoe UI", size=11)

label_title = tk.Label(app, text="MP4 to GIF Converter", font=(font_a, 20), bg="#f0f0f0")
label_title.pack(pady=10)

label_a = tk.Label(app, text="Input MP4 file:", font=font_a, bg="#f0f0f0")
label_a.pack()

entry_a = tk.Entry(app, width=50, font=font_a)
entry_a.pack(pady=5)

button_a = tk.Button(app, text="Select File", command=select_input, font=font_a, bg="#0078d4", fg="white")
button_a.pack()

label_b = tk.Label(app, text="Output GIF file:", font=font_a, bg="#f0f0f0")
label_b.pack()

entry_b = tk.Entry(app, width=50, font=font_a)
entry_b.pack(pady=5)

button_b = tk.Button(app, text="Select File", command=select_output, font=font_a, bg="#0078d4", fg="white")
button_b.pack()

button_convert = tk.Button(app, text="Convert to GIF", command=convert, font=(font_a, 12), bg="#0078d4", fg="white")
button_convert.pack(pady=10)

status = tk.Label(app, text="", font=font_a, fg="green", bg="#f0f0f0")
status.pack()

app.mainloop()
