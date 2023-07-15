# to exit press q
# join two adjacent finger of same hand in order to click a button

import cv2
from cvzone.HandTrackingModule import HandDetector
class Button:
    def __init__(self , pos , width , height , value):
        
        self.pos = pos
        self.width = width
        self.height = height
        self.value = value

    def draw(self , img):
        cv2.rectangle(img , self.pos , (self.pos[0]+self.width , self.pos[1]+self.height) , (225 , 225 , 225), cv2.FILLED)
        cv2.rectangle(img , self.pos , (self.pos[0]+self.width , self.pos[1]+self.height) , (50 , 50 , 50), 3)

        cv2.putText(img , self.value , (self.pos[0]+40,self.pos[1]+50) , cv2.FONT_HERSHEY_PLAIN , 2 , (50,50,50) , 2)

    def checkClick(self , x , y):

        if self.pos[0]  < x < self.pos[0] + self.width and  self.pos[1] < y < self.pos[1]+self.height :
            cv2.rectangle(img , self.pos , (self.pos[0]+self.width , self.pos[1]+self.height) , (225 , 255 , 255), cv2.FILLED)
            cv2.rectangle(img , self.pos , (self.pos[0]+self.width , self.pos[1]+self.height) , (50 , 50 , 50), 3)

            cv2.putText(img , self.value , (self.pos[0]+30,self.pos[1]+70) , cv2.FONT_HERSHEY_PLAIN , 5 , (0,0,0) , 5)
            return True
        else:
            return False
        

#Webcam:
cap = cv2.VideoCapture(0)
cap.set(3,1280) #width
cap.set(4,720)  #height
detector = HandDetector(detectionCon=0.8 , maxHands=1) #Hand Detection

#Creating Buttons

buttonListValues = [['7','8','9','*','c'],
                    ['4','5','6','-',''],
                    ['1','2','3','+',''],
                    ['0','/','.','=',''],
                                        ]
buttonList = []
for x in range(5):
    for y in range(4):
        xpos = x*100 + 800
        ypos = y*100 + 150
        buttonList.append(Button((xpos , ypos) , 100 , 100 ,buttonListValues[y][x]))
#Variables
myEq = ' '
delay = 0

while True:
    #Get Image from webcam

    success , img = cap.read()
    img = cv2.flip(img , 1) #flip horizontally

    # Detection of Hand
    hands , img = detector.findHands(img , flipType = False)
    #Draw All Buttons
    cv2.rectangle(img , (800,50) , (800+400 , 70+100) , (225 , 225 , 225), cv2.FILLED)
    cv2.rectangle(img , (800,50) , (800+400 , 70+100) , (50 , 50 , 50), 3)
    for button in buttonList:
        button.draw(img)

    #Check For Hands
    if hands:
        lmList = hands[0]['lmList']
        length , _, img = detector.findDistance((lmList[8][0],lmList[8][1]),(lmList[12][0],lmList[12][1]),img)
        
        if length < 50: #Changes 
            for i,button in enumerate(buttonList):
                if button.checkClick(lmList[8][0],lmList[8][1]) and delay == 0:
                  myVal = buttonListValues[int(i%4)][int(i/4)]
                  if myVal == "=":
                      myEq = str(eval(myEq))
                  elif myVal == "c":
                   myEq = myEq[:-2]       
                  else:
                    myEq += myVal
                  delay = 1
                
    # Avoid Duplicates
    if delay != 0:
        delay += 1
        if delay > 10 :
            delay = 0
    
    #Display The Result
    cv2.putText(img , myEq , (810,130) , cv2.FONT_HERSHEY_COMPLEX , 2 , (50,50,50) , 2)


    #Display Image
    cv2.imshow("img" , img)
    if cv2.waitKey(1) == ord('q'):
        break
    if cv2.waitKey(1) == ord('c'):
        myEq = ''
    
