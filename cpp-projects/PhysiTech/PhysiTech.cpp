#include <iostream>
#include <map>
#include <string>
#include <math.h>
using namespace std;

void Dynamics()
{
    map<string, string> LawsOfMotion = {
        {"First Law", " : Newton's First Law of Motion, also known as the Law of Inertia, states that an object at rest will stay at rest, and an object in motion will stay in motion with the same velocity, unless acted upon by an external force."},
        {"Second Law", " : Newton's Second Law of Motion states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. The formula is F = ma, where F represents the net force, m represents the mass of the object, and a represents the acceleration."},
        {"Third Law", " : Newton's Third Law of Motion states that for every action, there is an equal and opposite reaction. When an object exerts a force on another object, the second object exerts an equal and opposite force on the first object."},
    };

    map<string, string> Concepts = {
        {"Force", " : Force is a vector quantity that causes an object to accelerate or change its state of motion. It can be described as a push or pull exerted on an object."},
        {"Mass", " : Mass is a measure of the amount of matter in an object. It determines the object's inertia and resistance to changes in motion."},
        {"Acceleration", " : Acceleration is the rate at which an object's velocity changes over time. It is directly proportional to the net force acting on the object and inversely proportional to its mass."},
        {"Friction", " : Friction is a force that opposes the motion of objects in contact. It arises due to the interaction between surfaces and affects the speed and direction of an object's motion."},
        {"Impulse", " : Impulse is the product of the average force exerted on an object and the time interval over which the force acts. It causes a change in momentum of the object."},
        {"Momentum", " : Momentum is the product of an object's mass and its velocity. It represents the quantity of motion possessed by an object."},
    };

    map<string, string> Applications = {
        {"Sports", " : Dynamics principles are applied in various sports to enhance performance, analyze techniques, and improve safety. Examples include understanding the mechanics of throwing, hitting, and jumping in sports like baseball, golf, and high jump."},
        {"Engineering", " : Dynamics principles are essential in engineering disciplines. They are used in designing structures, analyzing the motion of mechanical systems, and calculating forces in different engineering applications."},
        {"Collision Analysis", " : Dynamics principles are used to analyze collisions between objects. By studying the conservation of momentum and energy, collision analysis helps understand the behavior of objects before and after impact."},
    };

    int choice;
    cout << "-------------------------------------------" << endl;
    cout << "DYNAMICS" << endl;
    cout << "-------------------------------------------" << endl;
    cout << "1. Laws of Motion and their Significance\n\n2. Explanation of Force, Mass, and Acceleration\n\n3. Frictional Forces\n\n4. Impulse, Momentum, and Collision Analysis\n\n5. Applications of Dynamics Principles\n\n6. Calculation of Force\n\n7. Calculation of Momentum\n\n8. Calculation of Impulse" << endl;
    cout << "Enter choice: ";
    cin >> choice;

    switch (choice)
    {
    case 1:
        cout << "-------------------------------------------" << endl;
        cout << "Laws of Motion and their Significance" << endl;
        cout << "-------------------------------------------" << endl;
        cout << endl;
        for (auto i : LawsOfMotion)
        {
            cout << i.first << i.second << endl;
            cout << endl;
            cout << "-------------------------------------------" << endl;
            cout << endl;
        }
        break;

    case 2:
        cout << "-------------------------------------------" << endl;
        cout << "Explanation of Force, Mass, and Acceleration" << endl;
        cout << "-------------------------------------------" << endl;
        cout << endl;
        for (auto i : Concepts)
        {
            cout << i.first << i.second << endl;
            cout << endl;
            cout << "-------------------------------------------" << endl;
            cout << endl;
        }
        break;

    case 3:
        cout << "-------------------------------------------" << endl;
        cout << "Frictional Forces" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Friction is a force that opposes the motion of objects in contact.\nIt can be classified into-:\n\nStatic Friction: When there is no relative motion between the surfaces\nKinetic Friction: When there is relative motion.\n\nFrictional forces affect the speed, acceleration, and motion of objects in various contexts,\nsuch as vehicles on road surfaces or the interaction between objects in mechanical systems." << endl;
        break;

    case 4:
        cout << "-------------------------------------------" << endl;
        cout << "Impulse, Momentum, and Collision Analysis" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Impulse is the product of the average force applied to an object and the time interval over which the force acts. It causes a change in the object's momentum.\n\nMomentum is the product of an object's mass and velocity and represents the quantity of motion.\n\nCollision analysis involves studying the behavior of objects before and after collision, considering the principles of conservation of momentum and energy." << endl;
        break;

    case 5:
        cout << "-------------------------------------------" << endl;
        cout << "Applications of Dynamics Principles" << endl;
        cout << "-------------------------------------------" << endl;
        cout << endl;
        for (auto i : Applications)
        {
            cout << i.first << i.second << endl;
            cout << endl;
            cout << "-------------------------------------------" << endl;
            cout << endl;
        }
        break;

    case 6:
        double mass, acceleration;
        cout << "-------------------------------------------" << endl;
        cout << "Calculation of Force" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Enter the mass of the object: ";
        cin >> mass;
        cout << "Enter the acceleration of the object: ";
        cin >> acceleration;
        cout << "The force acting on the object is: " << mass * acceleration << endl;
        break;

    case 7:
        double momentum, velocity;
        cout << "-------------------------------------------" << endl;
        cout << "Calculation of Momentum" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Enter the mass of the object: ";
        cin >> mass;
        cout << "Enter the velocity of the object: ";
        cin >> velocity;
        cout << "The momentum of the object is: " << mass * velocity << endl;
        break;

    case 8:
        double force, time;
        cout << "-------------------------------------------" << endl;
        cout << "Calculation of Impulse" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Enter the force applied to the object: ";
        cin >> force;
        cout << "Enter the time interval over which the force acts: ";
        cin >> time;
        cout << "The impulse experienced by the object is: " << force * time << endl;
        break;
    }
}

void Kinematics()
{

    map<string, string> Definitions = {
        {"DISPLACEMENT", " : Displacement refers to the change in position of an object in a particular direction.\nIt is a vector quantity that measures both the magnitude and direction of the change in position."},
        {"VELOCITY", " : Velocity is the rate at which an object changes its position. It is a vector quantity that combines speed\n(magnitude of velocity) with the direction of motion.\nVelocity can be calculated by dividing the change in displacement by the change in time."},
        {"ACCELERATION", " : Acceleration is the rate at which an object changes its velocity. It is a vector quantity that measures the\nchange in velocity per unit of time.\nAcceleration can be positive (speeding up) or negative (slowing down) depending on the direction of the change in velocity."},
        {"TIME", " : Time is a fundamental concept in physics that represents the progression of events from the past to the present and\ninto the future. It is a scalar quantity and is typically measured in seconds."}};

    map<string, string> applications = {
        {"Projectile Motion", " :  Calculate the trajectory of a projectile, such as a thrown ball or a launched rocket, considering the initial velocity, launch angle, and gravitational acceleration.\nThis involves applying kinematic equations to determine the projectile's height, range, and time of flight."},
        {"Free Fall", " : Calculate the motion of objects in free fall under the influence of gravity.\nUse kinematic equations to determine the time it takes for an object to fall from a certain height or the velocity it reaches at a given time."},
        {"Vehicle Motion", " : Analyze the motion of vehicles, such as cars, bicycles, or trains.\nUse kinematics principles to determine their acceleration, velocity, and displacement over time.\nFor example, calculate the distance traveled by a car given its initial velocity and acceleration."},
        {"Sports", " : Apply kinematics principles to analyze the performance of athletes in sports.\nCalculate the speed, acceleration, and displacement of athletes during events like sprinting, long jump, or high jump."},
        {"Robotics", " : Use kinematics principles to control the motion of robotic systems, such as robot arms or mobile robots.\nApply forward and inverse kinematics to determine the position, velocity, and acceleration of robot parts, allowing precise control and coordination."}};

    int choice;
    cout << "-------------------------------------------" << endl;
    cout << "KINEMATICS" << endl;
    cout << "-------------------------------------------" << endl;
    cout << "1. Definitions and explanations of key terms\n\n2. Formulas and equations for kinematic quantities\n\n3. Calculation of Displacement, Velocity, Acceleration\n\n4. Applications of Kinematics Principles" << endl;
    cout << "Enter choice " << endl;
    cin >> choice;

    switch (choice)
    {

    case 1:
        cout << "-------------------------------------------" << endl;
        cout << "Definitions and Explanations of Key Terms" << endl;
        cout << "-------------------------------------------" << endl;
        cout << endl;
        for (auto i : Definitions)
        {
            cout << i.first << " " << i.second << endl;
            cout << endl;
            cout << "-------------------------------------------" << endl;
            cout << endl;
        }
        break;

    case 2:
        cout << "-------------------------------------------" << endl;
        cout << "Formulas and Equations" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Consider the Following Abbreviations-:" << endl;
        cout << "Displacement(s)\nInitial Velocity(u)\nFinal Velocity(v)\nAcceleration(a)\nTime(t)" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Basic Formulas" << endl;
        cout << "1. v = s/t\n2. a = v-u/t" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Kinematics Equations" << endl;
        cout << "1. s = u*t + 0.5*a*t^2\n2. v = u + a*t\n3. v^2 = u^2 + 2a*s" << endl;
        break;

    case 3:
        double initialVel, initialPos, finalPos, time;
        double disp, acc, v;
        cout << "-------------------------------------------" << endl;
        cout << "Calculation" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Enter initial position of particle: ";
        cin >> initialPos;
        cout << endl;
        cout << "Enter final position of particle: ";
        cin >> finalPos;
        cout << endl;
        cout << "Enter initial velocity of particle: ";
        cin >> initialVel;
        cout << endl;
        cout << "Enter time: ";
        cin >> time;
        cout << endl;
        disp = (finalPos - initialPos);
        acc = 2 * (disp - initialVel * time) / pow(time, 2);
        v = (initialVel + acc * time);
        cout << "-------------------------------------------" << endl;
        cout << "Displacement: " << disp << endl
             << endl;
        cout << "Acceleration: " << acc << endl
             << endl;
        cout << "Final Velocity: " << v << endl
             << endl;
        break;
    case 4:
        cout << "-------------------------------------------" << endl;
        cout << "Applications" << endl;
        cout << "-------------------------------------------" << endl
             << endl;
        for (auto i : applications)
        {
            cout << i.first << " " << i.second << endl;
            cout << endl;
            cout << "-------------------------------------------" << endl;
            cout << endl;
        }
        break;
    }
}

void Thermodynamic()
{

    map<string, string> Laws = {
        {"Zeroth Law", " : The Zeroth Law of Thermodynamics states that if two systems are in thermal equilibrium with a third system, then they are in thermal equilibrium with each other."},
        {"First Law", " : The First Law of Thermodynamics, also known as the Law of Energy Conservation, states that energy cannot be created or destroyed in an isolated system. It can only be transferred or converted from one form to another."},
        {"Second Law", " : The Second Law of Thermodynamics states that the entropy of an isolated system always increases over time. It implies that processes tend to move from a state of lower entropy to a state of higher entropy."},
        {"Third Law", " : The Third Law of Thermodynamics states that it is impossible to reach absolute zero (0 Kelvin or -273.15 degrees Celsius) through any finite number of processes."},
    };

    map<string, string> Concepts = {
        {"Temperature", " : Temperature is a measure of the average kinetic energy of the particles in a substance. It determines the direction of heat flow between two objects in thermal contact."},
        {"Heat", " : Heat is the transfer of thermal energy between two objects due to a temperature difference. It flows from objects at higher temperature to objects at lower temperature."},
        {"Work", " : Work is the transfer of energy that occurs when a force is applied to an object and it moves in the direction of the force."},
        {"Entropy", " : Entropy is a measure of the degree of disorder or randomness in a system. It quantifies the number of microstates corresponding to a given macrostate."},
        {"Enthalpy", " : Enthalpy is the total heat content of a system, including both the internal energy and the work done by or on the system."},
    };
    map<string, string> LawsApplications = {
        {"Thermal Equilibrium", " : Understanding thermal equilibrium is crucial in many applications, such as designing efficient heat exchangers, analyzing temperature distribution in systems, and optimizing thermal processes."},
        {"Heat Engines", " : Heat engines convert thermal energy into mechanical work. They are used in power plants, automobiles, and other systems where energy conversion is required."},
        {"Refrigerators", " : Refrigerators and heat pumps are devices that transfer heat from a lower temperature region to a higher temperature region. They are commonly used in cooling systems and refrigeration applications."},
        {"Entropy and Efficiency", " : The concept of entropy is central to understanding the efficiency of energy conversion processes. By analyzing entropy changes, one can assess the efficiency and performance of various systems."},
        {"Thermodynamic Processes", " : Understanding thermodynamic processes, such as isothermal, adiabatic, isobaric, and isochoric processes, helps analyze and design systems involving energy transfer and work."},
    };

    int choice;
    cout << "-------------------------------------------" << endl;
    cout << "THERMODYNAMICS" << endl;
    cout << "-------------------------------------------" << endl;
    cout << "1. Laws of Thermodynamics\n\n2. Explanation of Key Concepts\n\n3. Applications of Thermodynamics\n\n4. Calculation of Heat\n\n5. Calculation of Work" << endl;
    cout << "Enter choice: ";
    cin >> choice;

    switch (choice)
    {
    case 1:
        cout << "-------------------------------------------" << endl;
        cout << "Laws of Thermodynamics" << endl;
        cout << "-------------------------------------------" << endl;
        cout << endl;
        for (auto i : Laws)
        {
            cout << i.first << i.second << endl;
            cout << endl;
            cout << "-------------------------------------------" << endl;
            cout << endl;
        }
        break;
    case 2:
        cout << "-------------------------------------------" << endl;
        cout << "Explanation of Key Concepts" << endl;
        cout << "-------------------------------------------" << endl;
        cout << endl;
        for (auto i : Concepts)
        {
            cout << i.first << i.second << endl;
            cout << endl;
            cout << "-------------------------------------------" << endl;
            cout << endl;
        }
        break;
    case 3:
        cout << "-------------------------------------------" << endl;
        cout << "Applications of Thermodynamics" << endl;
        cout << "-------------------------------------------" << endl;
        cout << endl;
        for (auto i : LawsApplications)
        {
            cout << i.first << i.second << endl;
            cout << endl;
            cout << "-------------------------------------------" << endl;
            cout << endl;
        }
        break;
    case 4:
        double heat, temperature;
        cout << "-------------------------------------------" << endl;
        cout << "Calculation of Heat" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Enter the amount of heat transferred: ";
        cin >> heat;
        cout << "Enter the change in temperature: ";
        cin >> temperature;
        cout << "The heat capacity of the system is: " << heat / temperature << endl;
        break;
    case 5:
        double pressure, volumeChange, work;
        cout << "-------------------------------------------" << endl;
        cout << "Calculation of Work (Isobaric Process)" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Enter the pressure: ";
        cin >> pressure;
        cout << "Enter the change in volume: ";
        cin >> volumeChange;
        work = pressure * volumeChange;
        cout << "The work done in the isobaric process is: " << work << " Joules" << endl;
        break;
    }
}

void Optics()
{
    double indexRefraction;
    double angleOfIncidence, angleOfRefraction, indexRefractionMedium;
    double speedOfLight, speedInMedium;
    double angleOfReflection;
    map<string, string> Laws = {
        {"Snell's Law", " : Snell's law describes the relationship between the angles of incidence and refraction when light passes through a boundary between two different media."},
        {"Reflection", " : Reflection is the bouncing back of light rays from a surface. It follows the law of reflection, which states that the angle of incidence is equal to the angle of reflection."},
        {"Refraction", " : Refraction is the bending of light as it passes from one medium to another. It is governed by Snell's law."},
        {"Lens Formula", " : The lens formula relates the object distance (u), image distance (v), and focal length (f) of a lens. It can be used to determine the characteristics of image formation by lenses."},
        {"Dispersion", " : Dispersion refers to the separation of white light into its component colors (wavelengths) when it passes through a prism or a medium with varying refractive indices."},
    };

    map<string, string> Concepts = {
        {"Optical Fiber", " : An optical fiber is a thin, flexible strand of glass or plastic that can transmit light signals over long distances with minimal loss of signal strength."},
        {"Mirrors", " : Mirrors are smooth, highly reflective surfaces that can produce virtual or real images through reflection."},
        {"Lenses", " : Lenses are transparent objects with curved surfaces that refract light and can produce images."},
        {"Interference", " : Interference is a phenomenon that occurs when two or more light waves overlap and create regions of constructive and destructive interference, resulting in patterns of light and dark areas."},
        {"Polarization", " : Polarization refers to the orientation of the electric field component of a light wave. Polarizers can selectively transmit light waves with specific polarization orientations."},
    };
    map<string, string> LawsApplications = {
        {"Optical Instruments", " : Optics laws and principles are applied in the design and functioning of various optical instruments, such as microscopes, telescopes, cameras, and spectrometers."},
        {"Fiber Optic Communication", " : Fiber optics plays a crucial role in long-distance communication systems, where light signals are transmitted through optical fibers, enabling high-speed data transfer."},
        {"Lens Design and Imaging", " : Optics principles are utilized in designing lenses for various applications, such as cameras, eyeglasses, and telescopes, to achieve desired image formation and optical properties."},
        {"Holography", " : Holography is a technique that captures and reproduces three-dimensional images using the interference patterns of light waves."},
        {"Optical Coatings", " : Optical coatings, such as anti-reflective coatings, are applied to optical surfaces to minimize reflection, enhance transmission, and improve overall optical performance."},
    };

    int choice;
    cout << "-------------------------------------------" << endl;
    cout << "OPTICS" << endl;
    cout << "-------------------------------------------" << endl;
    cout << "1. Laws of Optics\n\n2. Explanation of Key Concepts\n\n3. Applications of Optics\n\n4. Calculation of Index of Refraction\n\n5. Calculation of Snell's Law\n\n6. Reflection and Refraction Calculations\n\n7. Calculation of Focal Length and Magnification" << endl;
    cout << "Enter choice: ";
    cin >> choice;

    switch (choice)
    {
    case 1:
        cout << "-------------------------------------------" << endl;
        cout << "Laws of Optics" << endl;
        cout << "-------------------------------------------" << endl;
        cout << endl;
        for (auto i : Laws)
        {
            cout << i.first << i.second << endl;
            cout << endl;
            cout << "-------------------------------------------" << endl;
            cout << endl;
        }
        break;
    case 2:
        cout << "-------------------------------------------" << endl;
        cout << "Explanation of Key Concepts" << endl;
        cout << "-------------------------------------------" << endl;
        cout << endl;
        for (auto i : Concepts)
        {
            cout << i.first << i.second << endl;
            cout << endl;
            cout << "-------------------------------------------" << endl;
            cout << endl;
        }
        break;
    case 3:
        cout << "-------------------------------------------" << endl;
        cout << "Applications of Optics" << endl;
        cout << "-------------------------------------------" << endl;
        cout << endl;
        for (auto i : LawsApplications)
        {
            cout << i.first << i.second << endl;
            cout << endl;
            cout << "-------------------------------------------" << endl;
            cout << endl;
        }
        break;
    case 4:
        cout << "-------------------------------------------" << endl;
        cout << "Calculation of Index of Refraction" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Enter the speed of light in a vacuum: ";
        cin >> speedOfLight;
        cout << "Enter the speed of light in the medium: ";
        cin >> speedInMedium;
        indexRefraction = speedOfLight / speedInMedium;
        cout << "The index of refraction of the medium is: " << indexRefraction << endl;
        break;
    case 5:
        cout << "-------------------------------------------" << endl;
        cout << "Calculation of Snell's Law" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Enter the angle of incidence: ";
        cin >> angleOfIncidence;
        cout << "Enter the index of refraction of the medium: ";
        cin >> indexRefractionMedium;
        angleOfRefraction = asin(sin(angleOfIncidence) / indexRefractionMedium);
        cout << "The angle of refraction is: " << angleOfRefraction << " radians" << endl;
        break;
    case 6:
        cout << "-------------------------------------------" << endl;
        cout << "Reflection and Refraction Calculations" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Enter the angle of incidence: ";
        cin >> angleOfIncidence;
        cout << "Enter the angle of reflection: ";
        cin >> angleOfReflection;
        cout << "Enter the angle of refraction: ";
        cin >> angleOfRefraction;
        if (angleOfIncidence == angleOfReflection)
        {
            cout << "Reflection follows the law of reflection." << endl;
            if (angleOfIncidence == angleOfRefraction)
            {
                cout << "Refraction follows Snell's law." << endl;
            }
            else
            {
                cout << "Refraction does not follow Snell's law." << endl;
            }
        }
        else
        {
            cout << "Reflection does not follow the law of reflection." << endl;
            if (angleOfIncidence == angleOfRefraction)
            {
                cout << "Refraction follows Snell's law." << endl;
            }
            else
            {
                cout << "Refraction does not follow Snell's law." << endl;
            }
        }
        break;
    case 7:
        double objectDistance, imageDistance, focalLength, magnification;
        cout << "-------------------------------------------" << endl;
        cout << "Calculation of Focal Length and Magnification" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Enter the object distance: ";
        cin >> objectDistance;
        cout << "Enter the image distance: ";
        cin >> imageDistance;
        focalLength = 1 / ((1 / objectDistance) + (1 / imageDistance));
        magnification = -imageDistance / objectDistance;
        cout << "The focal length of the lens is: " << focalLength << endl;
        cout << "The magnification of the lens is: " << magnification << endl;
        break;
    }
}

void Electromagnetism()
{
    double charge, distance, electricField, electricPotential;
    const double k = 8.99e9; // Coulomb's constant
    double voltage, current, resistance;
    double capacitance, inductance;

    map<string, string> Laws = {
        {"Ohm's Law", " : Ohm's law states that the current through a conductor between two points is directly proportional to the voltage across the two points, and inversely proportional to the resistance between them."},
        {"Faraday's Law", " : Faraday's law of electromagnetic induction states that the induced electromotive force (EMF) in a closed circuit is directly proportional to the rate of change of magnetic flux through the circuit."},
        {"Ampere's Law", " : Ampere's law relates the magnetic field around a closed loop to the electric current passing through the loop."},
    };

    map<string, string> Concepts = {
        {"Electric Current", " : Electric current is the flow of electric charge through a conductor per unit of time. It is measured in Amperes (A)."},
        {"Resistance", " : Resistance is the opposition that a material offers to the flow of electric current. It is measured in Ohms (Ω)."},
        {"Voltage", " : Voltage, also known as potential difference, is the electrical potential energy difference between two points in a circuit. It is measured in Volts (V)."},
        {"Magnetic Flux", " : Magnetic flux is the measure of the total magnetic field passing through a given area. It is measured in Weber (Wb)."},
        {"Electromotive Force (EMF)", " : Electromotive force is the potential difference across the terminals of a cell or battery when it is not supplying current."},
        {"Capacitance", " : Capacitance is the ability of a system to store an electric charge. It is measured in Farads (F)."},
        {"Inductance", " : Inductance is the property of an electrical circuit that opposes changes in current. It is measured in Henrys (H)."},
    };

    map<string, string> LawsApplications = {
        {"Electric Circuits", " : Ohm's law is commonly applied in electric circuits to determine the relationship between voltage, current, and resistance."},
        {"Electromagnetic Induction", " : Faraday's law is the basis for generating electricity in generators and the operation of transformers."},
        {"Magnetic Fields", " : Ampere's law is used to calculate the magnetic field generated by current-carrying conductors."},
    };

    int choice;
    cout << "-------------------------------------------" << endl;
    cout << "ELECTROMAGNETISM" << endl;
    cout << "-------------------------------------------" << endl;
    cout << "1. Laws of Electromagnetism\n\n2. Explanation of Key Concepts\n\n3. Applications of Electromagnetism\n\n4. Calculation of Electric Current, Resistance, and Ohm's Law\n\n5. Calculation of Capacitance and Inductance\n\n6. Calculation of Electric Field and Electric Potential" << endl;
    cout << "Enter choice: ";
    cin >> choice;

    switch (choice)
    {
    case 1:
        cout << "-------------------------------------------" << endl;
        cout << "Laws of Electromagnetism" << endl;
        cout << "-------------------------------------------" << endl;
        for (const auto &law : Laws)
        {
            cout << law.first << law.second << endl;
            cout << "-------------------------------------------" << endl;
        }
        break;

    case 2:
        cout << "-------------------------------------------" << endl;
        cout << "Explanation of Key Concepts" << endl;
        cout << "-------------------------------------------" << endl;
        for (const auto &concept : Concepts)
        {
            cout << concept.first << concept.second << endl;
            cout << "-------------------------------------------" << endl;
        }
        break;

    case 3:
        cout << "-------------------------------------------" << endl;
        cout << "Applications of Electromagnetism Laws" << endl;
        cout << "-------------------------------------------" << endl;
        for (const auto &application : LawsApplications)
        {
            cout << application.first << application.second << endl;
            cout << "-------------------------------------------" << endl;
        }
        break;
    case 4:
        cout << "-------------------------------------------" << endl;
        cout << "Calculation of Electric Current, Resistance, and Ohm's Law" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Enter the voltage (V): ";
        cin >> voltage;
        cout << "Enter the resistance (Ohm): ";
        cin >> resistance;
        current = voltage / resistance;
        cout << "The electric current (I) is: " << current << " Amperes" << endl;
        cout << "-------------------------------------------" << endl;
        break;
    case 5:
        cout << "-------------------------------------------" << endl;
        cout << "Calculation of Capacitance and Inductance" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Enter the capacitance (F): ";
        cin >> capacitance;
        cout << "Enter the inductance (H): ";
        cin >> inductance;
        cout << "The capacitance is: " << capacitance << " Farads" << endl;
        cout << "The inductance is: " << inductance << " Henrys" << endl;
        cout << "-------------------------------------------" << endl;
        break;

    case 6:

        cout << "-------------------------------------------" << endl;
        cout << "Calculation of Electric Field and Electric Potential" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Enter the charge (Coulombs): ";
        cin >> charge;
        cout << "Enter the distance from the charge (meters): ";
        cin >> distance;

        electricField = k * charge / pow(distance, 2);
        electricPotential = k * charge / distance;

        cout << "The electric field is: " << electricField << " N/C" << endl;
        cout << "The electric potential is: " << electricPotential << " Volts" << endl;
        cout << "-------------------------------------------" << endl;
        break;
    }
}

void Fluid()
{

    int choice;
    double force, area, pressure;
    double densityFluid, volumeDisplaced, accelerationGravity, buoyantForce;
    double crossSectionalArea, velocity, flowRate;
    map<string, string> FluidProperties = {
        {"Density", " : Density is the mass of a fluid per unit volume. It is typically measured in kilograms per cubic meter (kg/m³)."},
        {"Pressure", " : Pressure is the force exerted by a fluid per unit area. It is typically measured in Pascals (Pa)."},
        {"Viscosity", " : Viscosity is the measure of a fluid's resistance to flow. It is a property that determines whether a fluid is thick (high viscosity) or thin (low viscosity)."},
        {"Surface Tension", " : Surface tension is the force that causes the surface of a liquid to behave like a stretched elastic membrane."},
    };

    map<string, string> FluidStatics = {
        {"Pascal's Law", " : Pascal's law states that when there is an increase in pressure at any point in a confined fluid, there is an equal increase at every other point in the container."},
        {"Archimedes' Principle", " : Archimedes' principle states that the buoyant force on an object submerged in a fluid is equal to the weight of the fluid displaced by the object."},
    };

    map<string, string> FluidDynamics = {
        {"Bernoulli's Principle", " : Bernoulli's principle states that in a steady flow of fluid, an increase in the speed of the fluid occurs simultaneously with a decrease in pressure or a decrease in the fluid's potential energy."},
        {"Continuity Equation", " : The continuity equation states that the mass flow rate of a fluid in a closed system remains constant."},
    };

    map<string, string> FlowTypes = {
        {"Laminar Flow", " : Laminar flow is a smooth, orderly flow of fluid in parallel layers with little or no mixing between the layers."},
        {"Turbulent Flow", " : Turbulent flow is a chaotic, irregular flow of fluid characterized by eddies and swirls."},
    };

    map<string, string> FluidFlow = {
        {"Flow in Pipes", " : Fluid flow in pipes is essential in engineering applications, such as water distribution systems and oil pipelines."},
        {"Flow in Channels", " : Fluid flow in channels is relevant to the design of rivers, canals, and open-channel flow systems."},
    };

    map<string, string> Applications = {
        {"Aerodynamics", " : Aerodynamics deals with the study of air and fluid flow around objects, such as airplanes and cars."},
        {"Hydraulics", " : Hydraulics is the use of fluid mechanics in engineering applications, such as construction equipment and hydraulic lifts."},
        {"Weather Forecasting", " : Fluid mechanics plays a crucial role in understanding weather patterns and atmospheric conditions."},
        {"Blood Flow", " : Fluid mechanics is used to study blood flow in the human body and its impact on cardiovascular health."},
    };

    cout << "-------------------------------------------" << endl;
    cout << "FLUID MECHANICS" << endl;
    cout << "-------------------------------------------" << endl;
    cout << "1. Fluid Properties\n\n2. Fluid Statics\n\n3. Fluid Dynamics\n\n4. Types of Flow\n\n5. Fluid Flow in Pipes and Channels\n\n6. Applications of Fluid Mechanics\n\n7. Calculation of Pressure\n\n8. Calculation of Buoyant Force\n\n9. Calculation of Flow Rate" << endl;
    cout << "Enter choice: ";
    cin >> choice;

    switch (choice)
    {
    case 1:
        cout << "-------------------------------------------" << endl;
        cout << "Fluid Properties" << endl;
        cout << "-------------------------------------------" << endl;
        for (const auto &property : FluidProperties)
        {
            cout << property.first << property.second << endl;
            cout << "-------------------------------------------" << endl;
        }
        break;

    case 2:
        cout << "-------------------------------------------" << endl;
        cout << "Fluid Statics" << endl;
        cout << "-------------------------------------------" << endl;
        for (const auto &statics : FluidStatics)
        {
            cout << statics.first << statics.second << endl;
            cout << "-------------------------------------------" << endl;
        }
        break;

    case 3:
        cout << "-------------------------------------------" << endl;
        cout << "Fluid Dynamics" << endl;
        cout << "-------------------------------------------" << endl;
        for (const auto &dynamics : FluidDynamics)
        {
            cout << dynamics.first << dynamics.second << endl;
            cout << "-------------------------------------------" << endl;
        }
        break;

    case 4:
        cout << "-------------------------------------------" << endl;
        cout << "Types of Flow" << endl;
        cout << "-------------------------------------------" << endl;
        for (const auto &flow : FlowTypes)
        {
            cout << flow.first << flow.second << endl;
            cout << "-------------------------------------------" << endl;
        }
        break;

    case 5:
        cout << "-------------------------------------------" << endl;
        cout << "Fluid Flow in Pipes and Channels" << endl;
        cout << "-------------------------------------------" << endl;
        for (const auto &fluidFlow : FluidFlow)
        {
            cout << fluidFlow.first << fluidFlow.second << endl;
            cout << "-------------------------------------------" << endl;
        }
        break;

    case 6:
        cout << "-------------------------------------------" << endl;
        cout << "Applications of Fluid Mechanics" << endl;
        cout << "-------------------------------------------" << endl;
        for (const auto &application : Applications)
        {
            cout << application.first << application.second << endl;
            cout << "-------------------------------------------" << endl;
        }
        break;

    case 7:
        cout << "-------------------------------------------" << endl;
        cout << "Calculation of Pressure" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Enter the force (N): ";
        cin >> force;
        cout << "Enter the area (m^2): ";
        cin >> area;
        pressure = force / area;
        cout << "The pressure is: " << pressure << " Pa" << endl;
        cout << "-------------------------------------------" << endl;
        break;

    case 8:
        cout << "-------------------------------------------" << endl;
        cout << "Calculation of Buoyant Force" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Enter the density of the fluid (kg/m^3): ";
        cin >> densityFluid;
        cout << "Enter the volume of the fluid displaced (m^3): ";
        cin >> volumeDisplaced;
        cout << "Enter the acceleration due to gravity (m/s^2): ";
        cin >> accelerationGravity;
        buoyantForce = densityFluid * volumeDisplaced * accelerationGravity;
        cout << "The buoyant force is: " << buoyantForce << " N" << endl;
        cout << "-------------------------------------------" << endl;
        break;

    case 9:
        cout << "-------------------------------------------" << endl;
        cout << "Calculation of Flow Rate" << endl;
        cout << "-------------------------------------------" << endl;
        cout << "Enter the cross-sectional area (m^2): ";
        cin >> crossSectionalArea;
        cout << "Enter the velocity of the fluid (m/s): ";
        cin >> velocity;
        flowRate = crossSectionalArea * velocity;
        cout << "The flow rate is: " << flowRate << " m^3/s" << endl;
        cout << "-------------------------------------------" << endl;
        break;
    }

}

void MechanicsOfMaterials(){

    map<string, string> StressStrain = {
        {"Stress", " : Stress is the force applied to a material per unit area. It measures the internal resistance of a material to deformation."},
        {"Strain", " : Strain is the ratio of the change in length of a material to its original length. It quantifies the material's deformation under stress."},
    };

    map<string, string> ElasticityHookeLaw = {
        {"Elasticity", " : Elasticity is the ability of a material to return to its original shape after the stress is removed."},
        {"Hooke's Law", " : Hooke's Law states that the stress applied to a material is directly proportional to the strain it experiences, as long as the material remains within its elastic limit."},
    };

    map<string, string> MechanicalProperties = {
        {"Young's Modulus", " : Young's Modulus is a measure of a material's stiffness. It relates stress to strain for the material within its elastic limit."},
        {"Yield Strength", " : Yield Strength is the maximum stress a material can withstand without permanent deformation."},
        {"Ultimate Tensile Strength", " : Ultimate Tensile Strength is the maximum stress a material can withstand before fracturing."},
        {"Elongation", " : Elongation is the percentage increase in length of a material when subjected to tensile forces."},
        {"Hardness", " : Hardness is a measure of a material's resistance to deformation, such as indentation or scratching."},
    };

    map<string, string> BendingTorsionShear = {
        {"Bending", " : Bending is the deformation of a material due to an applied load, resulting in curvature."},
        {"Torsion", " : Torsion is the twisting of a material when subjected to torque."},
        {"Shear", " : Shear is the deformation of a material parallel to the applied force."},
    };

    map<string, string> FailureCriteria = {
        {"Factor of Safety", " : Factor of Safety is the ratio of the ultimate strength of a material to the applied working stress. It ensures the safety of structures."},
        {"Mohr's Circle", " : Mohr's Circle is a graphical representation of stress states to determine principal stresses and predict failure."},
    };

    map<string, string> StructuralAnalysis = {
        {"Static Analysis", " : Static Analysis determines the stresses and deformations of structures under external loads."},
        {"Stress Analysis", " : Stress Analysis assesses the stress distribution in a structure to ensure it remains within safe limits."},
    };

    int choice;
    cout << "-------------------------------------------" << endl;
    cout << "MECHANICS OF MATERIALS" << endl;
    cout << "-------------------------------------------" << endl;
    cout << "1. Stress and Strain\n\n2. Elasticity and Hooke's Law\n\n3. Mechanical Properties of Materials\n\n4. Bending, Torsion, and Shear\n\n5. Failure Criteria\n\n6. Structural Analysis\n\n7. Sample Calculations" << endl;
    cout << "Enter choice: ";
    cin >> choice;

    switch (choice)
    {
    case 1:
        cout << "-------------------------------------------" << endl;
        cout << "Stress and Strain" << endl;
        cout << "-------------------------------------------" << endl;
        for (const auto &ss : StressStrain)
        {
            cout << ss.first << ss.second << endl;
            cout << "-------------------------------------------" << endl;
        }
        break;

    case 2:
        cout << "-------------------------------------------" << endl;
        cout << "Elasticity and Hooke's Law" << endl;
        cout << "-------------------------------------------" << endl;
        for (const auto &eh : ElasticityHookeLaw)
        {
            cout << eh.first << eh.second << endl;
            cout << "-------------------------------------------" << endl;
        }
        break;

    case 3:
        cout << "-------------------------------------------" << endl;
        cout << "Mechanical Properties of Materials" << endl;
        cout << "-------------------------------------------" << endl;
        for (const auto &mp : MechanicalProperties)
        {
            cout << mp.first << mp.second << endl;
            cout << "-------------------------------------------" << endl;
        }
        break;

    case 4:
        cout << "-------------------------------------------" << endl;
        cout << "Bending, Torsion, and Shear" << endl;
        cout << "-------------------------------------------" << endl;
        for (const auto &bts : BendingTorsionShear)
        {
            cout << bts.first << bts.second << endl;
            cout << "-------------------------------------------" << endl;
        }
        break;

    case 5:
        cout << "-------------------------------------------" << endl;
        cout << "Failure Criteria" << endl;
        cout << "-------------------------------------------" << endl;
        for (const auto &fc : FailureCriteria)
        {
            cout << fc.first << fc.second << endl;
            cout << "-------------------------------------------" << endl;
        }
        break;

    case 6:
        cout << "-------------------------------------------" << endl;
        cout << "Structural Analysis" << endl;
        cout << "-------------------------------------------" << endl;
        for (const auto &sa : StructuralAnalysis)
        {
            cout << sa.first << sa.second << endl;
            cout << "-------------------------------------------" << endl;
        }
        break;

    case 7:
        double force, crossSectionalArea, stress, changeInLength, originalLength, strain, youngsModulus, shearStress;
        cout << "-------------------------------------------" << endl;
        cout << "Sample Calculations" << endl;
        cout << "-------------------------------------------" << endl;
        int calculationChoice;
        cout << "1. Calculation of Stress\n2. Calculation of Strain\n3. Calculation of Young's Modulus\n4. Calculation of Shear Stress" << endl;
        cout << "Enter choice: ";
        cin >> calculationChoice;
        switch (calculationChoice)
        {
            case 1:
            cout << "-------------------------------------------" << endl;
            cout << "Calculation of Stress" << endl;
            cout << "-------------------------------------------" << endl;
            cout << "Enter the force (N): ";
            cin >> force;
            cout << "Enter the cross-sectional area (m^2): ";
            cin >> crossSectionalArea;
            stress = force / crossSectionalArea;
            cout << "The stress is: " << stress << " Pa" << endl;
            cout << "-------------------------------------------" << endl;
            break;

            case 2:
            cout << "-------------------------------------------" << endl;
            cout << "Calculation of Strain" << endl;
            cout << "-------------------------------------------" << endl;
            cout << "Enter the change in length (m): ";
            cin >> changeInLength;
            cout << "Enter the original length (m): ";
            cin >> originalLength;
            strain = changeInLength / originalLength;
            cout << "The strain is: " << strain << endl;
            cout << "-------------------------------------------" << endl;
            break;

            case 3:
            cout << "-------------------------------------------" << endl;
            cout << "Calculation of Young's Modulus" << endl;
            cout << "-------------------------------------------" << endl;
            cout << "Enter the stress (Pa): ";
            cin >> stress;
            cout << "Enter the strain: ";
            cin >> strain;
            youngsModulus = stress / strain;
            cout << "Young's Modulus is: " << youngsModulus << " Pa" << endl;
            cout << "-------------------------------------------" << endl;
            break;

            case 4:
            cout << "-------------------------------------------" << endl;
            cout << "Calculation of Shear Stress" << endl;
            cout << "-------------------------------------------" << endl;
            double shearForce;
            cout << "Enter the shear force (N): ";
            cin >> shearForce;
            shearStress = shearForce / crossSectionalArea;
            cout << "Shear Stress is: " << shearStress << " Pa" << endl;
            cout << "-------------------------------------------" << endl;
            break;

            default:
            cout << "Invalid choice!" << endl;
        }
        break;
default:
        cout << "Invalid choice!" << endl;
    }
}

    int main()
    {
        int choice;
        cout << endl
             << endl;
        cout << "WELCOME TO PHYSITECH" << endl
             << endl;
        cout << "1. Kinematics\n\n2. Dynamics\n\n3. Thermodynamics\n\n4. Optics\n\n5. Electromagnetism\n\n6. Fluid Mechanics\n\n7. Mechanics of Materials" << endl
             << endl;
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice)
        {
        case 1:
            Kinematics();
            break;
        case 2:
            Dynamics();
            break;
        case 3:
            Thermodynamic();
            break;
        case 4:
            Optics();
            break;
        case 5:
            Electromagnetism();
            break;
        case 6:
            Fluid();
            break;
        case 7:
            MechanicsOfMaterials();
        }

        return 0;
    }
