#include <iostream>
#include <string>
#include <ctime>
#include <cstdlib>
#include <vector>
#include <algorithm>

using namespace std;

struct Element
{
    string symbol;
    string name;
    double atomicWeight;
    string description;
    double meltingPoint;
    double boilingPoint;
    double density;
    double atomicRadius;
    double electronegativity;
    vector<string> hints;
};

const int MAX_ELEMENTS = 51;
const int MAX_HINTS = 2; // Maximum number of hints for each element
const int FIRST_GUESS_POINTS = 10;
const int SECOND_GUESS_POINTS = 5;
const int WRONG_GUESS_POINTS = 0;

Element elements[MAX_ELEMENTS];

void initializeElements()
{
    // Add elements here
    // Add elements here
    elements[0] = {"H", "Hydrogen", 1.008, "Hydrogen is a chemical element with the symbol H and atomic number 1.", -259.16, -252.87, 0.08988, 53, 2.20, {"The lightest element in the periodic table.", "Its atomic number is 1."}};
    elements[1] = {"He", "Helium", 4.0026, "Helium is a chemical element with the symbol He and atomic number 2.", -272.20, -268.93, 0.1785, 31, -1, {"This element is used in party balloons to make them float.", "Its atomic number is 2."}};
    elements[2] = {"Li", "Lithium", 6.94, "Lithium is a chemical element with the symbol Li and atomic number 3.", 180.54, 1347, 0.534, 167, 0.98, {"This element is often used in rechargeable batteries.", "It has three protons."}};
    elements[3] = {"Be", "Beryllium", 9.0122, "Beryllium is a chemical element with the symbol Be and atomic number 4.", 1287, 2471, 1.85, 112, 1.57, {"This element is used in the aerospace industry.", "It has four protons."}};
    elements[4] = {"B", "Boron", 10.81, "Boron is a chemical element with the symbol B and atomic number 5.", 2076, 3927, 2.34, 87, 2.04, {"This element is used in the production of glass and ceramics.", "It has five protons."}};
    elements[5] = {"C", "Carbon", 12.01, "Carbon is a chemical element with the symbol C and atomic number 6.", 3550, 4827, 2.26, 67, 2.55, {"This element is the basis of organic chemistry.", "It has six protons."}};
    elements[6] = {"N", "Nitrogen", 14.01, "Nitrogen is a chemical element with the symbol N and atomic number 7.", -210.01, -195.79, 0.00125, 56, 3.04, {"This element makes up the majority of Earth's atmosphere.", "It has seven protons."}};
    elements[7] = {"O", "Oxygen", 16.00, "Oxygen is a chemical element with the symbol O and atomic number 8.", -218.79, -182.95, 0.00143, 48, 3.44, {"This element is essential for supporting life.", "It has eight protons."}};
    elements[8] = {"F", "Fluorine", 19.00, "Fluorine is a chemical element with the symbol F and atomic number 9.", -219.62, -188.14, 0.00170, 42, 3.98, {"This element is highly reactive and forms compounds with many other elements.", "It has nine protons."}};
    elements[9] = {"Ne", "Neon", 20.18, "Neon is a chemical element with the symbol Ne and atomic number 10.", -248.59, -246.08, 0.00090, 38, -1, {"This element is often used in neon signs.", "It has ten protons."}};
    elements[10] = {"Na", "Sodium", 22.99, "Sodium is a chemical element with the symbol Na and atomic number 11.", 97.79, 883, 0.971, 190, 0.93, {"This element is a common component of table salt.", "It has eleven protons."}};
    elements[11] = {"Mg", "Magnesium", 24.31, "Magnesium is a chemical element with the symbol Mg and atomic number 12.", 650, 1090, 1.738, 145, 1.31, {"This element is essential for many biological processes.", "It has twelve protons."}};
    elements[12] = {"Al", "Aluminum", 26.98, "Aluminum is a chemical element with the symbol Al and atomic number 13.", 660.32, 2467, 2.70, 118, 1.61, {"This element is widely used in construction and packaging materials.", "It has thirteen protons."}};
    elements[13] = {"Si", "Silicon", 28.09, "Silicon is a chemical element with the symbol Si and atomic number 14.", 1414, 3265, 2.33, 111, 1.90, {"This element is a key component of computer chips.", "It has fourteen protons."}};
    elements[14] = {"P", "Phosphorus", 30.97, "Phosphorus is a chemical element with the symbol P and atomic number 15.", 44.15, 280.5, 1.82, 98, 2.19, {"This element is essential for life and is found in DNA and RNA.", "It has fifteen protons."}};
    elements[15] = {"S", "Sulfur", 32.07, "Sulfur is a chemical element with the symbol S and atomic number 16.", 115.21, 444.72, 2.07, 88, 2.58, {"This element is known for its distinct smell in the form of hydrogen sulfide.", "It has sixteen protons."}};
    elements[16] = {"Cl", "Chlorine", 35.45, "Chlorine is a chemical element with the symbol Cl and atomic number 17.", -101.5, -34.04, 0.00321, 79, 3.16, {"This element is commonly used in water treatment and as a disinfectant.", "It has seventeen protons."}};
    elements[17] = {"Ar", "Argon", 39.95, "Argon is a chemical element with the symbol Ar and atomic number 18.", -189.34, -185.85, 0.00178, 71, -1, {"This element is used in lighting and provides the inert atmosphere in light bulbs.", "It has eighteen protons."}};
    elements[18] = {"K", "Potassium", 39.10, "Potassium is a chemical element with the symbol K and atomic number 19.", 63.38, 759, 0.862, 243, 0.82, {"This element is important for nerve function and maintaining fluid balance in the body.", "It has nineteen protons."}};
    elements[19] = {"K", "Potassium", 39.10, "Potassium is a chemical element with the symbol K and atomic number 19.", 63.38, 759, 0.862, 243, 0.82, {"This element is important for nerve function and maintaining fluid balance in the body.", "It has nineteen protons."}};
    elements[20] = {"Ca", "Calcium", 40.08, "Calcium is a chemical element with the symbol Ca and atomic number 20.", 842, 1484, 1.55, 194, 1.00, {"This element is essential for strong bones and teeth.", "It has twenty protons."}};
    elements[21] = {"Sc", "Scandium", 44.96, "Scandium is a chemical element with the symbol Sc and atomic number 21.", 1541, 2836, 2.99, 184, 1.36, {"This element is used in aerospace and lighting applications.", "It has twenty-one protons."}};
    elements[22] = {"Ti", "Titanium", 47.87, "Titanium is a chemical element with the symbol Ti and atomic number 22.", 1668, 3287, 4.51, 176, 1.54, {"This element is known for its high strength-to-weight ratio.", "It has twenty-two protons."}};
    elements[23] = {"V", "Vanadium", 50.94, "Vanadium is a chemical element with the symbol V and atomic number 23.", 1890, 3380, 6.11, 171, 1.63, {"This element is used in the production of steel.", "It has twenty-three protons."}};
    elements[24] = {"Cr", "Chromium", 52.00, "Chromium is a chemical element with the symbol Cr and atomic number 24.", 1907, 2671, 7.19, 166, 1.66, {"This element is used to make stainless steel.", "It has twenty-four protons."}};
    elements[25] = {"Mn", "Manganese", 54.94, "Manganese is a chemical element with the symbol Mn and atomic number 25.", 1244, 1962, 7.43, 161, 1.55, {"This element is important for the production of steel and batteries.", "It has twenty-five protons."}};
    elements[26] = {"Fe", "Iron", 55.85, "Iron is a chemical element with the symbol Fe and atomic number 26.", 1538, 2861, 7.87, 156, 1.83, {"This element is one of the most abundant metals on Earth.", "It has twenty-six protons."}};
    elements[27] = {"Co", "Cobalt", 58.93, "Cobalt is a chemical element with the symbol Co and atomic number 27.", 1495, 2927, 8.90, 152, 1.88, {"This element is used in the production of rechargeable batteries.", "It has twenty-seven protons."}};
    elements[28] = {"Ni", "Nickel", 58.69, "Nickel is a chemical element with the symbol Ni and atomic number 28.", 1455, 2732, 8.91, 149, 1.91, {"This element is commonly used in alloys, including stainless steel.", "It has twenty-eight protons."}};
    elements[29] = {"Cu", "Copper", 63.55, "Copper is a chemical element with the symbol Cu and atomic number 29.", 1085, 2567, 8.96, 145, 1.90, {"This element is known for its excellent electrical conductivity.", "It has twenty-nine protons."}};
    elements[30] = {"Zn", "Zinc", 65.38, "Zinc is a chemical element with the symbol Zn and atomic number 30.", 419.53, 907, 7.14, 142, 1.65, {"This element is used to coat iron and steel to prevent corrosion.", "It has thirty protons."}};
    elements[31] = {"Ga", "Gallium", 69.72, "Gallium is a chemical element with the symbol Ga and atomic number 31.", 29.76, 2204, 5.91, 136, 1.81, {"This element can melt in your hand due to its low melting point.", "It has thirty-one protons."}};
    elements[32] = {"Ge", "Germanium", 72.63, "Germanium is a chemical element with the symbol Ge and atomic number 32.", 938.25, 2833, 5.32, 125, 2.01, {"This element is used in semiconductor devices.", "It has thirty-two protons."}};
    elements[33] = {"As", "Arsenic", 74.92, "Arsenic is a chemical element with the symbol As and atomic number 33.", 817, 613, 5.73, 114, 2.18, {"This element has a history of use as a poison.", "It has thirty-three protons."}};
    elements[34] = {"Se", "Selenium", 78.97, "Selenium is a chemical element with the symbol Se and atomic number 34.", 221, 685, 4.81, 103, 2.55, {"This element is important for the human body as a trace mineral.", "It has thirty-four protons."}};
    elements[35] = {"Br", "Bromine", 79.90, "Bromine is a chemical element with the symbol Br and atomic number 35.", -7.20, 58.78, 3.12, 94, 2.96, {"This element is a reddish-brown liquid at room temperature.", "It has thirty-five protons."}};
    elements[36] = {"Kr", "Krypton", 83.80, "Krypton is a chemical element with the symbol Kr and atomic number 36.", -157.36, -153.22, 0.00374, 88, 3.00, {"This element is used in certain types of lighting.", "It has thirty-six protons."}};
    elements[37] = {"Rb", "Rubidium", 85.47, "Rubidium is a chemical element with the symbol Rb and atomic number 37.", 38.89, 688, 1.53, 265, 0.82, {"This element is highly reactive and reacts vigorously with water.", "It has thirty-seven protons."}};
    elements[38] = {"Sr", "Strontium", 87.62, "Strontium is a chemical element with the symbol Sr and atomic number 38.", 777, 1382, 2.63, 219, 0.95, {"This element is used in fireworks to produce red colors.", "It has thirty-eight protons."}};
    elements[39] = {"Y", "Yttrium", 88.91, "Yttrium is a chemical element with the symbol Y and atomic number 39.", 1526, 3345, 4.47, 212, 1.22, {"This element is used in certain alloys and electronics.", "It has thirty-nine protons."}};
    elements[40] = {"Zr", "Zirconium", 91.22, "Zirconium is a chemical element with the symbol Zr and atomic number 40.", 1852, 4377, 6.51, 206, 1.33, {"This element is corrosion-resistant and used in nuclear reactors.", "It has forty protons."}};
    elements[41] = {"Nb", "Niobium", 92.91, "Niobium is a chemical element with the symbol Nb and atomic number 41.", 2477, 4744, 8.57, 198, 1.60, {"This element is used in superconducting magnets.", "It has forty-one protons."}};
    elements[42] = {"Mo", "Molybdenum", 95.95, "Molybdenum is a chemical element with the symbol Mo and atomic number 42.", 2617, 4612, 10.22, 190, 2.16, {"This element has a high melting point and is used in high-strength alloys.", "It has forty-two protons."}};
    elements[43] = {"Tc", "Technetium", 98.00, "Technetium is a chemical element with the symbol Tc and atomic number 43.", 2157, 4265, 11.49, 183, 1.90, {"This element is the lightest element that does not have any stable isotopes.", "It has forty-three protons."}};
    elements[44] = {"Ru", "Ruthenium", 101.07, "Ruthenium is a chemical element with the symbol Ru and atomic number 44.", 2334, 4150, 12.37, 178, 2.20, {"This element is used as a catalyst in some industrial processes.", "It has forty-four protons."}};
    elements[45] = {"Rh", "Rhodium", 102.91, "Rhodium is a chemical element with the symbol Rh and atomic number 45.", 1964, 3695, 12.41, 173, 2.28, {"This element is commonly used in catalytic converters for automobiles.", "It has forty-five protons."}};
    elements[46] = {"Pd", "Palladium", 106.42, "Palladium is a chemical element with the symbol Pd and atomic number 46.", 1554.9, 2963, 12.02, 169, 2.20, {"This element is used in catalytic converters and jewelry.", "It has forty-six protons."}};
    elements[47] = {"Ag", "Silver", 107.87, "Silver is a chemical element with the symbol Ag and atomic number 47.", 961.78, 2162, 10.49, 165, 1.93, {"This element is known for its high thermal and electrical conductivity.", "It has forty-seven protons."}};
    elements[48] = {"Cd", "Cadmium", 112.41, "Cadmium is a chemical element with the symbol Cd and atomic number 48.", 321.07, 767, 8.65, 161, 1.69, {"This element is used in rechargeable batteries and as a pigment.", "It has forty-eight protons."}};
    elements[49] = {"In", "Indium", 114.82, "Indium is a chemical element with the symbol In and atomic number 49.", 156.61, 2072, 7.31, 156, 1.78, {"This element is used in making transparent conductive coatings.", "It has forty-nine protons."}};
    elements[50] = {"Sn", "Tin", 118.71, "Tin is a chemical element with the symbol Sn and atomic number 50.", 231.93, 2602, 7.29, 145, 1.96, {"This element has been used to make cans for food and beverages.", "It has fifty protons."}};
}

Element generateRandomElement()
{
    int randomIndex = rand() % MAX_ELEMENTS;
    return elements[randomIndex];
}

void displayHint(const Element &element, int hintIndex)
{
    cout << "Hint " << hintIndex + 1 << ": " << element.hints[hintIndex] << endl;
}

void displayProperties(const Element &element)
{
    cout << "Symbol: " << element.symbol << endl;
    cout << "Name: " << element.name << endl;
    cout << "Atomic Weight: " << element.atomicWeight << endl;
    cout << "Description: " << element.description << endl;
    cout << "Melting Point: " << element.meltingPoint << endl;
    cout << "Boiling Point: " << element.boilingPoint << endl;
    cout << "Density: " << element.density << " g/cm^3" << endl;
    cout << "Atomic Radius: " << element.atomicRadius << " pm" << endl;
    cout << "Electronegativity: " << element.electronegativity << endl;
}

int main()
{
    srand(time(0)); // Seed the random number generator

    initializeElements();

    cout << "Guess the Element!" << endl;
    cout << "------------------" << endl;

    Element randomElement = generateRandomElement();

    int score = 0;
    int guessCount = 0;
    int guessedCorrectly = 0;

    cout << "Here's a hint for you:" << endl;
    displayHint(randomElement, 0);

    while ((guessCount < MAX_HINTS) && (guessedCorrectly == 0))
    {
        cout << "Now, try to guess the element based on the hint." << endl;

        if (guessCount > 0)
        {
            cout << "Here's another hint for you:" << endl;
            displayHint(randomElement, guessCount);
        }
        cout << "Enter your guess: ";
        string userGuess;
        cin >> userGuess;

        cout << endl;
        string lowercaseUserGuess = userGuess;
        transform(lowercaseUserGuess.begin(), lowercaseUserGuess.end(), lowercaseUserGuess.begin(), ::tolower);
        string lowercaseElementName = randomElement.name;
        transform(lowercaseElementName.begin(), lowercaseElementName.end(), lowercaseElementName.begin(), ::tolower);

        if (lowercaseUserGuess == lowercaseElementName)
        {
            guessedCorrectly = 1;
            if (guessCount == 0)
            {
                score += FIRST_GUESS_POINTS;
            }
            else if (guessCount == 1)
            {
                score += SECOND_GUESS_POINTS;
            }
        }
        else
        {
            guessCount++;
        }
    }

    if (guessedCorrectly == 1)
    {
        cout << "Congratulations! You guessed it right. The element is " << randomElement.name << "." << endl;
        cout << "Score: " << score << " points" << endl;
        cout << "Properties of the Element" << endl;
        cout << "------------------" << endl;
        displayProperties(randomElement);
    }
    else
    {
        cout << "Oops! You didn't guess correctly. The correct element is " << randomElement.name << "." << endl;
        cout << "Score: " << WRONG_GUESS_POINTS << " points" << endl;
        cout << "Properties of the Element" << endl;
        cout << "------------------" << endl;
        displayProperties(randomElement);
    }

    return 0;
}
