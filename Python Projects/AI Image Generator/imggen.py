# Import necessary libraries here
import os 
import random 
import string  
import openai 
import requests 
from colorama import Fore 

#clear the output window screen first.
os.system("cls")

w = Fore.LIGHTWHITE_EX
r = Fore.LIGHTRED_EX
g = Fore.LIGHTGREEN_EX
b = Fore.LIGHTBLUE_EX
y = Fore.LIGHTYELLOW_EX
m = Fore.LIGHTMAGENTA_EX
c = Fore.LIGHTCYAN_EX
black = Fore.LIGHTBLACK_EX


#add your OpenAI keys here
openai.organization = "Add your Organization ID"
openai.api_key = "Add your openAI key"
openai.Model.list() 

os.system("AI Image generator")

print(f"{m}[{w}1{m}] {black}Image generator") 


# function to generate an image from openAI and prompt user for saving/displaying it
def image_gen():

  # taking query from the user as input
  image=input(f"{m}[{w}>>>{m}] {black}Add your query here:{w} ")
  print(f"{m}[{w}>{m}] {black}Generating results{m}...")
  # generating a url response from OpenAI
  r = openai.Image.create(prompt=image, n=2, size="1024x1024")
  # saving returned image url in a variable
  image_url = r["data"][0]["url"] 
  os.system("cls")
  # displaying the returned url to the user
  print(f"{m}[{w}!{m}] {black}Results generated {y}{image_url}")
  print(f"{image_url}")
  # prompting the user to save the file
  save=input(f"{m}[{w}>>>{m}] {black}Do you want to save the image? [y/n]:{w} ")
  if save == "y":
    # generating save file path
    path="./img/" 
    nombre_random= "".join(random.choice(string.ascii_letters + string.digits)  for i in range(10))
    nombre_archivo = f"{path}{nombre_random}.png" 
    imagen_save= requests.get(image_url).content 
    # writing path to local storage
    with open(nombre_archivo, 'wb') as i:

      i.write(imagen_save)
    print(f"{m}[{w}!{m}] {black}Image saved in: {y}{nombre_archivo}")
  # prompting the user to open the image  
  openask=input("Do you want to open the image?[y/n]: ")
  if openask == "y":
    # displaying saved file to user in their system's explorer
    os.system(f"""explorer {image_url}""") 
  else: 
    # if user prompts no for displaying file, then simply quit the program
    print("OK")
    print("Press any key to exit")
    os.system("pause >null")
    os.system("exit")

#calling image_gen() for the execution
image_gen()
