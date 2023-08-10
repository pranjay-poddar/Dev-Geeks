import java.awt.*;
import java.awt.event.*;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Random;
import javax.swing.*;

public class PassCraft extends JFrame {

    private JLabel lengthLabel;
    private JTextField lengthField;
    private JCheckBox specialCharsCheckBox;
    private JButton generateButton;

    public PassCraft() {
        setTitle("Password Generator");
        setSize(400, 200);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        // Create the main panel
        JPanel mainPanel = new JPanel();
        mainPanel.setLayout(new GridLayout(4, 1));

        // Create GUI components
        lengthLabel = new JLabel("Password Length:");
        lengthField = new JTextField();
        specialCharsCheckBox = new JCheckBox("Include Special Characters");
        generateButton = new JButton("Generate Password");

        // Add action listener to the generate button
        generateButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                generatePassword();
            }
        });

        // Add components to the main panel
        mainPanel.add(lengthLabel);
        mainPanel.add(lengthField);
        mainPanel.add(specialCharsCheckBox);
        mainPanel.add(generateButton);

        // Add the main panel to the JFrame
        add(mainPanel);

        // Set the JFrame visible
        setVisible(true);
    }

    private void generatePassword() {
        int length;
        boolean includeSpecialChars;

        try {
            // Parse the password length from the text field
            length = Integer.parseInt(lengthField.getText());
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(this, "Invalid password length!");
            return;
        }

        // Check if special characters should be included
        includeSpecialChars = specialCharsCheckBox.isSelected();

        // Create StringBuilder to build the password
        StringBuilder password = new StringBuilder();
        String upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lower = "abcdefghijklmnopqrstuvwxyz";
        String number = "1234567890";
        String specialChars = "~`!@#$%^&*()_-+={[}]|:;'<,>.?/";

        // Create a random number generator
        Random random = new Random();
        int charSetLength = includeSpecialChars ? 4 : 3;

        // Generate password character by character
        for (int i = 0; i < length; i++) {
            int charSetIndex = random.nextInt(charSetLength);

            switch (charSetIndex) {
                case 0:
                    password.append(upper.charAt(random.nextInt(upper.length())));
                    break;
                case 1:
                    password.append(lower.charAt(random.nextInt(lower.length())));
                    break;
                case 2:
                    password.append(number.charAt(random.nextInt(number.length())));
                    break;
                case 3:
                    password.append(specialChars.charAt(random.nextInt(specialChars.length())));
                    break;
            }
        }

        // Display the generated password
        displayPassword(password.toString());
    }

    private void displayPassword(String password) {
        // Create a JTextArea to display the password
        JTextArea passwordArea = new JTextArea();
        passwordArea.setText(password);
        passwordArea.setEditable(false);

        // Show a dialog with the password and save option
        int option = JOptionPane.showOptionDialog(this, passwordArea, "Generated Password", JOptionPane.YES_NO_OPTION,
                JOptionPane.INFORMATION_MESSAGE, null, new String[] { "Save", "Don't Save" }, "Save");
        if (option == JOptionPane.YES_OPTION) {
            // Save the password if chosen to save
            savePassword(password);
        }
    }

    private void savePassword(String password) {
        // Ask for a passphrase to recognize the password
        String passphrase = JOptionPane.showInputDialog(this, "Enter a phrase to recognize this password:");

        if (passphrase != null && !passphrase.isEmpty()) {
            try {
                // Save the password to a file
                File file = new File("password.txt");
                FileWriter fileWriter = new FileWriter(file, true);
                BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
                bufferedWriter.write(passphrase + ": " + password);
                bufferedWriter.newLine();
                bufferedWriter.close();
                JOptionPane.showMessageDialog(this, "Password successfully saved into password.txt");
            } catch (IOException e) {
                JOptionPane.showMessageDialog(this, "Failed to save password: " + e.getMessage());
            }
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                new PassCraft();
            }
        });
    }
}
