#include <iostream>
#include <cmath>

const double SPEED_OF_LIGHT = 299792458.0; // Speed of light in meters per second

// Function to calculate time dilation based on relative velocity
double timeDilation(double velocity) {
    return 1.0 / std::sqrt(1.0 - (velocity * velocity / (SPEED_OF_LIGHT * SPEED_OF_LIGHT)));
}

// Function to calculate length contraction based on relative velocity
double lengthContraction(double velocity, double restLength) {
    return restLength * std::sqrt(1.0 - (velocity * velocity / (SPEED_OF_LIGHT * SPEED_OF_LIGHT)));
}

// Function to calculate relativistic velocity addition
double relativisticVelocityAddition(double v1, double v2) {
    return (v1 + v2) / (1.0 + (v1 * v2) / (SPEED_OF_LIGHT * SPEED_OF_LIGHT));
}

int main() {
    double velocity, restLength;

    // User input for velocity and rest length
    std::cout << "Special Relativity Visualizer" << std::endl;
    std::cout << "----------------------------" << std::endl;

    std::cout << "Enter the relative velocity as a fraction of the speed of light (0 to 1): ";
    std::cin >> velocity;

    std::cout << "Enter the rest length of the object (in meters): ";
    std::cin >> restLength;

    // Check if the input velocity is within the valid range (0 to 1)
    if (velocity >= 0.0 && velocity < 1.0) {
        // Calculate time dilation and length contraction
        double timeDilationFactor = timeDilation(velocity * SPEED_OF_LIGHT);
        double timeForObserverAtRest = 1.0; // Time for the observer at rest (t0)
        double timeForMovingObserver = timeDilationFactor * timeForObserverAtRest;

        double contractedLength = lengthContraction(velocity * SPEED_OF_LIGHT, restLength);

        // User input for relative velocity
        double relativeVelocity;
        std::cout << "Enter the relative velocity of another object (as a fraction of the speed of light): ";
        std::cin >> relativeVelocity;

        // Check if the relative velocity input is within the valid range (0 to 1)
        if (relativeVelocity >= 0.0 && relativeVelocity < 1.0) {
            // Calculate relativistic velocity addition
            double relativeVelocityCombined = relativisticVelocityAddition(velocity, relativeVelocity);

            // Output the relativistic velocity addition
            std::cout << "The relativistic velocity addition of " << velocity << "c and " << relativeVelocity << "c is "
                      << relativeVelocityCombined << "c." << std::endl;
        } else {
            std::cout << "Error: Relative velocity must be between 0 and 1 (non-inclusive)." << std::endl;
        }

        // Output time dilation, time for moving observer, and length contraction
        std::cout << "Time dilation factor (γ): " << timeDilationFactor << std::endl;
        std::cout << "Time for the moving observer: " << timeForMovingObserver << " seconds" << std::endl;
        std::cout << "Length contraction factor: " << restLength << " meters to " << contractedLength << " meters" << std::endl;
    } else {
        std::cout << "Error: Velocity must be between 0 and 1 (non-inclusive)." << std::endl;
    }

    return 0;
}
