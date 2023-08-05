#include <iostream>
#include <string>
#include <vector>
#include <cstdlib>
#include <ctime>

// Weather data structure
struct WeatherData {
    std::string location;
    double temperature;
    double humidity;
    double windSpeed;
    double pressure;
    double visibility;
};

// Function to simulate fetching real-time weather data for a given location
WeatherData getRealTimeWeatherData(const std::string& location) {
    // Simulate random weather data
    WeatherData data;
    data.location = location;
    data.temperature = (rand() % 30) - 10;     // Temperature range: -10°C to 20°C
    data.humidity = rand() % 100;             // Humidity range: 0% to 100%
    data.windSpeed = rand() % 20;             // Wind speed range: 0 km/h to 20 km/h
    data.pressure = (rand() % 1000) + 900;    // Pressure range: 900 hPa to 1900 hPa
    data.visibility = (rand() % 10) + 1;      // Visibility range: 1 km to 10 km
    return data;
}

// Function to display weather data for a given location in Celsius
void displayWeatherDataCelsius(const WeatherData& data) {
    std::cout << "Location: " << data.location << std::endl;
    std::cout << "Temperature: " << data.temperature << " °C" << std::endl;
    std::cout << "Humidity: " << data.humidity << "%" << std::endl;
    std::cout << "Wind Speed: " << data.windSpeed << " km/h" << std::endl;
    std::cout << "Pressure: " << data.pressure << " hPa" << std::endl;
    std::cout << "Visibility: " << data.visibility << " km" << std::endl;
    std::cout << "---------------------" << std::endl;
}

// Function to convert Celsius to Fahrenheit
double celsiusToFahrenheit(double celsius) {
    return (celsius * 9.0 / 5.0) + 32.0;
}

// Function to display weather data for a given location in Fahrenheit
void displayWeatherDataFahrenheit(const WeatherData& data) {
    WeatherData dataInFahrenheit = data;
    dataInFahrenheit.temperature = celsiusToFahrenheit(data.temperature);
    std::cout << "Location: " << dataInFahrenheit.location << std::endl;
    std::cout << "Temperature: " << dataInFahrenheit.temperature << " °F" << std::endl;
    std::cout << "Humidity: " << dataInFahrenheit.humidity << "%" << std::endl;
    std::cout << "Wind Speed: " << dataInFahrenheit.windSpeed << " mph" << std::endl;
    std::cout << "Pressure: " << dataInFahrenheit.pressure << " hPa" << std::endl;
    std::cout << "Visibility: " << dataInFahrenheit.visibility << " miles" << std::endl;
    std::cout << "---------------------" << std::endl;
}

int main() {
    // Seed the random number generator
    std::srand(static_cast<unsigned>(std::time(nullptr)));

    // List of locations for weather data retrieval
    std::vector<std::string> locations = {
        "New York", "Los Angeles", "London", "Tokyo", "India"
    };

    // Display real-time weather data for each location
    std::cout << "Weather Station Dashboard" << std::endl;
    while (true) {
        std::cout << "Select an option:\n";
        std::cout << "1. View weather data in Celsius\n";
        std::cout << "2. View weather data in Fahrenheit\n";
        std::cout << "0. Exit\n";
        std::cout << "Enter your choice: ";

        int choice;
        std::cin >> choice;

        if (choice == 0) {
            std::cout << "Goodbye! Exiting the program.\n";
            break;
        } else if (choice == 1) {
            std::cout << "\nWeather Data in Celsius:\n";
            for (const std::string& location : locations) {
                WeatherData data = getRealTimeWeatherData(location);
                displayWeatherDataCelsius(data);
            }
        } else if (choice == 2) {
            std::cout << "\nWeather Data in Fahrenheit:\n";
            for (const std::string& location : locations) {
                WeatherData data = getRealTimeWeatherData(location);
                displayWeatherDataFahrenheit(data);
            }
        } else {
            std::cout << "Invalid choice. Please enter a valid option.\n";
        }
    }

    return 0;
}
