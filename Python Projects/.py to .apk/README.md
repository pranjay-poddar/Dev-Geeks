# .py to .apk 
In this project we convert a .py file to .apk file using kivy module and python.

## :point_right: Kivy Module
Kivy is a graphical user interface opensource Python library that allows you to develop multi-platform applications on Windows, macOS, Android, iOS, Linux, and Raspberry-Pi. 

##  Steps 

### :point_right: First you have to install kivy using your terminal

*run this commands in your terminal.

```

pip install --force-reinstall https://github.com/kivymd/KivyMD/archive/master.zip

pip install kivymd

```

### :point_right: Then create your main.py file

### :point_right: Then open Google Colab from your browser and create a new notebook
##### Use this link to [Google Colab](https://colab.research.google.com/) 

### :point_right: Now in the notebook you have to run these following codes

```
 !pip install buildozer
 
 !pip install cython==0.29.19
 
! sudo apt-get install -y \
  python3-pip \
  build-essential \
  git \
  python3 \
  python3-dev \
  ffmpeg \
  libsdl2-dev \
  libsdl2-image-dev \
  libsdl2-mixer-dev \
  libsdl2-ttf-dev \
  libportmidi-dev \
  libswscale-dev \
  libavformat-dev \
  libavcodec-dev \
  zlib1g-dev
  
! sudo apt-get install -y \
     libgstreamer1.0 \
     gstreamer1.0-plugins-base \
     gstreamer1.0-plugins-good
     
! sudo apt-get install build-essential libsqlite3-dev sqlite3 bzip2 libbz2-dev zlib1g-dev libssl-dev openssl libgdbm-dev libgdbm-compat-dev liblzma-dev libreadline-dev libncursesw5-dev libffi-dev uuid-dev libffi6

! sudo apt-get install libffi-dev

```

### :point_right: upload your main.py and all raw data of your app into Google colab by using upload files,then run other commands
```
!buildozer init
```
Choose Yes if prompts

see that a buildozer.spec file created

open that file and find application requirement section and add the following changes 

[kivy==2.0.0,kivymd,pillow]

### :point_right: Now run the following commands
```
!buildozer -v android debug
```
it takes some time to run and after completion you get the .apk file in bin folder.

So now you can download it and send it into your android device and install it.

## Great! you did it :grinning:.



