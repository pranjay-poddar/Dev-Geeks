# Load Shedding Simulator

The Load Shedding Simulator is a C++ program that allows you to perform load shedding based on load forecasting and available power capacity. Load shedding is the process of intentionally reducing the power demand by shedding or disconnecting some loads to avoid an overload on the power system.

## How to Use

- Run the program.

- Enter the following valid inputs

- The program will validate the inputs to ensure that forecast hours and maximum power capacity are positive.

- The program will simulate load forecasting by generating random load profiles for the next 'forecast hours'. Each load profile will have a name (Load_1, Load_2, ..., Load_n) and a random power demand between 50 kW and 250 kW.

- Based on the available power capacity, the program will perform load shedding by shedding or disconnecting some loads. The shedding algorithm sorts the loads in descending order of power demand and starts shedding from the highest demand loads until the total demand is within the available power capacity.

- The program will display the load shedding results, showing the power demand for each load after load shedding.

## Load Forecasting Simulation

In the simulation, the program generates random load profiles for the forecast hours. For simplicity, the power demand for each load is randomly chosen between 50 kW and 250 kW.

## Load Shedding Algorithm

The load shedding algorithm in this simulator is a simple approach based on power capacity constraints. It sorts the loads based on power demand and starts shedding loads from the highest demand ones until the total demand is within the available power capacity.
