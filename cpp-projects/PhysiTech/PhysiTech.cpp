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
        {"Robotics", " : Use kinematics principles to control the motion of robotic systems, such as robot arms or mobile robots.\nApply forward and inverse kinematics to determine the position, velocity, and acceleration of robot parts, allowing precise control and coordination."}
    };

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
        cout << "Displacement: " << disp << endl<< endl;
        cout << "Acceleration: " << acc << endl<< endl;
        cout << "Final Velocity: " << v << endl<< endl;
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

int main()
{
    int choice;
    cout<<endl<<endl;
    cout << "WELCOME TO PHYSITECH" << endl<<endl;
    cout << "1. Kinematics\n\n2. Dynamics" << endl<<endl;
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
    }

    return 0;
}
