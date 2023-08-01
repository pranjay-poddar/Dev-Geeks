import java.util.Scanner;

public class Hangman {

    private static final String[] WORDS = {
        "programming", "java", "hangman", "computer", "algorithm",
        "internet", "javascript", "python", "software", "development",
        "application", "android", "database", "network", "security",
        "game", "web", "cloud", "machine", "learning",
        "artificial", "intelligence", "data", "structure", "algorithm",
        "server", "client", "mobile", "programming", "framework"
    };

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String wordToGuess = selectRandomWord();
        char[] guessedLetters = new char[wordToGuess.length()];
        int attempts = 6; // Number of attempts before the player loses

        initializeGuessedLetters(guessedLetters);

        System.out.println("Welcome to Hangman!");
        System.out.println("Try to guess the word. You have " + attempts + " attempts.");

        while (attempts > 0 && !isWordGuessed(guessedLetters)) {
            System.out.println("Word: " + getVisibleWord(guessedLetters));
            System.out.print("Enter a letter: ");
            char guess = scanner.next().toLowerCase().charAt(0);

            if (!isLetterAlreadyGuessed(guess, guessedLetters)) {
                if (wordToGuess.contains(Character.toString(guess))) {
                    updateGuessedLetters(guess, wordToGuess, guessedLetters);
                } else {
                    attempts--;
                    System.out.println("Incorrect! Attempts left: " + attempts);
                }
            } else {
                System.out.println("You've already guessed that letter. Try another one.");
            }
        }

        if (isWordGuessed(guessedLetters)) {
            System.out.println("Congratulations! You guessed the word: " + wordToGuess);
        } else {
            System.out.println("You've run out of attempts. The word was: " + wordToGuess);
        }

        scanner.close();
    }

    private static String selectRandomWord() {
        // Generate a random index to select a word from the WORDS array
        int randomIndex = (int) (Math.random() * WORDS.length);
        return WORDS[randomIndex];
    }

    private static void initializeGuessedLetters(char[] guessedLetters) {
        // Initialize the guessedLetters array with underscores
        for (int i = 0; i < guessedLetters.length; i++) {
            guessedLetters[i] = '_';
        }
    }

    private static String getVisibleWord(char[] guessedLetters) {
        // Convert the guessedLetters array to a String to show the progress of the word
        return new String(guessedLetters);
    }

    private static boolean isLetterAlreadyGuessed(char letter, char[] guessedLetters) {
        // Check if the guessed letter is already present in the guessedLetters array
        for (char c : guessedLetters) {
            if (c == letter) {
                return true;
            }
        }
        return false;
    }

    private static boolean isWordGuessed(char[] guessedLetters) {
        // Check if the word has been completely guessed by checking for any underscores
        for (char c : guessedLetters) {
            if (c == '_') {
                return false;
            }
        }
        return true;
    }

    private static void updateGuessedLetters(char guess, String wordToGuess, char[] guessedLetters) {
        // Update the guessedLetters array with the correct guess
        for (int i = 0; i < wordToGuess.length(); i++) {
            if (wordToGuess.charAt(i) == guess) {
                guessedLetters[i] = guess;
            }
        }
    }
}
