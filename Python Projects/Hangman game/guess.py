import random

import time
# def hangman():{
word= random.choice(["pineapple","cholera","tiger","jaguar","deadly","alphaomega","kashish","hitler","build","earthly","blitzkreig","economy","finance","educate","efficient","supportive","elderly","flight","folk","flame","frustration","garbage","gather","gentle","global","hilarious","intelligence","knife","longevity","momument","nonsense","nobody","turmeric","utilize","reconfigure","wheat","yellowish"])
# }
name=input("enter your name ")
print(f"hi!! {name}")
print("_-_-_-_-_-_-_-_-_-_-_-_-")
print("guess the word in less than 10 attempts")
valid_letters ='abcdefghijklmnopqrstuvwxyz'
turns=10
guessmade=''
while(len(word)>0):
    main=""
    missed=0
    for letter in word:
        if letter in guessmade:
            main+=letter
        else:
            main+="_"+" "
    if main==word:
        print(main)
        print("Yeah you actually won!!")
        time.sleep(3)
        break
    print("guess the word ",main)
    guess=input()

    if guess in valid_letters:
        guessmade=guessmade+guess
    else:
        print("enter a valid character")
        guess=input()
    if guess not in word:
        turns-=1
        if turns==9 :
            print("you have 9 turns left")
            print("------------------")
        if turns==8 :
            print("you have 8 turns left")
            print("------------------")
            print("        O         ")
        if turns==7 :
            print("you have 7 turns left")
            print("------------------")
            print("        O         ")
            print("        |         ")
        
        if turns==6 :
            print("you have 6 turns left")
            print("------------------")
            print("        O         ")
            print("        |         ")
            print("       /          ")
        if turns==5 :
            print("you have 5 turns left")
            print("------------------")
            print("        O         ")
            print("        |         ")
            print("       / \        ")
         
        if turns==4 :
            print("you have 4 turns left")
            print("------------------")
            print("       \O         ")
            print("        |         ")
            print("       / \         ")
        if turns==3 :
            print("you have 3 turns left")
            print("------------------")
            print("      \ O /         ")
            print("        |         ")
            print("       / \        ")
        if turns==2 :
            print("you have 2 turns left")
            print("------------------")
            print("      \ O /|         ")
            print("        |  |      ")
            print("       / \        ")
        if turns==1 :
            print("you have 1 turn left")
            print("------------------")
            print("      \ O_/|       ")
            print("        | \|       ")
            print("       / \ |       ")
        if turns==0 :
            print("you  are dead lol")
            print("------------------")
            print("        O__/|        ")
            print("      / | \ |    ")
            print("       / \  |      ")
            print("------------------")
            print(f"the answer was {word}")
            print("YOU LOOSE")
            time.sleep(3)
            break
    

    


# hangman()