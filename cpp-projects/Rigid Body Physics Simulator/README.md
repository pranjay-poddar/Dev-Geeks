## Rigid Body Physics Simulator

The Physics Management System is a C++ program that simulates the physics of multiple rigid bodies in a 2D space. The program applies forces such as gravity and friction to the bodies and checks for collisions between them. It uses basic collision detection algorithms to handle collisions and resolves them using conservation of momentum and restitution.

# How to Use

- Run the program.

- Enter the number of rigid bodies to simulate when prompted.

- For each rigid body, provide the following parameters:
        1. Position (x y): The initial position of the body in the 2D space.
        2. Velocity (x y): The initial velocity of the body in the x and y directions.
        3. Mass: The mass of the body.
        4. For circles:
            Radius: The radius of the circle.
        5. For boxes:
            Size (width height): The width and height of the box.

- The program will simulate the physics of the rigid bodies over a specified number of iterations.

## Physics Simulation

The simulation applies basic physics principles, including gravity and friction, to each rigid body. It also ensures that the bodies stay within the bounds of the simulation space (assumed to be a rectangle with corners at (0, 0) and (100, 100)).

# Collision Detection

The program supports collision detection between the following types of rigid bodies

# Collision Resolution

When a collision is detected, the program resolves the collision by calculating the impulse and applying changes to the velocities of the colliding bodies. The conservation of momentum and restitution (bounciness) are used in collision resolution.
