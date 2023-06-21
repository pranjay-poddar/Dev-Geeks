import random
rock='''
   -----------
  |           )
--      ------
       (______)
       (_______)
___    (______)
       (_____)
'''
paper =''' 
  --------
--|   ___)____
        _______)
       __________)
       ________)
---__________)
'''
scissors='''
     ------
----'   ___)___
         _______)
      ___________)
      (____)
---___(____)
'''
game_images=[rock,paper,scissors]
user_choice=int(input("Enter your choice:Type 0 for Rock,1 for Paper,2 for Scissors"))
if user_choice >=3 or user_choice<0:
    print("You entered invalid number, You lose.")
else:
   print(game_images[user_choice])
   computer_choice = random.randint(0, 2)
   print("Computer Chose:")
   print(game_images[computer_choice])
   if computer_choice == user_choice:
       print("It's draw")
   elif computer_choice == 0 and user_choice == 2:
       print("You lose")
   elif computer_choice == 2 and user_choice == 0:
       print("You win")
   elif computer_choice > user_choice:
       print("You lose")
   elif user_choice > computer_choice:
       print("You win")


