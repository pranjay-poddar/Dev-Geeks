import pygame
import os
pygame.font.init()
pygame.mixer.init()

width, height = 900, 500
win = pygame.display.set_mode((width, height))
White = (200, 200, 200)
black = (0, 0, 0)
Red = (255, 0, 0)
Yellow = (255, 255, 0)
red_bullets =[]
yellow_bullets =[]
bullets_vel = 7
max_bullets = 3

health_font = pygame.font.SysFont('comicsans', 40)
winner_font = pygame.font.SysFont('comicsans', 50)
# red_health = 10
# yellow_health = 10

bullet_hit_sound =pygame.mixer.Sound(os.path.join('Assets','Grenade+1.mp3'))
bullet_fire_sound =pygame.mixer.Sound(os.path.join('Assets','Gun+Silencer.mp3'))

border = pygame.Rect(width / 2, 0, 10, height)
caption = "Game"
pygame.display.set_caption(caption)
fps = 60
vel = 3
spaceship_width, spaceship_height = 55, 40

yellow_hit = pygame.USEREVENT + 1
red_hit = pygame.USEREVENT + 2

yellow_spaceship_image = pygame.image.load(
    os.path.join("Assets", "spaceship_yellow.png")
)
red_spaceship_image = pygame.image.load(os.path.join("Assets", "spaceship_red.png"))


space_image = pygame.transform.scale(pygame.image.load(os.path.join("Assets", "space.png")), (width, height))

yellow_spaceship = pygame.transform.rotate(
    pygame.transform.scale(yellow_spaceship_image, (spaceship_width, spaceship_height)),
    90,
)
red_spaceship1 = pygame.transform.rotate(
    pygame.transform.scale(red_spaceship_image, (spaceship_width, spaceship_height)),
    270,
)

red_spaceship2 = pygame.transform.rotate(
    pygame.transform.scale(red_spaceship_image, (spaceship_width, spaceship_height)),
    270,
)
red_spaceship3 = pygame.transform.rotate(
    pygame.transform.scale(red_spaceship_image, (spaceship_width, spaceship_height)),
    270,
)
red_spaceship4 = pygame.transform.rotate(
    pygame.transform.scale(red_spaceship_image, (spaceship_width, spaceship_height)),
    270,
)



def draw_window(red, yellow, red_bullets, yellow_bullets, red_health, yellow_health):
    # win.fill(White)
    win.blit(space_image,(0,0))
    pygame.draw.rect(win, black, border)
    red_health_text = health_font.render("Health: "+str(red_health), 1, White)
    yellow_health_text = health_font.render("Health: "+str(yellow_health), 1, White)

    win.blit(red_health_text,(width-red_health_text.get_width()-10, 10))
    win.blit(yellow_health_text,(10, 10))
    win.blit(yellow_spaceship, (yellow.x, yellow.y))
    win.blit(red_spaceship1, (red.x, red.y-90))
    win.blit(red_spaceship2, (red.x, red.y-45))
    win.blit(red_spaceship3, (red.x, red.y+45))
    win.blit(red_spaceship4, (red.x, red.y+90))

    

    for bullets in red_bullets:
        pygame.draw.rect(win, Red, bullets)

    for bullets in yellow_bullets:
        pygame.draw.rect(win, Yellow, bullets)

    pygame.display.update()


def yellow_handle_movement(keys_pressed, yellow):
    if keys_pressed[pygame.K_a] and yellow.x - vel > 0:
        yellow.x -= vel
    if keys_pressed[pygame.K_d] and yellow.x + vel + yellow.width < border.x:
        yellow.x += vel
    if keys_pressed[pygame.K_w] and yellow.y - vel > 0:
        yellow.y -= vel
    if keys_pressed[pygame.K_s] and yellow.y + vel + yellow.height < height - 15:
        yellow.y += vel


def red_handle_movement(keys_pressed, red):
    if keys_pressed[pygame.K_LEFT] and red.x - vel > border.x + border.width:
        red.x -= vel
    if keys_pressed[pygame.K_RIGHT] and red.x + vel + red.width < width:
        red.x += vel
    if keys_pressed[pygame.K_UP] and red.y - vel > 0:
        red.y -= vel
    if keys_pressed[pygame.K_DOWN] and red.y + vel + red.height < height - 15:
        red.y += vel

def handle_bullets(yellow_bullets, red_bullets, yellow, red):
    for bullet in yellow_bullets:
        bullet.x += bullets_vel
        if red.colliderect(bullet):
            pygame.event.post(pygame.event.Event(red_hit))
            yellow_bullets.remove(bullet)
        elif bullet.x > width:
            yellow_bullets.remove(bullet)

    for bullet in red_bullets:
        bullet.x -= bullets_vel
        if yellow.colliderect(bullet):
            pygame.event.post(pygame.event.Event(yellow_hit))
            red_bullets.remove(bullet)
        elif bullet.x < 0:
            red_bullets.remove(bullet)

def draw_winner(text):
    draw_text = winner_font.render(text,1,White)
    win.blit(draw_text, (width/2-draw_text.get_width()/2,height/2- 0-draw_text.get_height()/2 )) 
    pygame.display.update()
    pygame.time.delay(5000)

def main():
    red_health = 10
    yellow_health = 10

    red = pygame.Rect(
        700, 300, spaceship_width, spaceship_height
    )  # x cord, y cord, width, height
    yellow = pygame.Rect(
        100, 300, spaceship_width, spaceship_height
    )  # x cord, y cord, width, height

    clock = pygame.time.Clock()
    run = True
    while run:
        clock.tick(fps)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
                pygame.quit()

            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LCTRL and len(yellow_bullets)<max_bullets:
                    bullet = pygame.Rect(yellow.x + yellow.width, yellow.y + yellow.height//2 - 2, 10, 5)
                    yellow_bullets.append(bullet)
                    bullet_fire_sound.play()
                if event.key == pygame.K_RCTRL and len(red_bullets)<max_bullets:
                    bullet = pygame.Rect(red.x , red.y + red.height//2 - 2, 10, 5)
                    red_bullets.append(bullet)
                    bullet_fire_sound.play()


            if event.type == red_hit:
                red_health -= 1
                bullet_hit_sound.play()
            if event.type == yellow_hit:
                yellow_health -= 1
                bullet_hit_sound.play()
        
        winner_text= ""
        if(yellow_health == 0):
            winner_text = "RED WINS! FATALITY"

        if(red_health == 0):
            winner_text = "YELLOW WINS! FATALITY"

        if winner_text != "":
            draw_winner(winner_text)
            break

        print(red_bullets, yellow_bullets)
        keys_pressed = pygame.key.get_pressed()
        yellow_handle_movement(keys_pressed, yellow)
        red_handle_movement(keys_pressed, red)
        draw_window(red, yellow, red_bullets, yellow_bullets, red_health, yellow_health)
        handle_bullets(yellow_bullets, red_bullets, yellow, red)

    main()


if __name__ == "__main__":
    main()
