#include <iostream>
#include <cmath>
#include <limits> // For input validation

class Transformer {
public:
    Transformer(double voltagePrimary, double voltageSecondary, double frequency, double powerRating, double fluxDensity)
        : voltagePrimary(voltagePrimary), voltageSecondary(voltageSecondary), frequency(frequency), powerRating(powerRating), fluxDensity(fluxDensity) {}

    void calculateTurnsRatio() {
        turnsRatio = voltagePrimary / voltageSecondary;
    }

    void calculateCoreArea() {
        coreArea = (powerRating * 1000) / (4.44 * frequency * fluxDensity);
    }

    void calculateWireSize() {
        double currentPrimary = (powerRating * 1000) / voltagePrimary;
        wireSizePrimary = sqrt((2 * resistivity * currentPrimary) / (pi * currentDensity));
        wireSizeSecondary = wireSizePrimary * turnsRatio;
    }

    void calculateEfficiency() {
        // Assuming copper losses are 1.5% and iron losses are 1.0%
        double copperLosses = 0.015 * powerRating * 1000;
        double ironLosses = 0.010 * powerRating * 1000;
        double outputPower = powerRating * 1000 - (copperLosses + ironLosses);
        efficiency = (outputPower / (powerRating * 1000)) * 100;
    }

    void printParameters() {
        std::cout << "Transformer Parameters:\n";
        std::cout << "Turns Ratio: " << turnsRatio << "\n";
        std::cout << "Core Area: " << coreArea << " square centimeters\n";
        std::cout << "Primary Wire Size: " << wireSizePrimary << " mm^2\n";
        std::cout << "Secondary Wire Size: " << wireSizeSecondary << " mm^2\n";
        std::cout << "Efficiency: " << efficiency << "%\n";
    }

private:
    double voltagePrimary;      // Primary voltage (V)
    double voltageSecondary;    // Secondary voltage (V)
    double frequency;           // Frequency (Hz)
    double powerRating;         // Power rating (kVA)
    double fluxDensity;         // Magnetic flux density (Tesla)

    double turnsRatio;          // Calculated turns ratio
    double coreArea;            // Calculated core area (square centimeters)
    double wireSizePrimary;     // Calculated primary wire size (mm^2)
    double wireSizeSecondary;   // Calculated secondary wire size (mm^2)
    double efficiency;          // Calculated transformer efficiency

    const double resistivity = 1.7e-8;     // Copper resistivity (ohm-meter)
    const double currentDensity = 4.0e6;   // Current density for wire sizing (A/m^2)
    const double pi = 3.14159265358979323846;
};

int main() {
    double voltagePrimary, voltageSecondary, frequency, powerRating, fluxDensity;
    
    std::cout << "Transformer Design Calculation\n";
    std::cout << "Enter primary voltage (V): ";
    std::cin >> voltagePrimary;

    std::cout << "Enter secondary voltage (V): ";
    std::cin >> voltageSecondary;

    std::cout << "Enter frequency (Hz): ";
    std::cin >> frequency;

    std::cout << "Enter power rating (kVA): ";
    std::cin >> powerRating;

    std::cout << "Enter magnetic flux density (Tesla): ";
    std::cin >> fluxDensity;

    // Input validation
    if (voltagePrimary <= 0 || voltageSecondary <= 0 || frequency <= 0 || powerRating <= 0 || fluxDensity <= 0) {
        std::cout << "Invalid input. All values should be positive.\n";
        return 1;
    }

    Transformer transformer(voltagePrimary, voltageSecondary, frequency, powerRating, fluxDensity);
    transformer.calculateTurnsRatio();
    transformer.calculateCoreArea();
    transformer.calculateWireSize();
    transformer.calculateEfficiency();
    transformer.printParameters();

    return 0;
}
