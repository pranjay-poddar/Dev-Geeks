import cv2

cap = cv2.VideoCapture(0)

fourcc = cv2.VideoWriter_fourcc(*'XVID')  
out = cv2.VideoWriter('output.avi',fourcc, 20.0, (640,480))  

def make_1080p():
    cap.set(3, 1920)
    cap.set(4, 1080)

def make_720p():
    cap.set(3, 1280)
    cap.set(4, 720)

def make_480p():
    cap.set(3, 640)
    cap.set(4, 480)

def change_res(width, height):
    cap.set(3, width)
    cap.set(4, height)

def rescale_frame(frame, percent=75):
    width = int(frame.shape[1] * percent/ 100)
    height = int(frame.shape[0] * percent/ 100)
    dim = (width, height)
    return cv2.resize(frame, dim, interpolation =cv2.INTER_AREA)

print('Choose the relevant video resolution option which you want your video to be converted into :\n')
print('\t1 - 1080p')   
print('\t2 - 720p') 
print('\t3 - 480p') 
print('\t4 - custom') 
print('\nEnter your choice :')
n = int(input())

if n>4 or n<1:
  print('Wrong choice! Please enter between 1 to 4 next time')
  exit()
elif n == 1:
  make_1080p()
elif n == 2:
  make_720p()
elif n == 3:
  make_480p()
elif n == 4:
  print('Enter custom width in pixels :')
  width = int(input())
  print('Enter custom height in pixels :')
  height = int(input())
  change_res(width,height)

while(True):
  rect, frame = cap.read()
  out.write(frame)  
  cv2.imshow('frame',frame)  
  if cv2.waitKey(1) & 0xFF == ord('q'): 
    break  
  



cap.release()  
out.release()  
cv2.destroyAllWindows()
  
  
