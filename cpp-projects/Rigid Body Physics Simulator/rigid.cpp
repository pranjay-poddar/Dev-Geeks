#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm> // For std::min and std::max

const double GRAVITY = 9.81; // Acceleration due to gravity (m/s^2)
const double FRICTION_COEFFICIENT = 0.2; // Friction coefficient

struct Vec2D {
    double x, y;
};

struct RigidBody {
    Vec2D position;
    Vec2D velocity;
    double mass;
    double radius; // For circles
    Vec2D size;    // For boxes
};

bool CheckCollisionCircleCircle(const RigidBody& body1, const RigidBody& body2) {
    double distance = sqrt(pow(body1.position.x - body2.position.x, 2) + pow(body1.position.y - body2.position.y, 2));
    return distance < body1.radius + body2.radius;
}

bool CheckCollisionCircleBox(const RigidBody& circle, const RigidBody& box) {
    // Implement collision detection between a circle and a box
    // ...

    return false;
}

bool CheckCollisionBoxBox(const RigidBody& box1, const RigidBody& box2) {
    // Implement collision detection between two boxes (axis-aligned rectangles)
    // ...

    return false;
}

void ResolveCollision(RigidBody& body1, RigidBody& body2) {
    // Calculate impulse and apply changes to velocities
    // ...

    // Apply conservation of momentum and restitution for bounciness
    // ...
}

void ApplyFriction(RigidBody& body) {
    // Apply friction to the body's velocity
    body.velocity.x *= (1.0 - FRICTION_COEFFICIENT);
    body.velocity.y *= (1.0 - FRICTION_COEFFICIENT);
}

void SimulatePhysics(std::vector<RigidBody>& bodies, double deltaTime) {
    // Apply forces and update positions
    for (RigidBody& body : bodies) {
        body.velocity.y += GRAVITY * deltaTime; // Apply gravity
        body.position.x += body.velocity.x * deltaTime;
        body.position.y += body.velocity.y * deltaTime;

        ApplyFriction(body);

        // Boundary conditions - prevent objects from going out of bounds
        // (Assuming a simulation space with corners at (0, 0) and (100, 100))
        body.position.x = std::min(std::max(body.position.x, 0.0), 100.0);
        body.position.y = std::min(std::max(body.position.y, 0.0), 100.0);
    }

    // Check for collisions and resolve them
    for (size_t i = 0; i < bodies.size(); ++i) {
        for (size_t j = i + 1; j < bodies.size(); ++j) {
            if (CheckCollisionCircleCircle(bodies[i], bodies[j])) {
                ResolveCollision(bodies[i], bodies[j]);
            } else if (CheckCollisionCircleBox(bodies[i], bodies[j])) {
                ResolveCollision(bodies[i], bodies[j]);
            } else if (CheckCollisionBoxBox(bodies[i], bodies[j])) {
                ResolveCollision(bodies[i], bodies[j]);
            }
        }
    }
}

int main() {
    // Create a physics management system

    std::vector<RigidBody> bodies;
    int numBodies;

    std::cout << "Physics Management System\n";
    std::cout << "Enter the number of rigid bodies to simulate: ";
    std::cin >> numBodies;

    // Input parameters for each rigid body
    for (int i = 0; i < numBodies; ++i) {
        RigidBody body;
        std::cout << "Rigid Body " << i + 1 << ":\n";
        std::cout << "Enter position (x y): ";
        std::cin >> body.position.x >> body.position.y;
        std::cout << "Enter velocity (x y): ";
        std::cin >> body.velocity.x >> body.velocity.y;
        std::cout << "Enter mass: ";
        std::cin >> body.mass;
        std::cout << "Enter radius (for circles) or size (width height) for boxes: ";
        std::cin >> body.radius >> body.size.x >> body.size.y;

        bodies.push_back(body);
    }

    // Simulation loop
    double deltaTime = 0.01; // Time step for simulation
    int numIterations = 1000; // Number of simulation iterations

    std::cout << "Simulation starts...\n";
    for (int i = 0; i < numIterations; ++i) {
        SimulatePhysics(bodies, deltaTime);

        // Print positions after each iteration
        for (const RigidBody& body : bodies) {
            std::cout << "Position: (" << body.position.x << ", " << body.position.y << ")\n";
        }
    }
    std::cout << "Simulation ends.\n";

    return 0;
}
