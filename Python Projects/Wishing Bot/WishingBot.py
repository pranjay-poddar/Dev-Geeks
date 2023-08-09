import time
from random import randint
import pygame
import threading
import sys
import os

pygame.init()
emojis = ['😃', '🐻‍❄️', '🐏', '🌲', '🎆', '❤️', '⛄', '🎮', '🔊', '⚙️', '😍', '😴', '🤑', '💀', '👻', '👽', '🐭', '🐸', '🐢', '🐬', '🧟', '🥷', '🎈', '🎉', '😷', '🕸️', '🎯', '🔒', '🔑', '🧲', '☎️', '🏧', '⏰', '🧭', '🏚️', '☢️', '📵', '🚓']

pygame.mixer.init()

# Fetching songs from the given directory
musicDir = './Wishing Bot'
songs = os.listdir(musicDir)

# Global variable to control emoji printing
print_emojis = True

# emojis printing function
def playEmojis():
    global print_emojis
    for i in range(1, 85):
        print('')
    space = ''

    l = len(emojis)
    i = 0
    while pygame.mixer.music.get_busy() and print_emojis:
        count = randint(1, 100)
        while count > 0:
            space += ' '
            count -= 1

        if i % 10 == 0:
            print(space + songs[id][:-4] + emojis[0])
        else:
            print(space + emojis[i % l])

        space = ''
        i = i + 1
        time.sleep(0.2)

# function handle the playing song
def playSong():
    pygame.mixer.music.load(os.path.join(musicDir, songs[id]))
    pygame.mixer.music.play()

    # Wait for the song to finish playing
    while pygame.mixer.music.get_busy():
        time.sleep(1)

    # Song has finished playing, stop the printing function
    thread1.join()

# Start the bot
def wishingBot():
    print("Available occasions:")
    for i, song in enumerate(songs):
        print(f"[{i}] - {song[:-4]}")
    occasion_name = input("\nEnter the name of the occasion - ")
    if occasion_name not in [song[:-4] for song in songs]:
        print("Invalid occasion name. Please choose a valid occasion.")
        return
    id = [song[:-4] for song in songs].index(occasion_name)

    thread1 = threading.Thread(target=playEmojis)
    thread2 = threading.Thread(target=playSong)

    # Start threads
    thread1.start()
    thread2.start()

    while thread2.is_alive():
        user_input = input("Type 'pause' to pause emojis or 'resume' to resume: ")
        if user_input.lower() == "pause":
            pauseEmojis()
        elif user_input.lower() == "resume":
            resumeEmojis()

    # Exit the program
    sys.exit()

# Add a function to pause emoji printing
def pauseEmojis():
    global print_emojis
    print_emojis = False

# Add a function to resume emoji printing
def resumeEmojis():
    global print_emojis
    print_emojis = True

# Start the bot
wishingBot()