import tkinter as tk
import time

class Stopwatch:
    def __init__(self, root):
        self.root = root
        self.root.title("Stopwatch")

        self.is_running = False
        self.start_time = 0.0
        self.elapsed_time = 0.0

        self.time_label = tk.Label(root, text="00:00:00", font=("Helvetica", 48))
        self.time_label.pack()

        self.start_button = tk.Button(root, text="Start", command=self.start)
        self.start_button.pack(side=tk.LEFT)

        self.stop_button = tk.Button(root, text="Stop", command=self.stop)
        self.stop_button.pack(side=tk.LEFT)

        self.reset_button = tk.Button(root, text="Reset", command=self.reset)
        self.reset_button.pack(side=tk.LEFT)

        self.pause_button = tk.Button(root, text="Pause", command=self.pause)
        self.pause_button.pack(side=tk.LEFT)

        self.resume_button = tk.Button(root, text="Resume", command=self.resume)
        self.resume_button.pack(side=tk.LEFT)

        self.pause_time = 0.0
        self.is_paused = False

    def start(self):
        if not self.is_running:
            if self.is_paused:
                self.start_time = time.time() - self.pause_time
            else:
                self.start_time = time.time()
            self.is_running = True
            self.is_paused = False
            self.update()

    def stop(self):
        if self.is_running:
            self.is_running = False
            if not self.is_paused:
                self.elapsed_time += time.time() - self.start_time

    def reset(self):
        self.is_running = False
        self.start_time = 0.0
        self.elapsed_time = 0.0
        self.is_paused = False
        self.update()

    def pause(self):
        if self.is_running and not self.is_paused:
            self.is_paused = True
            self.pause_time = time.time() - self.start_time

    def resume(self):
        if self.is_paused:
            self.is_paused = False
            self.start()
            
    #The update() method calculates the elapsed time and updates the label with the formatted time. 
    def update(self):
        if self.is_running and not self.is_paused:
            self.elapsed_time = time.time() - self.start_time

        minutes = int(self.elapsed_time // 60)
        seconds = int(self.elapsed_time % 60)
        milliseconds = int((self.elapsed_time % 1) * 1000)

        time_str = f"{minutes:02d}:{seconds:02d}:{milliseconds:03d}"
        self.time_label.configure(text=time_str)
        
        #root.after(50, self.update) to ensure the label is continuously updated
        self.root.after(50, self.update)

root = tk.Tk()
stopwatch = Stopwatch(root)
root.mainloop()
