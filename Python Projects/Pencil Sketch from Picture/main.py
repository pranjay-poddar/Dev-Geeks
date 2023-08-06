import cv2
import numpy as np

kernal=np.ones((5,5),np.uint8)
img = cv2.imread("image.jpg")

imgGray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
img_neg=cv2.bitwise_not(imgGray)

imgBlur = cv2.GaussianBlur(img_neg,(7,7),0)
imgBlend = cv2.divide(imgGray, imgBlur, scale=256)

cv2.imshow("imgBlend",imgBlend)
cv2.waitKey(0)
