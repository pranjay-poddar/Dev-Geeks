# Mineral Resource Estimation Tool

This is a C++ program that demonstrates Mineral Resource estimation for spatial interpolation. MR is a technique commonly used in GIS to estimate values at unmeasured locations based on nearby data points.

## How to Use

1. Clone or download the repository to your local machine.
2. Compile the C++ program using a C++ compiler (e.g., g++).
3. Run the compiled executable.

## Program Description

The program performs the following steps:

1. Reads data points from a CSV file, where each data point has x, y, and z coordinates.
2. Displays the read data points to the user.
3. Prompts the user to enter coordinates (x, y) for estimation and a power value.
4. Calculates the estimated z value using IDW estimation.
5. Displays the estimated z value to the user.

