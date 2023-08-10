import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class NumberGuessingGameGUI extends JFrame {
    private int randomNumber;
    private int attempts;
    private JTextField textField;
    private JLabel messageLabel;

    public NumberGuessingGameGUI() {
        randomNumber = (int) (Math.random() * 100) + 1;
        attempts = 0;

        setTitle("Number Guessing Game");
        setSize(300, 200);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        JPanel panel = new JPanel();
        panel.setLayout(new GridLayout(3, 1));

        JLabel titleLabel = new JLabel("Guess a number between 1 and 100:");
        panel.add(titleLabel);

        textField = new JTextField();
        textField.addActionListener(new GuessListener());
        panel.add(textField);

        messageLabel = new JLabel("Enter a number and press Enter.");
        panel.add(messageLabel);

        add(panel);
        setVisible(true);
    }

    private class GuessListener implements ActionListener {
        public void actionPerformed(ActionEvent event) {
            int guess;
            attempts++;
            
            try {
                guess = Integer.parseInt(textField.getText());
            } catch (NumberFormatException e) {
                messageLabel.setText("Invalid input. Enter a valid number.");
                return;
            }

            if (guess < 1 || guess > 100) {
                messageLabel.setText("Number out of range. Enter a number between 1 and 100.");
            } else if (guess == randomNumber) {
                messageLabel.setText("Congratulations! You guessed the number in " + attempts + " attempts.");
                textField.setEditable(false);
            } else if (guess < randomNumber) {
                messageLabel.setText("Too low. Try again.");
            } else {
                messageLabel.setText("Too high. Try again.");
            }

            textField.setText("");
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                new NumberGuessingGameGUI();
            }
        });
    }
}
