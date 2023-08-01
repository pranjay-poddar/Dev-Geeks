import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class TextFileAnalyzer {

    public static void main(String[] args) {
        String filePath = getInputFilePath();
        analyzeTextFile(filePath);
    }

    private static String getInputFilePath() {
        System.out.print("Enter the path of the text file: ");
        try (BufferedReader reader = new BufferedReader(new java.io.InputStreamReader(System.in))) {
            return reader.readLine();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static void analyzeTextFile(String filePath) {
        try (BufferedReader fileReader = new BufferedReader(new FileReader(filePath))) {
            int numLines = 0;
            int numWords = 0;
            int numCharacters = 0;

            String line;
            while ((line = fileReader.readLine()) != null) {
                numLines++;
                String[] words = line.split("\\s+");
                numWords += words.length;
                numCharacters += line.length();
            }

            System.out.println("Number of lines: " + numLines);
            System.out.println("Number of words: " + numWords);
            System.out.println("Number of characters: " + numCharacters);
        } catch (IOException e) {
            System.out.println("Error: File not found or could not be read.");
            e.printStackTrace();
        }
    }
}
