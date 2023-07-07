import cv2
from cvzone.HandTrackingModule import HandDetector
from cvzone.ClassificationModule import Classifier
import numpy as np
import math
import time
from easygui import *


def func():
    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
    detector = HandDetector(maxHands=1)
    classifier = Classifier("model/keras_model.h5", "model/labels.txt")

    offset = 20
    imgSize = 300

    folder = "data/C"
    counter = 0

    labels = ["A", "ACROPOLIS", "B", "C", "HELLO", "NO", "OKAY", "YES"]

    while True:
        success, img = cap.read()
        imgOutput = img.copy()
        hands, img = detector.findHands(img)
        if hands:
            hand = hands[0]
            x, y, w, h = hand['bbox']

            imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255
            imgCrop = img[y - offset:y + h + offset, x - offset:x + w + offset]

            imgCropShape = imgCrop.shape

            aspectRatio = h / w

            if aspectRatio > 1:
                k = imgSize / h
                wCal = math.ceil(k * w)
                imgResize = cv2.resize(imgCrop, (wCal, imgSize))
                imgResizeShape = imgResize.shape
                wGap = math.ceil((imgSize - wCal) / 2)
                imgWhite[:, wGap:wCal + wGap] = imgResize
                #below gives us the prediction and index
                #using index get the value from the lables (0-based index)
                #prediction for wGap images
                #draw=false because in test file we dont want to display the 21points
                prediction, index = classifier.getPrediction(imgWhite, draw=False)
                print(prediction, index)

            else:
                k = imgSize / w
                hCal = math.ceil(k * h)

                if (type(imgResize) == type(None)):
                    pass
                else:
                    imgResize = cv2.resize(imgCrop, (imgSize, hCal))
                # imgResize = cv2.resize(imgCrop, (imgSize, hCal))
                imgResizeShape = imgResize.shape
                hGap = math.ceil((imgSize - hCal) / 2)
                imgWhite[hGap:hCal + hGap, :] = imgResize
                #same prediction for hGap Images
                prediction, index = classifier.getPrediction(imgWhite, draw=False)

            cv2.rectangle(imgOutput, (x - offset, y - offset - 50), (x - offset + 90, y - offset - 50 + 50),
                          (62, 50, 168),
                          cv2.FILLED)
            #method used to draw a text on any image
            cv2.putText(imgOutput, labels[index], (x, y - 26), cv2.FONT_HERSHEY_COMPLEX, 1.7, (255, 255, 255), 2)
            cv2.rectangle(imgOutput, (x - offset, y - offset),
                          (x + w + offset, y + h + offset), (255, 0, 255), 4)

            cv2.imshow("ImageCrop", imgCrop)
            cv2.imshow("ImageWhite", imgWhite)

        cv2.imshow("Image", imgOutput)
        cv2.waitKey(1)


while 1:
    image = 'sample.png'
    msg = '                   PROJECT FOR SIGN LANGAUGE TRANSLATOR'
    choices = ['click to start', 'All done']
    reply = buttonbox(msg, image=image, choices=choices)
    if reply == choices[0]:
        func()

    if reply == choices[1]:
        quit()

        
