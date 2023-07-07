from chatterbot import ChatBot
import math

# Naming the ChatBot calculator
# Using mathematical evaluation logic
# The calculator AI will not learn with the user input
Bot = ChatBot(name='Calculator',
              read_only=True,
              logic_adapters=[
                  "chatterbot.logic.MathematicalEvaluation",
              ],
              storage_adapter="chatterbot.storage.SQLStorageAdapter")


# Clear the screen and start the calculator
print('\033c')
print("Hello, I am a calculator. How may I help you?")


def perform_calculation(user_input):
    try:
        # Check if the user input contains arithmetic operations
        if any(op in user_input for op in ['+', '-', '*', '/']):
            # Evaluate arithmetic expressions
            result = eval(user_input)
            return str(result)
        else:
            # Evaluate mathematical expressions using ChatBot's built-in logic
            response = Bot.get_response(user_input)
            return str(response)

    except ZeroDivisionError:
        return "Error: Division by zero is not allowed."

    except:
        return "Calculator: Please enter valid input."


def display_history(history):
    print("Calculation History:")
    for i, item in enumerate(history, start=1):
        print(f"{i}. User Input: {item['input']}")
        print(f"   Calculator: {item['response']}")
        print()


calculation_history = []

while True:
    # Take the input from the user
    user_input = input("me: ")

    # Check if the user has typed quit to exit the program
    if user_input.lower() == 'quit':
        print("Exiting")
        break

    # Check if the user wants to view the calculation history
    if user_input.lower() == 'history':
        display_history(calculation_history)
        continue

    # Perform calculation
    response = perform_calculation(user_input)

    # Store the input and response in the calculation history
    calculation_history.append({'input': user_input, 'response': response})

    # Print the calculator's response
    print("Calculator:", response)
