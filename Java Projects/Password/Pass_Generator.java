import java.security.SecureRandom;
import java.util.Scanner;

public class Pass_Generator {

    // Define the character sets for different types of characters
    private static final String LOWER_CASE_CHARACTERS = "abcdefghijklmnopqrstuvwxyz";
    private static final String UPPER_CASE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String NUMERIC_CHARACTERS = "0123456789";
    private static final String SPECIAL_CHARACTERS = "!@#$%^&*()-_=+[]{}|;:,.<>?";

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Prompt the user to enter the desired length of the password
        System.out.print("Enter the length of the password: ");
        int length = scanner.nextInt();

        // Ask the user if they want to include lower case characters in the password
        System.out.print("Include lower case characters? (y/n): ");
        boolean includeLowerCase = scanner.next().equalsIgnoreCase("y");

        // Ask the user if they want to include upper case characters in the password
        System.out.print("Include upper case characters? (y/n): ");
        boolean includeUpperCase = scanner.next().equalsIgnoreCase("y");

        // Ask the user if they want to include numeric characters in the password
        System.out.print("Include numeric characters? (y/n): ");
        boolean includeNumeric = scanner.next().equalsIgnoreCase("y");

        // Ask the user if they want to include special characters in the password
        System.out.print("Include special characters? (y/n): ");
        boolean includeSpecial = scanner.next().equalsIgnoreCase("y");

        // Generate a random password based on the user's preferences
        String password = generateRandomPassword(length, includeLowerCase, includeUpperCase, includeNumeric,
                includeSpecial);

        // Display the generated password to the user
        System.out.println("Generated Password: " + password);

        scanner.close(); // Close the scanner to release resources
    }

    // Method to generate a random password based on the specified length and
    // character types
    private static String generateRandomPassword(int length, boolean includeLowerCase, boolean includeUpperCase,
            boolean includeNumeric, boolean includeSpecial) {
        StringBuilder characters = new StringBuilder();

        // Add the requested character types to the character set
        if (includeLowerCase) {
            characters.append(LOWER_CASE_CHARACTERS);
        }

        if (includeUpperCase) {
            characters.append(UPPER_CASE_CHARACTERS);
        }

        if (includeNumeric) {
            characters.append(NUMERIC_CHARACTERS);
        }

        if (includeSpecial) {
            characters.append(SPECIAL_CHARACTERS);
        }

        // Use SecureRandom to generate a random password
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder();

        // Randomly select characters from the character set to form the password
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(characters.length());
            password.append(characters.charAt(randomIndex));
        }

        return password.toString(); // Return the generated password
    }
}
