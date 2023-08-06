from flask import Flask, render_template, request
import requests
import json

app = Flask(__name__, template_folder='static')

def total_dogs_generated():
    with open('db.json') as json_file:
        data = json.load(json_file)
    sum = 0
    for i in data:
        sum = sum + i[1]
    return sum

def gene_sort(e):
  return e[1]

def get_data():
    with open('db.json') as json_file:
        data = json.load(json_file)
    data.sort(key=gene_sort, reverse = True)
    return data

def add_user(name, gene = 0, logins = 0):
    add = True
    with open('db.json') as json_file:
        data = json.load(json_file)
    for i in data:
        if i[0] == name:
            add = False
    if add == True:
        data_add = [name, gene, logins]
        data.append(data_add)
        with open('db.json', 'w') as outfile:
            json.dump(data, outfile)

def add_login(name):
    with open('db.json') as json_file:
        data = json.load(json_file)
    for i in data:
        if i[0] == name:
            i[2]+=1
    with open('db.json', 'w') as outfile:
        json.dump(data, outfile)

def add_gene(name):
    with open('db.json') as json_file:
        data = json.load(json_file)
    for i in data:
        if i[0] == name:
            i[1]+=1
    with open('db.json', 'w') as outfile:
        json.dump(data, outfile)

def get_user(name):
    with open('db.json') as json_file:
        data = json.load(json_file)
    for i in data:
        if i[0] == name:
            return i

def get_dog_img_link(home):
    link = "https://dog.ceo/api/breeds/image/random"
    response = requests.get(link)
    response = response.json()
    if home is not True:
        add_gene(NAME)
    return response["message"]


@app.route('/')
def login():    
    return render_template("login.html")

@app.route('/home')
def home():
    global NAME
    NAME = request.args["fname"]
    add_user(NAME)
    add_gene(NAME)
    add_login(NAME)
    link = get_dog_img_link(True)
    data = get_user(NAME)
    return render_template("home.html", dog_img_link = link, name = data[0], dogs_generated = data[1], no_of_logins = data[2], data = get_data(), total_dogs_generated = total_dogs_generated())

@app.route('/get_dog')
def get_dog():
    global NAME
    total_dogs = total_dogs_generated()
    get_d = get_data()
    link = get_dog_img_link(False)
    data = get_user(NAME)
    return render_template("home.html", dog_img_link = link, name = data[0], dogs_generated = data[1], no_of_logins = data[2], data = get_d, total_dogs_generated = total_dogs)

app.run()