import math
import time
from turtle import *

# Defining functions for circle's coordinates
def cira(k):
    return 12*math.sin(k)


def cirb(k):
    return 12*math.cos(k)

speed(30)
bgcolor("black")
time.sleep(5)

for i in range(0,360):
    rad = math.radians(i)      # converting the values to radians
    goto(cira(rad)*15,cirb(rad)*15)   # Moves the turtle to the specified coordinate
    color("light salmon")
    goto(0,0)
done()
