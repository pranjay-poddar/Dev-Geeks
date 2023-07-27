# Write a python program to translate a message into secret code language. Use the rules below to translate
# normal English into secret code language

# Encrypting:
# if the word contains atleast 3 characters, remove the first letter and append it at the end
#   now append three random characters at the starting and the end
# else:
#   simply reverse the string

# Decrypting:
# if the word contains less than 3 characters, reverse it
# else:
#   remove 3 random characters from start and end. Now remove the last letter and append it to the beginning

# Your program should ask whether you want to code or decode

import random
import string

print("Welcome to coding Decoding Center")
words = input("Enter the string -\t").split()
check = int(input("Enter 1 to code, -1 to decode and other to quit-\t"))
wordsList = []

if (check == 1):
    for word in words:
        r1 = random.choice(string.ascii_uppercase) + random.choice(
            string.ascii_lowercase) + random.choice(string.ascii_lowercase)
        r2 = random.choice(string.ascii_lowercase) + random.choice(
            string.ascii_lowercase) + random.choice(string.ascii_lowercase)
        if (len(word) >= 3):
            word = r1 + word[1:] + word[0] + r2
            wordsList.append(word)
        else:
            word = word[::-1]
            wordsList.append(word)
elif (check == -1):
    for word in words:
        if (len(word) >= 3):
            word = word[-4:-3] + word[3:-4]
            wordsList.append(word)
        else:
            word = word[::-1]
            wordsList.append(word)

for word in wordsList:
    print(word,end=" ")
