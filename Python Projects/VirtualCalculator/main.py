import cv2
from cvzone.HandTrackingModule import HandDetector

# Webcam
cap = cv2.VideoCapture(1)

# Loop
while True:
    # Get Image from the webcam
    success, img = cap.read()
    img = cv2.flip(img, 1)

    # Display Image
    cv2.imshow("Image", img)
    cv2.waitKey(1)
