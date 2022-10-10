import pywhatkit as kit
import cv2


with open('dummy.txt') as f:
    contents = f.read()
print(contents)
kit.text_to_handwriting(contents, save_to="handwriting.png")
img = cv2.imread("handwriting.png")
cv2.imshow("Text to Handwriting", img)
cv2.waitKey(0)
cv2.destroyAllWindows()