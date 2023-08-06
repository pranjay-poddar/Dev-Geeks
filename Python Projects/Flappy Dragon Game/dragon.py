
import random #for generating random numbers for polls 
import sys # for exist of game 
import pygame
from  pygame.locals import * #Basic pygame import commands 

# Global Variables for the game
FPS = 32
SCREENWIDTH = 1920
SCREENHEIGHT = 1010
SCREEN = pygame.display.set_mode((SCREENWIDTH, SCREENHEIGHT))
GROUNDY = SCREENHEIGHT * 0.88
GAME_SPRITES = {}
GAME_SOUNDS = {}
PLAYER = 'Python Projects\Flappy Dragon Game\gallery/sprites/dragon.png'
BACKGROUND = 'Python Projects\Flappy Dragon Game\gallery/sprites/bg2.jpg'
PIPE = 'Python Projects\Flappy Dragon Game\gallery/sprites/pipe2.png'
# This list will hold all of the scores
score_list = [0]







def welcomeScreen():
    # Shows welcome images on the screen


    playerx = int(SCREENWIDTH/5)
    playery = int((SCREENHEIGHT - GAME_SPRITES['player'].get_height())/2)
    messagex = int((SCREENWIDTH - GAME_SPRITES['message'].get_width())/2)
    messagey = int(SCREENHEIGHT*0.13)
    basex = 0
    while True:
        for event in pygame.event.get():
            # if user clicks on cross button, close the game
            if event.type == QUIT or (event.type==KEYDOWN and event.key == K_ESCAPE):
                pygame.quit()
                sys.exit()

            # If the user presses space or up key, start the game for them
            elif event.type==KEYDOWN and (event.key==K_SPACE or event.key == K_UP):
                return
            
            else:
                SCREEN.blit(GAME_SPRITES['background'], (0, 0))    
                SCREEN.blit(GAME_SPRITES['player'], (playerx, playery))    
                SCREEN.blit(GAME_SPRITES['message'], (messagex,messagey ))    
                SCREEN.blit(GAME_SPRITES['base'], (basex, GROUNDY))  
                pygame.display.update()
                FPSCLOCK.tick(FPS)


def getRandomPipe():
    """
    Generate positions of two pipes(one bottom straight and one top rotated ) for blitting on the screen
    """
    pipeHeight = GAME_SPRITES['pipe'][0].get_height()
    offset = SCREENHEIGHT/5 
    y2 = offset + random.randrange(0, int(SCREENHEIGHT - GAME_SPRITES['base'].get_height()  - 1.2* offset))
    pipeX = SCREENWIDTH
    y1 = pipeHeight - y2 + offset
    pipe = [
        {'x': pipeX, 'y': -y1}, #upper Pipe
        {'x': pipeX, 'y': y2} #lower Pipe
    ]
    return pipe


def mainGame():
    score=0
    SCORE_Font = pygame.font.Font('freesansbold.ttf',45)

    playerx = int(SCREENWIDTH/5)
    playery = int(SCREENHEIGHT/2)
    basex = 0

    # Create 2 pipes for blitting on the screen
    newPipe1 = getRandomPipe()
    newPipe2 = getRandomPipe()

    # my List of upper pipes
    upperPipes = [
        {'x': SCREENWIDTH+200, 'y':newPipe1[0]['y']},
        {'x': SCREENWIDTH+200+(SCREENWIDTH/2), 'y':newPipe2[0]['y']},
    ]
    # my List of lower pipes
    lowerPipes = [
        {'x': SCREENWIDTH+200, 'y':newPipe1[1]['y']},
        {'x': SCREENWIDTH+200+(SCREENWIDTH/2), 'y':newPipe2[1]['y']},
    ]

    pipeVelX = -8

    playerVelY = -9
    playerMaxVelY = 12
    playerAccY = 1

    playerFlapAccv = -8 # velocity while flapping
    playerFlapped = False # It is true only when the bird is flapping


    while True:
        for event in pygame.event.get():
            if event.type == QUIT or (event.type == KEYDOWN and event.key == K_ESCAPE):
                pygame.quit()
                sys.exit()
            if event.type == KEYDOWN and (event.key == K_SPACE or event.key == K_UP):
                if playery > 0:
                    playerVelY = playerFlapAccv
                    playerFlapped = True
                    GAME_SOUNDS['wing'].play()

        


        collided = isCollide(playerx, playery, upperPipes, lowerPipes) # This function will return true if the player is crashed
        if collided:
            score_list.append(score)
            return     

        #check for score
        playerMidPos = playerx + GAME_SPRITES['player'].get_width()/2
        for pipe in upperPipes:
            pipeMidPos = pipe['x'] + GAME_SPRITES['pipe'][0].get_width()/2
            if pipeMidPos<= playerMidPos < pipeMidPos +4:
                score +=1
                print(f"Your score is {score}") 
                GAME_SOUNDS['point'].play()


        if playerVelY < playerMaxVelY and not playerFlapped:
            playerVelY += playerAccY

        if playerFlapped:
            playerFlapped = False            
        playerHeight = GAME_SPRITES['player'].get_height()
        playery = playery + min(playerVelY, GROUNDY - playery - playerHeight)

        # move pipes to the left
        for upperPipe , lowerPipe in zip(upperPipes, lowerPipes):
            upperPipe['x'] += pipeVelX
            lowerPipe['x'] += pipeVelX

        # Add a new pipe when the first is about to cross the leftmost part of the screen
        if 0 < upperPipes[0]['x'] < 10:
            newpipe = getRandomPipe()
            upperPipes.append(newpipe[0])
            lowerPipes.append(newpipe[1])

        # if the pipe is out of the screen, remove it
        if upperPipes[0]['x'] < -GAME_SPRITES['pipe'][0].get_width():
            upperPipes.pop(0)
            lowerPipes.pop(0)
        


        # Lets blit our sprites now
        SCREEN.blit(GAME_SPRITES['background'], (0, 0))
        for upperPipe, lowerPipe in zip(upperPipes, lowerPipes):
            SCREEN.blit(GAME_SPRITES['pipe'][0], (upperPipe['x'], upperPipe['y']))
            SCREEN.blit(GAME_SPRITES['pipe'][1], (lowerPipe['x'], lowerPipe['y']))

        SCREEN.blit(GAME_SPRITES['base'], (basex, GROUNDY))
        SCREEN.blit(GAME_SPRITES['player'], (playerx, playery))
        display= SCORE_Font.render(f"Score:{score}",True,(255,255,255))
        Xoffset =SCREENWIDTH- (SCREENWIDTH)/3.8
        SCREEN.blit(display,(1200, SCREENHEIGHT*0.12))
        # check for the maximum score
        maximum = max(score_list)
        # shows your current score and your max score
        display2 = SCORE_Font.render(f"High-Score: {maximum}", True, (255,200,200))
        SCREEN.blit(display2, ( Xoffset, SCREENHEIGHT*0.12))
        #  If your new score is the same as the maximum then u reached a new high score
        if score == maximum and score !=0:
            display3 = SCORE_Font.render(f"NEW HIGH SCORE!!", True, (200,35,35))
            SCREEN.blit(display3, (600, 100)) 
        
        pygame.display.update()
        FPSCLOCK.tick(FPS)

def isCollide(playerx, playery, upperPipes, lowerPipes):
    if playery > GROUNDY-100 or playery < 0:
        GAME_SOUNDS['die'].play()
        return True
    
    for pipe in upperPipes:
        pipeHeight = GAME_SPRITES['pipe'][0].get_height()
        if(playery < pipeHeight + pipe['y'] and abs(playerx - pipe['x']) < GAME_SPRITES['pipe'][0].get_width()):
            GAME_SOUNDS['hit'].play()
            return True

    for pipe in lowerPipes:
        if (playery + GAME_SPRITES['player'].get_height() > pipe['y']) and abs(playerx - pipe['x']) < GAME_SPRITES['pipe'][0].get_width():
            GAME_SOUNDS['hit'].play()
            return True

    return False



if __name__ == '__main__':
    pygame.init() # Initialize all the mnodules of pygame 
    FPSCLOCK = pygame.time.Clock() # clock function tocontrol FPS of game 
    pygame.display.set_caption('Flappy Dragon by Lucifer')

    # GAME IMAGES (DICT)
    GAME_SPRITES['message'] =pygame.image.load('Python Projects\Flappy Dragon Game\gallery/sprites/message.png').convert_alpha()
    GAME_SPRITES['base'] =pygame.image.load('Python Projects\Flappy Dragon Game\gallery/sprites/land.png').convert_alpha()
    GAME_SPRITES['pipe'] =(
        pygame.transform.rotate(pygame.image.load(PIPE).convert_alpha(), 180), # rotated pipe image  by 180 degrees  
        pygame.image.load(PIPE).convert_alpha() # normal pipe image 
    )    
    GAME_SPRITES['background'] = pygame.image.load(BACKGROUND).convert()
    GAME_SPRITES['player'] = pygame.image.load(PLAYER).convert_alpha()

    # Game sounds (DICT)
    GAME_SOUNDS['die'] = pygame.mixer.Sound('Python Projects\Flappy Dragon Game\gallery/audio/die.wav')
    GAME_SOUNDS['hit'] = pygame.mixer.Sound('Python Projects\Flappy Dragon Game\gallery/audio/hit.wav')
    GAME_SOUNDS['point'] = pygame.mixer.Sound('Python Projects\Flappy Dragon Game\gallery/audio/point.wav')
    GAME_SOUNDS['wing'] = pygame.mixer.Sound('Python Projects\Flappy Dragon Game\gallery/audio/wing.wav')


    
    while True:
        welcomeScreen() # Shows welcome screen to the user until he presses a button
        mainGame() # This is the main game function 
        welcomeScreen() # Shows welcome screen to the user until he presses a button