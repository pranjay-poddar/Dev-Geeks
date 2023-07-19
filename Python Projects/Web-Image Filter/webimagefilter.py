import urllib.request as ul
import numpy as np
import cv2
import random

def exponential_function(channel, exp):
    table = np.array([min((i**exp), 255) for i in np.arange(0, 256)]).astype("uint8")
    channel = cv2.LUT(channel, table)
    return channel

def tone(img, number):
    for i in range(3):
        if i == number:
            img[:, :, i] = exponential_function(img[:, :, i], 1.05)
        else:
            img[:, :, i] = 0 
    return img

def hsv(img, l, u):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    lower = np.array([l,128,128]) # setting lower HSV value
    upper = np.array([u,255,255]) # setting upper HSV value
    mask = cv2.inRange(hsv, lower, upper) # generating mask
    return mask    

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



print('Select a filter option from below : \n 1 - Sepia\n 2 - Grayscale\n 3 - Blur\n 4 - Gaussian blur\n 5 - Duo Tone\n 6 - Pencil Sketch\n 7 - Colored Sketch\n 8 - Cartoon(light)\n 9 - Cartoon(dark)\n 10 - Emboss\n 11 - Splash\n 12 - Canny  ')
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

elif n == 4:
  print('Original Image : \n')
  cv2.imshow(image)
  print('\n')
  Gaussian = cv2.GaussianBlur(image, (7, 7), 0)
  print('Gaussian Blur: \n')
  cv2.imshow(Gaussian)

elif n == 5:
  print('Original Image : \n')
  cv2.imshow(image)
  print('\n')
  print('Duo Tone : \n')
  nimg = tone(image,1)
  cv2.imshow(nimg)

elif n == 6:
  print('Original Image : \n')
  cv2.imshow(image)
  print('\n')
  dst_gray, dst_color = cv2.pencilSketch(image, sigma_s=60, sigma_r=0.07, shade_factor=0.05)
  print('Pencil Shade:\n')
  cv2.imshow(dst_gray)

elif n == 7:
  print('Original Image : \n')
  cv2.imshow(image)
  print('\n')
  dst_gray, dst_color = cv2.pencilSketch(image, sigma_s=60, sigma_r=0.07, shade_factor=0.05)
  print('Colored Shade:\n')
  cv2.imshow(dst_color) 

elif n == 8: 
  print('Original Image : \n')
  cv2.imshow(image)
  print('\n')
  print('Cartoon(light):\n')
  img = image
  edges1 = cv2.bitwise_not(cv2.Canny(img, 100, 200)) # for thin edges and inverting the mask obatined
  gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
  gray = cv2.medianBlur(gray, 5) # applying median blur with kernel size of 5
  edges2 = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 7, 7) # thick edges
  dst = cv2.edgePreservingFilter(img, flags=2, sigma_s=64, sigma_r=0.25) # you can also use bilateral filter but that is slow
  cartoon1 = cv2.bitwise_and(dst, dst, mask=edges1) # adding thin edges to smoothened image
  cv2.imshow(cartoon1)

elif n == 9:  
  print('Original Image : \n')
  cv2.imshow(image)
  print('\n')
  print('Cartoon(dark):\n')
  img = image
  edges1 = cv2.bitwise_not(cv2.Canny(img, 100, 200)) # for thin edges and inverting the mask obatined
  gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
  gray = cv2.medianBlur(gray, 5) # applying median blur with kernel size of 5
  edges2 = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 7, 7) # thick edges
  dst = cv2.edgePreservingFilter(img, flags=2, sigma_s=64, sigma_r=0.25) # you can also use bilateral filter but that is slow
  cartoon2 = cv2.bitwise_and(dst, dst, mask=edges2) # adding thick edges to smoothened image
  cv2.imshow(cartoon2)

elif n == 10:  
  print('Original Image : \n')
  cv2.imshow(image)
  print('\n')
  print('Emboss Filter:\n')
  img = image
  height, width = img.shape[:2]
  y = np.ones((height, width), np.uint8) * 128
  output = np.zeros((height, width), np.uint8)
  kernel1 = np.array([[0, -1, -1], # kernel for embossing bottom left side
                      [1, 0, -1],
                      [1, 1, 0]])
  kernel2 = np.array([[-1, -1, 0], # kernel for embossing bottom right side
                      [-1, 0, 1],
                      [0, 1, 1]])
  gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
  output1 = cv2.add(cv2.filter2D(gray, -1, kernel1), y) # emboss on bottom left side
  output2 = cv2.add(cv2.filter2D(gray, -1, kernel2), y) # emboss on bottom right side
  for i in range(height):

    for j in range(width):
        output[i, j] = max(output1[i, j], output2[i, j]) # combining both embosses to produce stronger emboss
  cv2.imshow(output)

elif n == 11:
  print('Original Image : \n')
  cv2.imshow(image)
  print('\n')
  img = image
  res = np.zeros(img.shape, np.uint8) # creating blank mask for result
  l = 15 # the lower range of Hue we want
  u = 30 # the upper range of Hue we want
  mask = hsv(img, l, u)
  inv_mask = cv2.bitwise_not(mask) # inverting mask
  gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
  res1 = cv2.bitwise_and(img, img, mask= mask) # region which has to be in color
  res2 = cv2.bitwise_and(gray, gray, mask= inv_mask) # region which has to be in grayscale
  for i in range(3):
    res[:, :, i] = res2 # storing grayscale mask to all three slices
  img = cv2.bitwise_or(res1, res) # joining grayscale and color region
  cv2.imshow(img)  

elif n == 12: 
  print('Original Image : \n')
  cv2.imshow(image)
  print('\n')
  img = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
  edge = cv2.Canny(image,100,200)
  cv2.imshow(edge)     




status = cv2.imwrite('/home/img/resultimg.png',image)
print('File save status : ', status)
