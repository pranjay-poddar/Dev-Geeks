#include <iostream>
#include <map>
using namespace std;

void length()
{

    int value1;
    string unit1, unit2;
    cout << "LENGTH UNITS" << endl;
    cout << "1. Millimeter (mm)\n2. Centimeter (cm)\n3. Meter (m)\n4. Kilometer (km)\n5. Inch (in)\n6. Foot (ft)\n7. Yard (yd)\n8. Mile (mi)" << endl;
    cout << "Enter the unit you want to convert" << endl;
    cin >> unit1;
    cout << "Enter the value in " << unit1 << endl;
    cin >> value1;
    cout << "To which do you wish to convert " << unit1 << " to" << endl;
    cin >> unit2;
    map<string, double> m = {
        {"mm", 1000},
        {"cm", 100},
        {"m", 1.0},
        {"km", 0.001},
        {"in", 39.3701},
        {"ft", 3.28084},
        {"yd", 1.0936},
        {"mi", 0.0006213}};

    map<string, string> lengthUnitDescriptions = {
        {"mm", "The millimeter is a unit of length in the metric system, equal to one-thousandth of a meter."},
        {"cm", "The centimeter is a unit of length in the metric system, equal to one-hundredth of a meter."},
        {"m", "The meter is the base unit of length in the metric system, defined as the distance traveled by light in a vacuum during a specific time interval."},
        {"km", "The kilometer is a unit of length in the metric system, equal to one thousand meters."},
        {"in", "The inch is a unit of length commonly used in the imperial and United States customary systems, equal to 1/12 of a foot."},
        {"ft", "The foot is a unit of length commonly used in the imperial and United States customary systems, equal to 12 inches."},
        {"yd", "The yard is a unit of length commonly used in the imperial and United States customary systems, equal to 3 feet."},
        {"mi", "The mile is a unit of length commonly used in the imperial and United States customary systems, equal to 5280 feet or 1.60934 kilometers."}};
    double value2 = value1 / m[unit1];
    double answer = value2 * m[unit2];
    cout << value1 << " " << unit1 << " in " << unit2 << " = " << answer << endl;
    cout<<"Do you want to reverse the conversion?(Y/N)"<<endl;
    char ch;
    cin>>ch;
    if(ch=='Y'){
        cout<<answer<<" "<<unit2<<" in "<<unit1<<" = "<<value1<<endl;
    }
    cout << "Description of " << unit2 << endl;
    cout << lengthUnitDescriptions[unit2] << endl;
}

void Weight()
{

    int value1;
    string unit1, unit2;
    cout << "WEIGHT UNITS" << endl;
    cout << "1. Milligram (mg)\n2. Gram (g)\n3. Kilogram (kg)\n4. Metric Ton (t)\n5. Ounce (oz)\n6. Pound (lb)\n7. Stone (st)" << endl;
    cout << "Enter the unit you want to convert" << endl;
    cin >> unit1;
    cout << "Enter the value in " << unit1 << endl;
    cin >> value1;
    cout << "To which do you wish to convert " << unit1 << " to" << endl;
    cin >> unit2;

    map<string, double> m = {
        {"mg", 1000.00},
        {"g", 1.00},
        {"kg", 0.001},
        {"t", 0.000001},
        {"oz", 0.035274},
        {"lb", 0.00220},
        {"st", 0.0001574}};

    map<string, string> weightUnitDescriptions = {
        {"mg", "The milligram is a unit of weight in the metric system, equal to one-thousandth of a gram."},
        {"g", "The gram is a unit of weight in the metric system, equal to one one-thousandth of a kilogram."},
        {"kg", "The kilogram is the base unit of weight in the metric system, defined as the mass of the International Prototype of the Kilogram."},
        {"ton", "The metric ton (tonne) is a unit of weight in the metric system, equal to 1000 kilograms."},
        {"oz", "The ounce is a unit of weight commonly used in the imperial and United States customary systems, equal to 1/16 of a pound."},
        {"lb", "The pound is a unit of weight commonly used in the imperial and United States customary systems, equal to 16 ounces."},
        {"st", "The stone is a unit of weight used in the British and Irish customary systems, equal to 14 pounds."}};
    double value2 = value1 / m[unit1];
    double answer = value2 * m[unit2];
    cout << value1 << " " << unit1 << " in " << unit2 << " = " << answer << endl;
    cout<<"Do you want to reverse the conversion?(Y/N)"<<endl;
    char ch;
    cin>>ch;
    if(ch=='Y'){
        cout<<answer<<" "<<unit2<<" in "<<unit1<<" = "<<value1<<endl;
    }
    cout << "Description of " << unit2 << endl;
    cout << weightUnitDescriptions[unit2] << endl;
}

void Volume()
{

    int value1;
    string unit1, unit2;
    cout << "VOLUME UNITS" << endl;
    cout << "1. Milliliter (mL)\n2. Liter (L)\n3. Cubic Meter (m3)\n4. Fluid Ounce (fl oz)\n5. Gallon (gal)\n6. Quart (qt)\n7. Pint (pt)" << endl;
    cout << "Enter the unit you want to convert" << endl;
    cin >> unit1;
    cout << "Enter the value in " << unit1 << endl;
    cin >> value1;
    cout << "To which do you wish to convert " << unit1 << " to" << endl;
    cin >> unit2;

    map<string, double> m = {
        {"mL", 1000.00},
        {"L", 1.00},
        {"m3", 0.001},
        {"fl oz", 35.1951},
        {"gal", 0.219969},
        {"qt", 0.879877},
        {"pt", 1.75975}};

    map<string, string> volumeUnitDescriptions = {
        {"mL", "The milliliter is a unit of volume in the metric system, equal to one-thousandth of a liter."},
        {"L", "The liter is a unit of volume in the metric system, equal to 1000 milliliters."},
        {"m3", "The cubic meter is the base unit of volume in the metric system, defined as a cube with side length of one meter."},
        {"fl oz", "The fluid ounce is a unit of volume commonly used in the imperial and United States customary systems, equal to approximately 29.57 milliliters."},
        {"pt", "The pint is a unit of volume commonly used in the imperial and United States customary systems, equal to 2 cups or approximately 473.18 milliliters."},
        {"qt", "The quart is a unit of volume commonly used in the imperial and United States customary systems, equal to 2 pints or approximately 946.35 milliliters."},
        {"gal", "The gallon is a unit of volume commonly used in the imperial and United States customary systems, equal to 4 quarts or approximately 3.79 liters."}};
    double value2 = value1 / m[unit1];
    double answer = value2 * m[unit2];
    cout << value1 << " " << unit1 << " in " << unit2 << " = " << answer << endl;
    cout<<"Do you want to reverse the conversion?(Y/N)"<<endl;
    char ch;
    cin>>ch;
    if(ch=='Y'){
        cout<<answer<<" "<<unit2<<" in "<<unit1<<" = "<<value1<<endl;
    }
    cout << "Description of " << unit2 << endl;
    cout << volumeUnitDescriptions[unit2] << endl;
}

void Temperature()
{

    int value1;
    string unit1, unit2;
    cout << "TEMPERATURE UNITS" << endl;
    cout << "1. Celsius (C)\n2. Fahrenheit (F)\n3. Kelvin (K)" << endl;
    cout << "Enter the unit you want to convert" << endl;
    cin >> unit1;
    cout << "Enter the value in " << unit1 << endl;
    cin >> value1;
    cout << "To which do you wish to convert " << unit1 << " to" << endl;
    cin >> unit2;

    map<string, double> m = {
        {"C", 1},
        {"F", 33.8},
        {"K", 274.15}};

    map<string, string> temperatureUnitDescriptions = {
        {"C", "The Celsius scale is a temperature scale commonly used in most of the world. It is based on the freezing and boiling points of water, where 0°C is the freezing point and 100°C is the boiling point at standard atmospheric pressure."},
        {"F", "The Fahrenheit scale is a temperature scale commonly used in the United States and a few other countries. It is based on the freezing and boiling points of water, where 32°F is the freezing point and 212°F is the boiling point at standard atmospheric pressure."},
        {"K", "The Kelvin scale is an absolute temperature scale used in scientific contexts. It is based on the Kelvin thermodynamic temperature scale, where 0 Kelvin (0 K) represents absolute zero, the lowest possible temperature."}};
    double value2 = value1 / m[unit1];
    double answer = value2 * m[unit2];
    cout << value1 << " " << unit1 << " in " << unit2 << " = " << answer << endl;
    cout<<"Do you want to reverse the conversion?(Y/N)"<<endl;
    char ch;
    cin>>ch;
    if(ch=='Y'){
        cout<<answer<<" "<<unit2<<" in "<<unit1<<" = "<<value1<<endl;
    }
    cout << "Description of " << unit2 << endl;
    cout << temperatureUnitDescriptions[unit2] << endl;
}

void Time()
{

    int value1;
    string unit1, unit2;
    cout << "TIME UNITS" << endl;
    cout << "1. Second (s)\n2. Minute (min)\n3. Hour (hr)\n4. Day (day)\n5. Week (week)\n6. Month (month)\n7. Year (year) " << endl;
    cout << "Enter the unit you want to convert" << endl;
    cin >> unit1;
    cout << "Enter the value in " << unit1 << endl;
    cin >> value1;
    cout << "To which do you wish to convert " << unit1 << " to" << endl;
    cin >> unit2;

    map<string, double> m = {
        {"s", 3600},
        {"min", 60},
        {"hr", 1.00},
        {"day", 0.0416667},
        {"week", 0.005952},
        {"month", 0.001369},
        {"year", 0.000114}};

    map<string, string> timeUnitDescriptions = {
        {"s", "The second is the base unit of time in the International System of Units (SI). It is defined as the duration of 9,192,631,770 periods of the radiation corresponding to the transition between two hyperfine levels of the ground state of the caesium-133 atom."},
        {"min", "The minute is a unit of time equal to 60 seconds or 1/60th of an hour."},
        {"hr", "The hour is a unit of time equal to 60 minutes or 1/24th of a day."},
        {"day", "The day is a unit of time defined as 24 hours or the time it takes for one complete rotation of the Earth on its axis."},
        {"week", "The week is a unit of time equal to 7 days."},
        {"month", "The month is a unit of time based on the concept of the lunar month or the time it takes for the Moon to complete one orbit around the Earth. The duration of a month varies depending on the specific calendar system used."},
        {"year", "The year is a unit of time based on the Earth's orbit around the Sun. It is typically defined as 365.25 days, accounting for the leap year every four years."}};
    double value2 = value1 / m[unit1];
    double answer = value2 * m[unit2];
    cout << value1 << " " << unit1 << " in " << unit2 << " = " << answer << endl;
    cout<<"Do you want to reverse the conversion?(Y/N)"<<endl;
    char ch;
    cin>>ch;
    if(ch=='Y'){
        cout<<answer<<" "<<unit2<<" in "<<unit1<<" = "<<value1<<endl;
    }
    cout << "Description of " << unit2 << endl;
    cout << timeUnitDescriptions[unit2] << endl;
}

void Currency()
{

    int value1;
    string unit1, unit2;
    cout << "CURRENCY UNITS" << endl;
    cout << "1. United States Dollar (USD)\n2. Euro (EUR)\n3. British Pound (GBP)\n4. Japanese Yen (JPY)\n5. Indian Rupee (INR)\n6. Chinese Yuan (CNY) " << endl;
    cout << "Enter the unit you want to convert" << endl;
    cin >> unit1;
    cout << "Enter the value in " << unit1 << endl;
    cin >> value1;
    cout << "To which do you wish to convert " << unit1 << " to" << endl;
    cin >> unit2;

    map<string, double> m = {
        {"USD", 0.012},
        {"EUR", 0.011},
        {"GBP", 0.0093},
        {"JPY", 1.69},
        {"INR", 1.00},
        {"CNY", 0.087}};

    map<string, string> currencyDescriptions = {
        {"USD", "United States Dollar - The currency of the United States."},
        {"EUR", "Euro - The currency used by most European Union member countries."},
        {"GBP", "British Pound - The currency of the United Kingdom."},
        {"JPY", "Japanese Yen - The currency of Japan."},
        {"CNY", "Chinese Yuan - The currency of China."},
        {"INR", "Indian Rupee - The currency of India."}};
    double value2 = value1 / m[unit1];
    double answer = value2 * m[unit2];
    cout << value1 << " " << unit1 << " in " << unit2 << " = " << answer << endl;
    cout<<"Do you want to reverse the conversion?(Y/N)"<<endl;
    char ch;
    cin>>ch;
    if(ch=='Y'){
        cout<<answer<<" "<<unit2<<" in "<<unit1<<" = "<<value1<<endl;
    }
    cout << "Description of " << unit2 << endl;
    cout << currencyDescriptions[unit2] << endl;
}

int main()
{

    int choice;
    cout << "UNIT CONVERTOR" << endl;
    cout << "-----------------------------------" << endl;
    cout << "UNIT CATEGORIES" << endl;
    cout << "1. Length\n2. Weight\n3. Volume\n4. Temperature\n5. Time\n6. Currency" << endl;
    cout << "Enter choice" << endl;
    cin >> choice;

    switch (choice)
    {
    case 1:
        cout << "-----------------------------------" << endl;
        length();
        break;
    case 2:
        cout << "-----------------------------------" << endl;
        Weight();
        break;
    case 3:
        cout << "-----------------------------------" << endl;
        Volume();
        break;
    case 4:
        cout << "-----------------------------------" << endl;
        Temperature();
        break;
    case 5:
        cout << "-----------------------------------" << endl;
        Time();
        break;
    case 6:
        cout << "-----------------------------------" << endl;
        Currency();
        break;
    }
    return 0;
}