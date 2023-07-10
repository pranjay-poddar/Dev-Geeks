import urllib.request as ul
import numpy as np
import cv2
import random

print('Welcome to Image Filter program!')
print('Note: This program is made solely for the images over the network, which are non-restricted for use.')

print('Please enter the url of the iamge filter : ')

url = input()
resp = ul.urlopen(url)
if resp is None:
    print('Could not read image')
    exit()
imagee = np.asarray(bytearray(resp.read()), dtype="uint8")
image = cv2.imdecode(imagee, cv2.IMREAD_COLOR)



print('Select a filter option from below : \n 1 - Sepia\n 2 - Grayscale\n 3 - Orange ')
print('Enter the number associated with a particular filter :')
n = int(input())

if n == 1:
  print('Original Image : \n')
  cv2.imshow(image)
  print('\n')
  gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
  normalized_gray = np.array(gray, np.float32)/255
  sepia = np.ones(image.shape)
  sepia[:,:,0] *= 153 #B
  sepia[:,:,1] *= 204 #G
  sepia[:,:,2] *= 255 #R
  sepia[:,:,0] *= normalized_gray #B
  sepia[:,:,1] *= normalized_gray #G
  sepia[:,:,2] *= normalized_gray #R
  image_2 = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
  print('Sepia filter: \n')
  cv2.imshow(image_2)

elif n == 2:
  print('Original Image : \n')
  cv2.imshow(image)
  print('\n')

  image_2 = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
  print('Grayscale filter: \n')
  cv2.imshow(image_2)

elif n == 3:
  print('Original Image : \n')
  cv2.imshow(image)
  print('\n')
  gausBlur = cv2.blur(image, (10,10))
  print('Blur filter: \n')
  cv2.imshow(gausBlur)

status = cv2.imwrite('/home/img/resultimg.png',image)
print('File save status : ', status)
