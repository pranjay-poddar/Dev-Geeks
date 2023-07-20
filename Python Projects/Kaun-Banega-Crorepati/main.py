# Questions Array in format [ [s.no., question, options(4) ,correct answer] ]
questions = [
    [1, "How many months are there in a year?", "10", "12", "24", "None", "12"],
    [2, "How many days are there in a week?", "5", "15", "7", "None", "7"],
    [3, "How many days are there in a year?", "365", "356", "300", "None", "365"],
    [4, "Which number comes after 15?", "14", "15", "16", "None", "16"],
    [5, "How many colours are there in a rainbow?", "5", "10", "7", "None", "7"],
    [6, "We use our ears to ______", "See", "Hear", "Taste", "None", "Hear"],
    [7, "Name the day that comes after Tuesday?", "Wednesday", "Tuesday", "Thrusday", "None", "Wednesday"],
    [8, "How many vowels are there in the English alphabet?", "4", "5", "6", "None", "5"],
    [9, "How many legs does cow have?", "2", "6", "4", "None", "4"],
    [10, "Which sense organ do you use to smell?", "Eye", "Ear", "Nose", "Toungue", "Nose"],
    [11, "Which part of the plant is brown and below the ground?", "Roots", "Stem", "Branch", "None", "Roots"],
    [12, "Which part of a plant has seeds?", "Roots", "Stem", "Branch", "Fruit", "Fruit"],
    [12, "Which bird has a far sight and turns its head all the way round?", "Owl", "Bat", "Pigeon", "None", "Owl"],
    [13, "Which animal has a long neck?", "Bear", "Fox", "Giraffe", "Zebra", "Giraffe"],
    [14, "Which animal has black and white stripes on its body?", "Bear", "Fox", "Giraffe", "Zebra", "Zebra"],
    [15, "Name the shape with five sides?", "Pentagon", "Hexatagon", "Square", "None", "Pentagon"],
    [16, "Earth has ____ natural satellite/satellites.", "1", "2", "3", "4", "1"]   
]

# Levels
levels=["₹1,000","₹2,000","₹3,000","₹5,000","₹10,000","₹20,000","₹40,000","₹80,000","₹160,000","₹320,000","₹640,000","₹1,250,000","₹2,500,000","₹5,000,000","₹1 Crore","₹7 Crore"]
# Initializing level and money
level=0
moneyTakeHome="₹0"
moneyWin="₹0"

# function converting option to answer
def optionConvertor(n,q):
   match n:
       case('a'):
           return q[2]
       case('b'):
           return q[3]
       case('c'):
           return q[4]
       case('d'):
           return q[5]

for q in questions:
    # printing Question alogn with options
    print(f"\nQ{q[0]}. {q[1]}")
    print(f"a.{q[2]} \t b.{q[3]}")
    print(f"c.{q[4]} \t d.{q[5]}")
    
    while(True):
        ans = input("Enter the correct option -\t")
        if(ans=='a' or ans == 'b' or ans == 'c' or ans=='d' ):
            break
        # Invalid options if user clicks on a, b, c and d.
        else:
            print("Invalid Options !")

    if(optionConvertor(ans,q)==q[-1]):
        moneyWin=levels[level]
        if(level==4 or level==10 or level==16):
            moneyTakeHome = levels[level]
        print(f"Congratulations Correct answer. You won {moneyWin}\n")
        level+=1
    else:
        print("Wrong Answer !")
        print(f"Money you take home is {moneyTakeHome}.")
        break