#include <iostream>
#include <cmath>

const double G = 6.67430e-11; // Universal gravitational constant in m^3/kg/s^2

class CelestialBody {
public:
    double mass;
    double x, y; // Position
    double vx, vy; // Velocity

    CelestialBody(double m, double xPos, double yPos, double xVel, double yVel)
        : mass(m), x(xPos), y(yPos), vx(xVel), vy(yVel) {}
};

class Spacecraft {
public:
    double mass;
    double x, y;
    double vx, vy;

    Spacecraft(double m, double xPos, double yPos, double xVel, double yVel)
        : mass(m), x(xPos), y(yPos), vx(xVel), vy(yVel) {}

    void updatePosition(double dt) {
        x += vx * dt;
        y += vy * dt;
    }

    void applyGravitationalForce(const CelestialBody& body, double dt) {
        double dx = body.x - x;
        double dy = body.y - y;
        double r = std::sqrt(dx * dx + dy * dy);
        double F = (G * mass * body.mass) / (r * r);

        double ax = F * (dx / r) / mass;
        double ay = F * (dy / r) / mass;

        vx += ax * dt;
        vy += ay * dt;
    }
};

int main() {
    // User input for celestial body
    double planetMass, planetX, planetY, planetVx, planetVy;
    std::cout << "Enter planet mass: ";
    std::cin >> planetMass;
    std::cout << "Enter planet initial position (x y): ";
    std::cin >> planetX >> planetY;
    std::cout << "Enter planet initial velocity (vx vy): ";
    std::cin >> planetVx >> planetVy;

    // Define celestial body (planet)
    CelestialBody planet(planetMass, planetX, planetY, planetVx, planetVy);

    // User input for spacecraft
    double spacecraftMass, spacecraftX, spacecraftY, spacecraftVx, spacecraftVy;
    std::cout << "Enter spacecraft mass: ";
    std::cin >> spacecraftMass;
    std::cout << "Enter spacecraft initial position (x y): ";
    std::cin >> spacecraftX >> spacecraftY;
    std::cout << "Enter spacecraft initial velocity (vx vy): ";
    std::cin >> spacecraftVx >> spacecraftVy;

    // Define spacecraft
    Spacecraft spacecraft(spacecraftMass, spacecraftX, spacecraftY, spacecraftVx, spacecraftVy);

    double dt = 1.0; // Time step in seconds
    double simulationTime = 3600.0; // Total simulation time in seconds

    for (double time = 0.0; time <= simulationTime; time += dt) {
        spacecraft.applyGravitationalForce(planet, dt);
        spacecraft.updatePosition(dt);
    }

    std::cout << "Spacecraft's final position: (" << spacecraft.x << ", " << spacecraft.y << ")\n";

    return 0;
}
