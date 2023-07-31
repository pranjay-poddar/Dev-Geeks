import cv2
import numpy as np 
import time
#import virttualmouse
from keys import *
from handTracker import *
from pynput.keyboard import Controller

def getMousPos(event , x, y, flags, param):
    global clickedX, clickedY
    global mouseX, mouseY
    if event == cv2.EVENT_LBUTTONUP:
        #print(x,y)
        clickedX, clickedY = x, y
    if event == cv2.EVENT_MOUSEMOVE:
    #     print(x,y)
        mouseX, mouseY = x, y

def calculateIntDidtance(pt1, pt2):
    return int(((pt1[0]-pt2[0])**2 + (pt1[1]-pt2[1])**2)**0.5)

# Creating keys
w,h = 80, 60
startX, startY = 40, 200
keys=[]
letters =list("QWERTYUIOPASDFGHJKLZXCVBNM")
for i,l in enumerate(letters):
    if i<10:
        keys.append(Key(startX + i*w + i*5, startY, w, h, l))
    elif i<19:
        keys.append(Key(startX + (i-10)*w + i*5, startY + h + 5,w,h,l))  
    else:
        keys.append(Key(startX + (i-19)*w + i*5, startY + 2*h + 10, w, h, l)) 

keys.append(Key(startX+25, startY+3*h+15, 5*w, h, "Space"))
keys.append(Key(startX+8*w + 50, startY+2*h+10, w, h, "clr"))
keys.append(Key(startX+5*w+30, startY+3*h+15, 5*w, h, "<--"))

showKey = Key(300,5,80,50, 'Show')
mouseKey = Key(300,65,80,50, 'mouse')
exitKey = Key(300,125,80,50, 'Exit')
textBox = Key(startX, startY-h-5, 10*w+9*5, h,'')

cap = cv2.VideoCapture(0)
ptime = 0

# initiating the hand tracker
tracker = HandTracker(detectionCon=0.8)

# getting frame's height and width
frameHeight, frameWidth, _ = cap.read()[1].shape
showKey.x = int(frameWidth*1.5) - 85
mouseKey.x = int(frameWidth*1.5) - 85
exitKey.x = int(frameWidth*1.5) - 85
#print(showKey.x)

clickedX, clickedY = 0, 0
mousX, mousY = 0, 0

show = False
cv2.namedWindow('video')
counter = 0
previousClick = 0

keyboard = Controller()
while True:
    if counter >0:
        counter -=1
        
    signTipX = 0
    signTipY = 0

    thumbTipX = 0
    thumbTipY = 0

    ret, frame = cap.read()
    if not ret:
        break
    frame = cv2.resize(frame,(int(frameWidth*1.5), int(frameHeight*1.5)))
    frame = cv2.flip(frame, 1)
    #find hands
    frame = tracker.findHands(frame)
    lmList = tracker.getPostion(frame, draw=False)
    if lmList:
        signTipX, signTipY = lmList[8][1], lmList[8][2]
        thumbTipX, thumbTipY = lmList[4][1], lmList[4][2]
        if calculateIntDidtance((signTipX, signTipY), (thumbTipX, thumbTipY)) <50:
            centerX = int((signTipX+thumbTipX)/2)
            centerY = int((signTipY + thumbTipY)/2)
            cv2.line(frame, (signTipX, signTipY), (thumbTipX, thumbTipY), (0,255,0),2)
            cv2.circle(frame, (centerX, centerY), 5, (0,255,0), cv2.FILLED)

    ctime = time.time()
    fps = int(1/(ctime-ptime))

    cv2.putText(frame,str(fps) + " FPS", (10,20), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,0,0),2)
    showKey.drawKey(frame,(255,255,255), (0,0,0),0.1, fontScale=0.5)
    mouseKey.drawKey(frame,(255,255,255), (0,0,0),0.1, fontScale=0.5)
    exitKey.drawKey(frame,(255,255,255), (0,0,0),0.1, fontScale=0.5)
    cv2.setMouseCallback('video', getMousPos)

    if showKey.isOver(clickedX, clickedY):
        show = not show
        showKey.text = "Hide" if show else "Show"
        clickedX, clickedY = 0, 0

    if mouseKey.isOver(clickedX, clickedY):
        import virttualmouse 
        #exec(open('virttualmouse.py').read())
        
        #break
        exit()
    if exitKey.isOver(clickedX, clickedY):
            #import virttualmouse 
            #exec(open('virttualmouse.py').read())

            #break
            exit()

    #checking if sign finger is over a key and if click happens
    alpha = 0.5
    if show:
        textBox.drawKey(frame, (255,255,255), (0,0,0), 0.3)
        for k in keys:
            if k.isOver(mouseX, mouseY) or k.isOver(signTipX, signTipY):
                alpha = 0.1
                # writing using mouse right click
                if k.isOver(clickedX, clickedY):                              
                    if k.text == '<--':
                        textBox.text = textBox.text[:-1]
                    elif k.text == 'clr':
                        textBox.text = ''
                    elif len(textBox.text) < 30:
                        if k.text == 'Space':
                            textBox.text += " "
                        else:
                            textBox.text += k.text
                            
                # writing using fingers
                if (k.isOver(thumbTipX, thumbTipY)):
                    clickTime = time.time()
                    if clickTime - previousClick > 1.4:                               
                        if k.text == '<--':
                            textBox.text = textBox.text[:-1]
                        elif k.text == 'clr':
                            textBox.text = ''
                        elif len(textBox.text) < 30:
                            if k.text == 'Space':
                                textBox.text += " "
                            else:
                                textBox.text += k.text
                                #simulating the press of actuall keyboard
                                keyboard.press(k.text)
                        previousClick = clickTime
            k.drawKey(frame,(255,255,255), (0,0,0), alpha=alpha)
            alpha = 0.5
        clickedX, clickedY = 0, 0        
    ptime = ctime
    cv2.imshow('video', frame)

    ## stop the video when 'q' is pressed
    pressedKey = cv2.waitKey(1)
    if pressedKey == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()