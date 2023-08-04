#include <iostream>
#include <vector>
#include <string>
#include <cmath>
#include <limits> // For numeric_limits

class Component {
public:
int value;
    Component(double value) : value(value) {}
    virtual double getValue() const = 0;
    virtual char getType() const = 0;
};

class Resistor : public Component {
public:
    Resistor(double resistance) : Component(resistance) {}
    double getValue() const override { return value; }
    char getType() const override { return 'R'; }
};

class Capacitor : public Component {
public:
    Capacitor(double capacitance) : Component(capacitance) {}
    double getValue() const override { return value; }
    char getType() const override { return 'C'; }
};

class Inductor : public Component {
public:
    Inductor(double inductance) : Component(inductance) {}
    double getValue() const override { return value; }
    char getType() const override { return 'L'; }
};

class Circuit {
public:
    void addComponent(Component* component) { components.push_back(component); }
    double getTotalResistance() const;
    double getTotalCapacitance() const;
    double getTotalInductance() const;
    double getTotalImpedance(double frequency) const;

private:
    std::vector<Component*> components;
};

double Circuit::getTotalResistance() const {
    double totalResistance = 0.0;
    for (const Component* component : components) {
        if (component->getType() == 'R') {
            totalResistance += component->getValue();
        }
    }
    return totalResistance;
}

double Circuit::getTotalCapacitance() const {
    double totalCapacitance = 0.0;
    for (const Component* component : components) {
        if (component->getType() == 'C') {
            totalCapacitance += component->getValue();
        }
    }
    return totalCapacitance;
}

double Circuit::getTotalInductance() const {
    double totalInductance = 0.0;
    for (const Component* component : components) {
        if (component->getType() == 'L') {
            totalInductance += component->getValue();
        }
    }
    return totalInductance;
}

double Circuit::getTotalImpedance(double frequency) const {
    double totalImpedance = 0.0;
    for (const Component* component : components) {
        if (component->getType() == 'R') {
            totalImpedance += component->getValue();
        } else if (component->getType() == 'C') {
            totalImpedance += 1.0 / (2 * M_PI * frequency * component->getValue());
        } else if (component->getType() == 'L') {
            totalImpedance += 2 * M_PI * frequency * component->getValue();
        }
    }
    return totalImpedance;
}

double getValidFrequency() {
    double frequency;
    while (true) {
        std::cout << "Enter the frequency for AC impedance calculation (in Hz): ";
        if (std::cin >> frequency) {
            // Input is a valid number
            return frequency;
        } else {
            // Clear the input buffer and ignore the invalid input
            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
            std::cout << "Invalid input. Please enter a valid numeric value.\n";
        }
    }
}

int main() {
    Circuit circuit;

    std::cout << "Electrical Circuit Analyzer\n";
    std::cout << "Enter the number of components: ";
    int numComponents;
    std::cin >> numComponents;

    for (int i = 0; i < numComponents; ++i) {
        std::cout << "Component " << i + 1 << ":\n";
        std::cout << "Enter component type (R for resistor, C for capacitor, L for inductor): ";
        char componentType;
        std::cin >> componentType;

        double value;
        std::cout << "Enter component value: ";
        std::cin >> value;

        if (componentType == 'R') {
            circuit.addComponent(new Resistor(value));
        } else if (componentType == 'C') {
            circuit.addComponent(new Capacitor(value));
        } else if (componentType == 'L') {
            circuit.addComponent(new Inductor(value));
        } else {
            std::cout << "Invalid component type. Skipping...\n";
        }
    }

    double totalResistance = circuit.getTotalResistance();
    double totalCapacitance = circuit.getTotalCapacitance();
    double totalInductance = circuit.getTotalInductance();

    std::cout << "Total Resistance: " << totalResistance << " ohms\n";
    std::cout << "Total Capacitance: " << totalCapacitance << " farads\n";
    std::cout << "Total Inductance: " << totalInductance << " henrys\n";

    double frequency = getValidFrequency();
    double totalImpedance = circuit.getTotalImpedance(frequency);
    std::cout << "Total Impedance at " << frequency << " Hz: " << totalImpedance << " ohms\n";

    return 0;
}
