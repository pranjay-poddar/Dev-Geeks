import face_recognition
import cv2
import numpy as np
import pyautogui
from selenium import webdriver
import time
import os


gmail = "ENTER GMAIL HERE"
password = "ENTER PASSWORD HERE"

video_capture = cv2.VideoCapture(0)

root_image = face_recognition.load_image_file("YOUR PHOTO PATH")
root_encoding = face_recognition.face_encodings(root_image)[0]


known_face_encodings = [
    root_encoding,
]
known_face_names = [
    "YOUR NAME",
]

while True:
    ret, frame = video_capture.read()

    rgb_frame = frame[:, :, ::-1]

    face_locations = face_recognition.face_locations(rgb_frame)
    face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)
    name = "Unknown"

    for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
        # See if the face is a match for the known face(s)
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding)

        face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
        best_match_index = np.argmin(face_distances)
        if matches[best_match_index]:
            name = known_face_names[best_match_index]

        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

        cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)
    if name != "YOUR NAME":
        driver = webdriver.Chrome(executable_path="CHROME DRIVER PATH")
        driver.get("https://www.google.com/android/find")
        time.sleep(2)
        pyautogui.typewrite(gmail)
        pyautogui.press("enter")
        time.sleep(2)
        pyautogui.typewrite(password)
        pyautogui.press("enter")
        time.sleep(5)
        pyautogui.click(x=85,y=231)
        time.sleep(2)
        pyautogui.click(x=200,y=495)
        pyautogui.hotkey('ctrlleft', 'altleft', 'l')

    else:
        print("Welcome BOSS")
        os.system("gnome-terminal")

    # Display the resulting image
    cv2.imshow('Video', frame)


# Release handle to the webcam
video_capture.release()
cv2.destroyAllWindows()
