from tkinter import *

# ---------------------------- CONSTANTS ------------------------------- #
PINK = "#e2979c"
RED = "#e7305b"
GREEN = "#9bdeac"
YELLOW = "#f7f5dd"
FONT_NAME = "Courier"
WORK_MIN = 25
SHORT_BREAK_MIN = 5
LONG_BREAK_MIN = 20
reps = 0
timer = None


# ---------------------------- TIMER RESET ------------------------------- #
def reset_timer():
    window.after_cancel(timer)
    label_time.config(text="TIMER", font=(FONT_NAME, 28, "bold"), fg=GREEN, bg=YELLOW)
    canvas.itemconfig(timer_text, text="00:00")
    label_check.config(text="")
    global reps
    reps=0


# ---------------------------- TIMER MECHANISM ------------------------------- #

def start_timer():
    global reps
    reps += 1
    work_min_sec = WORK_MIN * 60
    short_break_min = SHORT_BREAK_MIN * 60
    long_min_break = LONG_BREAK_MIN * 60
    if (reps % 8 ==0 ):
        count_down(long_min_break)
        label_time.config(text="LONG BREAK",  fg=RED, bg=YELLOW)

    elif(reps % 2 ==0):
        count_down(short_break_min)
        label_time.config(text="SHORT BREAK",  fg=PINK, bg=YELLOW)

    else:
        count_down(work_min_sec)
        label_time.config(text="WORK", fg=GREEN, bg=YELLOW)



    # count_down(20)


# ---------------------------- COUNTDOWN MECHANISM ------------------------------- #
def count_down(count):
    count_min = count // 60
    count_sec = count % 60
    if count_sec < 10:
        count_sec = f"0{count_sec}"
    canvas.itemconfig(timer_text, text=f"{count_min}:{count_sec}")
    if (count > 0):
        global timer
        timer = window.after(1000, count_down, count - 1)

    else:
        start_timer()
        global reps
        for _ in range(reps//2):
            label_check.config(text="✔")





# ---------------------------- UI SETUP ------------------------------- #
window = Tk()
window.title("Pomodoro")
window.config(padx=100, pady=50, bg=YELLOW)
label_time = Label(text="TIMER", font=(FONT_NAME, 28, "bold"), fg=GREEN, bg=YELLOW)
label_time.grid(column=1, row=0)

button_start = Button(text="START", command=start_timer, font=(FONT_NAME, 12, "normal"), bg=YELLOW)
button_start.grid(column=0, row=2)

button_stop = Button(text="RESET", command= reset_timer ,font=(FONT_NAME, 12, "normal"), bg=YELLOW)
button_stop.grid(column=2, row=2)

label_check = Label( font=(FONT_NAME, 12, "normal"), bg=YELLOW, fg=GREEN)
label_check.grid(column=1, row=3)

# Canvas
canvas = Canvas(width=200, height=224, bg=YELLOW, highlightthickness=0)
image_ = PhotoImage(file="tomato.png")
canvas.create_image(100, 112, image=image_)
timer_text = canvas.create_text(100, 130, text="00:00", fill="Black", font=(FONT_NAME, 30, "bold"))
canvas.grid(column=1, row=1)

window.mainloop()
