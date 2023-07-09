import turtle
import pandas

screen = turtle.Screen()
screen.title("U.S. States Quiz")

img = "image.gif"
screen.addshape(img)
turtle.shape(img)

data = pandas.read_csv("50_states.csv")
all_state = data.state.to_list()

guessed_list = []

while len(guessed_list) < 50 :
    answer_state = screen.textinput(title=f"{len(guessed_list)}/50 the State", prompt="What's another state's name?").title()
    print(answer_state)

    if answer_state == "Exit":
        missing_state = []
        for state in all_state:
            missing_state.append(state)
        break
        print(missing_state)
    if answer_state in all_state:
        guessed_list.append(answer_state)
        t = turtle.Turtle()
        t.hideturtle()
        t.penup()
        state_data = data[data.state == answer_state]
        t.goto(int(state_data.x), int(state_data.y))
        t.write(answer_state)
screen.exitonclick()
