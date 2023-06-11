#include <stdio.h>

// MAIN FUNCTION
int main() {
    float temperature, converted_temperature;
    char unit;

    // TAKE INPUT FROM USER
    printf("Enter temperature: ");
    scanf("%f", &temperature);

    printf("Enter unit (C/F): ");
    scanf(" %c", &unit);


    // LOGIC
    if (unit == 'C' || unit == 'c') {
        converted_temperature = (temperature * 9 / 5) + 32;
        printf("%.2fC is %.2fF\n", temperature, converted_temperature);
    } else if (unit == 'F' || unit == 'f') {
        converted_temperature = (temperature - 32) * 5 / 9;
        printf("%.2fF is %.2fC\n", temperature, converted_temperature);
    } else {
        printf("Invalid unit entered.\n");
    }

    return 0;
}
