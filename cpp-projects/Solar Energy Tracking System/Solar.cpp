#include <iostream>
#include <cmath>
#include <iomanip>

const double DEG_TO_RAD = M_PI / 180.0;
const double RAD_TO_DEG = 180.0 / M_PI;

// Function to convert an angle from radians to degrees
double toDegrees(double radians) {
    return radians * RAD_TO_DEG;
}

// Function to convert an angle from degrees to radians
double toRadians(double degrees) {
    return degrees * DEG_TO_RAD;
}

// Function to calculate the solar declination angle (δ) in radians for a given day of the year
double calculateSolarDeclination(int dayOfYear) {
    return 23.45 * sin(2 * M_PI * (dayOfYear - 81) / 365.0) * DEG_TO_RAD;
}

// Function to calculate the equation of time (EoT) in minutes for a given day of the year
double calculateEquationOfTime(int dayOfYear) {
    double B = 360.0 * (dayOfYear - 81) / 365.0;
    return 9.87 * sin(2 * B * DEG_TO_RAD) - 7.53 * cos(B * DEG_TO_RAD) - 1.5 * sin(B * DEG_TO_RAD);
}

// Function to calculate the solar hour angle (ω) in radians for a given time and longitude
double calculateSolarHourAngle(int hour, int minute, int second, double longitude, int dayOfYear) {
    double time = hour + minute / 60.0 + second / 3600.0;
    double equationOfTime = calculateEquationOfTime(dayOfYear);
    double solarTime = time + (longitude / 15.0) - (equationOfTime / 60.0);
    return (solarTime - 12.0) * 15.0 * DEG_TO_RAD;
}

// Function to calculate the solar altitude angle (α) in radians for a given latitude, solar declination, and solar hour angle
double calculateSolarAltitudeAngle(double latitude, double solarDeclination, double solarHourAngle) {
    double sinAltitude = sin(latitude) * sin(solarDeclination) +
                         cos(latitude) * cos(solarDeclination) * cos(solarHourAngle);
    return asin(sinAltitude);
}

// Function to calculate the solar azimuth angle (A) in radians for a given latitude, solar declination, solar altitude angle, and solar hour angle
double calculateSolarAzimuthAngle(double latitude, double solarDeclination, double solarAltitudeAngle, double solarHourAngle) {
    double cosAzimuth = (sin(solarAltitudeAngle) * sin(latitude) - sin(solarDeclination)) /
                       (cos(solarAltitudeAngle) * cos(latitude));
    double azimuthAngle = acos(cosAzimuth);

    if (solarHourAngle > 0) {
        return azimuthAngle;
    } else {
        return 2 * M_PI - azimuthAngle;
    }
}

// Function to calculate the solar power generation (in watts/m^2) based on the solar altitude angle
double calculateSolarPower(double solarAltitudeAngleDegrees) {
    // Simple model assuming the power generation is proportional to the cosine of the solar altitude angle
    return 1000.0 * cos(toRadians(solarAltitudeAngleDegrees));
}

// Function to calculate the time of sunrise in hours (UTC) for a given latitude and day of the year
double calculateSunriseTime(int dayOfYear, double latitude, double longitude) {
    double solarDeclination = calculateSolarDeclination(dayOfYear);
    double hourAngle = acos(-tan(latitude) * tan(solarDeclination));

    double sunriseTime = (12.0 - toDegrees(hourAngle) / 15.0) - (longitude / 15.0);
    return sunriseTime;
}

// Function to calculate the time of sunset in hours (UTC) for a given latitude and day of the year
double calculateSunsetTime(int dayOfYear, double latitude, double longitude) {
    double solarDeclination = calculateSolarDeclination(dayOfYear);
    double hourAngle = acos(-tan(latitude) * tan(solarDeclination));

    double sunsetTime = (12.0 + toDegrees(hourAngle) / 15.0) - (longitude / 15.0);
    return sunsetTime;
}

int main() {
    // Geographic location (latitude and longitude) in degrees
    double latitude, longitude;
    std::cout << "Enter the latitude (in degrees): ";
    std::cin >> latitude;
    std::cout << "Enter the longitude (in degrees): ";
    std::cin >> longitude;

    // Date and time
    int dayOfYear, hour, minute, second;
    std::cout << "Enter the day of the year (1-365): ";
    std::cin >> dayOfYear;
    std::cout << "Enter the time (hh mm ss): ";
    std::cin >> hour >> minute >> second;

    // Convert latitude, longitude, and solar declination to radians
    double latitudeRadians = toRadians(latitude);
    double solarDeclination = calculateSolarDeclination(dayOfYear);

    // Calculate solar hour angle (ω) in radians
    double solarHourAngle = calculateSolarHourAngle(hour, minute, second, longitude, dayOfYear);

    // Calculate solar altitude angle (α) and azimuth angle (A) in radians
    double solarAltitudeAngle = calculateSolarAltitudeAngle(latitudeRadians, solarDeclination, solarHourAngle);
    double solarAzimuthAngle = calculateSolarAzimuthAngle(latitudeRadians, solarDeclination, solarAltitudeAngle, solarHourAngle);

    // Convert angles to degrees
    double solarAltitudeAngleDegrees = toDegrees(solarAltitudeAngle);
    double solarAzimuthAngleDegrees = toDegrees(solarAzimuthAngle);

    // Calculate and display solar power generation
    double solarPower = calculateSolarPower(solarAltitudeAngleDegrees);
    std::cout << "Solar Power Generation: " << std::fixed << std::setprecision(2) << solarPower << " watts/m^2\n";

    // Calculate and display sunrise and sunset times
    double sunriseTime = calculateSunriseTime(dayOfYear, latitudeRadians, longitude);
    double sunsetTime = calculateSunsetTime(dayOfYear, latitudeRadians, longitude);
    std::cout << "Sunrise Time (UTC): " << std::fixed << std::setprecision(2) << sunriseTime << " hours\n";
    std::cout << "Sunset Time (UTC): " << std::fixed << std::setprecision(2) << sunsetTime << " hours\n";

    return 0;
}
