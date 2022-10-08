import os

def display_board(board): 
    
    print(" "+board[0]+" | "+board[1]+" | "+board[2])
    print("-----------")
    print(" "+board[3]+" | "+board[4]+" | "+board[5])
    print("-----------")
    print(" "+board[6]+" | "+board[7]+" | "+board[8])
    

def choose_marker():
    
    player1 = ' '
    player2 = ' '
    
    while player1 not in ['X','O']:
        player1 = input("Please choose marker - X or O: ")
    
    if player1 == 'X':
        player2 ='O'
    else:
        player2 = 'X'
    
    return (player1,player2)


def position(board, player):
    
    valid_pos = False
    
    while valid_pos != True:
        pos = int(input("Please enter position for {}: ".format(player)))
    
        if board[pos-1] != " ":
            print("Invalid position. Please try again!")
        else:
            valid_pos = True
            
    return pos


def game_turn(mark, position, board, chance):
    
    board[position-1] = mark
        
    os.system('cls')
    display_board(board)
    
    chance += 1
    
    win = game_win(board)
    
    return chance, win

  
def game_win(board):   
    #Horizontal line wins:
    
    if board[0] == board[1] == board[2]:
        return board[0]
    
    elif board[3] == board[4] == board[5]:
        return board[3]
    
    elif board[6] == board[7] == board[8]:
        return board[6]
        
    
    #Vertical line wins:
    
    if board[0] == board[3] == board[6]:
        return board[0]
    
    elif board[1] == board[4] == board[7]:
        return board[1]
    
    elif board[2] == board[5] == board[8]:
        return board[2]
    
    #Diagonal Line wins:
    
    if board[0] == board[4] == board[8]:
        return board[0]
    elif board[2] == board[4] == board[6]:
        return board[2]
 
    else:
        return 0  


def play_again():
    
    choice = ' '
    while choice not in ['Y','N']:
        choice = input("Play Again? Y or N: ")
        
    if choice == 'Y':
        return True
    else:
        return False


def game():
    
    print("Welcome to TIC TAC TOE!\n")
    
    #Default Board
    
    print("Default index positions will be as following: \n")
    def_board = ["1","2","3","4","5","6","7","8","9"]
    display_board(def_board)
    print("\n")    
    
    #Empty Board Set
    board = [" "," "," "," "," "," "," "," "," "]
    
    
    #Choose markers
    
    (mark1, mark2) = choose_marker()
    
    
    #Game Starts
    chance = 1

    while chance in range(1,10):
        
        #Which player's turn?
        if chance in [1,3,5,7,9]:
            player = 'Player 1'
            mark = mark1
        else:
            player = 'Player 2'
            mark = mark2
    
    
        #Get position
        positions = position(board, player)
     
    
        #Take a turn
        chance, win = game_turn(mark,positions,board,chance)
    
        #Winner?
        
        if win == mark1:
            print("\nCongratulations Player 1. You won!\n")
            break
        
        elif win == mark2:
            print("\nCongratulations Player 2. You won!\n")
            break


    #Draw?
    if win != mark1 and win != mark2:
        print("The match is a draw!\n")
   

    #Play Again?
    
    if play_again():
        
        from IPython.display import clear_output
        clear_output()
        
        game()
    
    
    else:
        print("Thanks for playing.")
        exit(1)


game()
