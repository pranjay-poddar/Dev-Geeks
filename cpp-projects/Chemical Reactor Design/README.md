 # Batch Reactor Simulation 
 
This C++ program simulates a batch reactor for an nth-order chemical reaction. It allows users to input the reaction parameters and then calculates and displays the concentration and conversion over time.

## Requirements

- C++ compiler

## Usage

1. Clone this repository or download the `main.cpp` file.
2. Open a terminal or command prompt and navigate to the directory containing `main.cpp`.
3. Compile the C++ code using your preferred C++ compiler.
5. Follow the on-screen instructions to input the reaction parameters.

## Input Parameters

- Number of reactants (integer)
- Initial concentration of each reactant (mol/L)
- Reaction rate constant (1/min)
- Reaction order
- Total reaction time (minutes)
- Time step size (minutes)
- Include an inert substance (1 for yes, 0 for no)
- Initial concentration of the inert substance (mol/L)

## Output

The program will display a table showing the concentrations of each component (reactants and inert substance) at different time intervals. The last row of the table represents the conversion of the reactants in percentage at each time step. Finally, the program will show the final conversion of the reactants at the end of the reaction.


