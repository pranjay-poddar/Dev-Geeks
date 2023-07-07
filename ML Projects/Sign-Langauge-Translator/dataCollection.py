import cv2
from cvzone.HandTrackingModule import HandDetector
import numpy as np
#for a matrix we create when the image is not square
import math
import time

cap = cv2.VideoCapture(0)
detector = HandDetector(maxHands=1)

#offset will make it little big bigger while tracking
offset = 20
imgSize = 300

folder = "data/ACROPOLIS"
counter = 0

while True:
    success, img = cap.read()
    hands, img = detector.findHands(img)
    if hands:
        hand = hands[0]
        x, y, w, h = hand['bbox']
        #uint - unsigned int
        imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255
        #255 for having color image
        imgCrop = img[y - offset:y + h + offset, x - offset:x + w + offset]

        imgCropShape = imgCrop.shape

        aspectRatio = h / w
        # below for fixing height
        if aspectRatio > 1:
            k = imgSize / h
            # calculated width
            # if decimal then ceil(always higher)
            wCal = math.ceil(k * w)
            #calculated width (by changing the image dimension parameter)
            #at that point we have both height and calculated width
            imgResize = cv2.resize(imgCrop, (wCal, imgSize))
            #resizing the image to very specific value that is calculated idth and image size

            imgResizeShape = imgResize.shape

            #challange->making image centric
            #imgsize->300 wCsl->150 then wGap = 75 and 75
            #we are left with the both left and right
            wGap = math.ceil((imgSize - wCal) / 2)
            #pushing forward the image by wGap
            imgWhite[:, wGap:wCal + wGap] = imgResize

        # below for fixing width
        else:
            k = imgSize / w
            hCal = math.ceil(k * h)
            if (type(imgResize) == type(None)):
                pass
            else:
                imgResize = cv2.resize(imgCrop, (imgSize, hCal))
            #imgResize = cv2.resize(imgCrop, (imgSize, hCal))
            imgResizeShape = imgResize.shape
            hGap = math.ceil((imgSize - hCal) / 2)
            imgWhite[hGap:hCal + hGap, :] = imgResize

        cv2.imshow("ImageCrop", imgCrop)
        cv2.imshow("ImageWhite", imgWhite)

    cv2.imshow("Image", img)
    key = cv2.waitKey(1)
    if key == ord("s"):
        counter += 1
        cv2.imwrite(f'{folder}/Image_{time.time()}.jpg', imgWhite)
        print(counter)
