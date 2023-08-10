# Ping Pong Game using AI

## Introduction
This is a simple ping pong game using AI. The AI is trained using a genetic algorithm. The game is made using pygame library in python.

## How to run
1. Clone the repository
2. Create a virtual environment
3. Install necessary libraries using ```pip install -r requirements.txt```
4. Run ```python main.py```
    - To run the game from the saved model comment out line no. `164 in main.py`
    - To train the model from a checkpoint comment out line no. `132` and uncomment line no. `130` in `main.py` and write the checkpoint path in designated place.
    - To view the game while it is being trained set draw = True in line no. `127 in main.py`


## How to play
1. Use `W` and `S` keys to move the left paddle up and down respectively.
2. the automatically starts after a point is scored and keep the traCk of your points.


### Addition Context

- If you are not satisfied with the accuracy of model then tweak the [config](config.txt) using this [Refernce Doc](https://neat-python.readthedocs.io/en/latest/config_file.html) or just train the model more by referencing the last checkpoint
- Reference doumentation for NEAT-python [NEAT-python](https://neat-python.readthedocs.io/en/latest/index.html)



