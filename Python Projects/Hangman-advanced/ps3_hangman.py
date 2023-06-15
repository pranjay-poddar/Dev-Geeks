
"""

@author: epsa
"""
# 
# Hangman game
#

# -----------------------------------


import random
import string

numberofguess=8
WORDLIST_FILENAME = (r"c:\Users\epsas\OneDrive\Desktop\hangman\words.txt") 
#change the path of words.txt as per your machine

def loadWords():
    """
    Returns a list of valid words. Words are strings of lowercase letters.
    
    Depending on the size of the word list, this function may
    take a while to finish.
    """
    print ("Loading word list from file...")
    # inFile: file
    inFile = open(WORDLIST_FILENAME, 'r')
    # line: string
    line = inFile.readline()
    # wordlist: list of strings
    wordlist = line.split()
    print ("  ", len(wordlist), "words loaded.")
    print("\n----------------------------------------------------------------\n")
    return wordlist

def chooseWord(wordlist):
    """
    wordlist (list): list of words (strings)

    Returns a word from wordlist at random
    """
    return random.choice(wordlist)


# -----------------------------------


wordlist = loadWords()

def isWordGuessed(secretWord, lettersGuessed):
    '''
    secretWord: string, the word the user is guessing
    lettersGuessed: list, what letters have been guessed so far
    returns: boolean, True if all the letters of secretWord are in lettersGuessed;
      False otherwise
    '''
    f=1
    for i in secretWord:
        if(i in lettersGuessed):
            f=1
        else:
            f=0
            break
    if(f==1):
        return(True)
    else:
        return(False)



def getGuessedWord(secretWord, lettersGuessed):
    '''
    secretWord: string, the word the user is guessing
    lettersGuessed: list, what letters have been guessed so far
    returns: string, comprised of letters and underscores that represents
      what letters in secretWord have been guessed so far.
    '''
    f=0
    st1=""
    for i in secretWord:
        if(i in lettersGuessed):
            st1=st1+i
        else:
            st1=st1+'_'
    return(st1)
  #return(st)

def getAvailableLetters(lettersGuessed):
    '''
    lettersGuessed: list, what letters have been guessed so far
    returns: string, comprised of letters that represents what letters have not
      yet been guessed.
    '''
    
    s=""
    x=string.ascii_lowercase
    for i in x:
        if(i in lettersGuessed):
            continue
        else:
            s=s+i
    return(s)

def hangman(secretWord):
    '''
    secretWord: string, the secret word to guess.

    Starts up an interactive game of Hangman.

    * At the start of the game, let the user know how many 
      letters the secretWord contains.

    * Ask the user to supply one guess (i.e. letter) per round.

    * The user should receive feedback immediately after each guess 
      about whether their guess appears in the computers word.

    * After each round, you should also display to the user the 
      partially guessed word so far, as well as letters that the 
      user has not yet guessed.

    Follows the other limitations detailed in the problem write-up.
    '''
    
    lettersGuessed=""
    global numberofguess
    numberofguess=8
    f=0
    st=""
    print("Welcome to the game, Hangman!")
    print("I am thinking of a word that is ",len(secretWord)," letters long.\n")
    print("----------------------------------------------------------------")
    while(numberofguess>0):
        
      print("You have ",numberofguess," guesses left.")
      available=getAvailableLetters(lettersGuessed)
      print("Available letters: " ,available)
      ch=input("Please guess a letter: ").lower()
      lettersGuessed=lettersGuessed+ch
      if(ch in available):
        if(ch in secretWord):
          print("Good guess: ",getGuessedWord(secretWord,lettersGuessed))
        else:
          print("Oops! That letter is not in my word:",getGuessedWord(secretWord,lettersGuessed))
          numberofguess=numberofguess-1
        if (isWordGuessed(secretWord,lettersGuessed)):
          print("-------------------------------------------------------------")
          print("Congratulations, you won!")
          f=1
          break
      else:
        print("You have already guessed that letter!")
      print("\n----------------------------------------------------------------")
    if(f==0):
      print("\nSorry, you ran out of guesses. The word was ",secretWord,".")
    c=input("Want to play again? Y/N: ").lower()
    if(c=='y'):
      n=input("enter 'r' to replay the last word and 'n' to guess a new word: ").lower()
      if(n=='r'):
        hangman(secretWord)
      else:
        secretWord = chooseWord(wordlist).lower()
        hangman(secretWord)
        
        
    


secretWord = chooseWord(wordlist).lower()
hangman(secretWord)
