import tkinter as tk
from PIL import ImageTk,Image

import vehicle_detection as vhd


class gui(object):
    def __init__(self):
        self.vehicle_det_obj = None
        self.selectClip = None
        self.skip_steps = None
        self.cutoff = None
        self.threshold_lower = None
        self.threshold_middle = None
        self.threshold_higher = None
        self.replicate = None
        self.default_thresholds = [[[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12], [13, 14, 15]],
                                  [[16, 17, 18], [19, 20, 21], [22, 23, 24], [25, 26, 27], [28, 29, 30]]]

    def startDetection(self):
        self.vehicle_det_obj.runner()


    def config(self):
        self.vehicle_det_obj = vhd.vehicle_detection(STREAM_URL="./data/{clip}.mp4".format(clip=self.selectClip.get()),
                                                     skip_steps=self.skip_steps.get(),
                                                     replicate=self.replicate.get(),
                                                     cutoff=self.cutoff.get(),
                                                     thresh_low=self.threshold_lower.get(),
                                                     thresh_mid=self.threshold_middle.get(),
                                                     thresh_high=self.threshold_higher.get()
                                                     )
        self.vehicle_det_obj.configure(True)


    def runGui(self):

        window=tk.Tk(className='Vehicle Counter')
        rw = 0

        filename1 = ImageTk.PhotoImage(Image.open("images/1.JPG"))
        clip_1 = tk.Label(image = filename1)
        clip_1.grid(row=rw, column=1)

        filename2 = ImageTk.PhotoImage(Image.open("images/2.JPG"))
        clip_2 = tk.Label(image=filename2)
        clip_2.grid(row=rw, column=2)

        filename3 = ImageTk.PhotoImage(Image.open("images/3.JPG"))
        clip_3 = tk.Label(image=filename3)
        clip_3.grid(row=rw, column=3)

        filename4 = ImageTk.PhotoImage(Image.open("images/4.JPG"))
        clip_6 = tk.Label(image=filename4)
        clip_6.grid(row=rw, column=4)

        filename5 = ImageTk.PhotoImage(Image.open("images/5.JPG"))
        clip_7 = tk.Label(image=filename5)
        clip_7.grid(row=rw, column=5)
        rw+=1

        tk.Label(text='Clip Selection : ').grid(row=rw, column=0)
        self.selectClip = tk.IntVar()

        tk.Radiobutton(window, text='Clip 1' , variable=self.selectClip, value=1).grid(row=rw,column = 1)
        tk.Radiobutton(window, text='Clip 2' , variable=self.selectClip, value=2).grid(row=rw,column = 2)
        tk.Radiobutton(window, text='Clip 3' , variable=self.selectClip, value=3).grid(row=rw,column = 3)
        tk.Radiobutton(window, text='Clip 4' , variable=self.selectClip, value=4).grid(row=rw,column = 4)
        tk.Radiobutton(window, text='Clip 5' , variable=self.selectClip, value=5).grid(row=rw,column = 5)
        rw+=1

        tk.Label(text='Skip Steps : ').grid(row=rw,column = 0)
        skip_steps = tk.Scale(window, from_=1, to=15, orient=tk.HORIZONTAL,length= 180)
        skip_steps.grid(row=rw,column = 1)
        self.skip_steps = skip_steps
        rw+=1

        tk.Label(text='Cutoff : ').grid(row=rw,column = 0)
        self.cutoff= tk.Scale(window, from_=2000, to=10000, orient=tk.HORIZONTAL,resolution = 500,length= 180 )
        self.cutoff.grid(row=rw,column = 1)

        self.replicate = tk.BooleanVar()
        tk.Radiobutton(window, text='Paper Implementation' , variable=self.replicate, value=True).grid(row=rw,column = 3)
        tk.Radiobutton(window, text='Improved Version', variable=self.replicate, value=False).grid(row=rw, column=4)
        rw+=1

        tk.Label(text='Lower Threshold : ').grid(row=rw, column=0)
        self.threshold_lower = tk.Scale(window, from_=10000, to=50000, orient=tk.HORIZONTAL,resolution = 5000,length= 180)  # Steps of 5000
        self.threshold_lower.grid(row=rw, column=1)

        configButton = tk.Button(window, activebackground='#0f0', text='Config', width=25,
                                 command=self.config)
        configButton.grid(row=rw, column=3)
        rw += 1

        tk.Label(text='Middle Threshold : ').grid(row=rw, column=0)
        self.threshold_middle = tk.Scale(window, from_=35000, to=80000, orient=tk.HORIZONTAL, resolution = 5000,length= 180)  # Steps of 5000
        self.threshold_middle.grid(row=rw, column=1)
        startButton = tk.Button(window, activebackground='#0f0', text='Start', width=25,
                                command=self.startDetection)
        startButton.grid(row=rw, column=3)
        rw += 1
        tk.Label(text='Higher Threshold : ').grid(row=rw, column=0)
        self.threshold_higher = tk.Scale(window, from_=60000, to=100000, orient=tk.HORIZONTAL, resolution = 5000,length= 180)
        self.threshold_higher.grid(row=rw, column=1)
        rw += 1

        window.mainloop()


if __name__ == "__main__":
    gui_obj = gui()
    gui_obj.runGui()
