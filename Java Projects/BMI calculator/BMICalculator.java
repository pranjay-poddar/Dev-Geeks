import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class BMICalculator extends JFrame {
    private JTextField weightField;
    private JTextField heightField;
    private JLabel resultLabel;

    public BMICalculator() {
        setTitle("BMI Calculator");
        setSize(300, 200);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        JPanel panel = new JPanel();
        panel.setLayout(new GridLayout(4, 2));

        JLabel weightLabel = new JLabel("Weight (kg): ");
        weightField = new JTextField();
        JLabel heightLabel = new JLabel("Height (m): ");
        heightField = new JTextField();
        JButton calculateButton = new JButton("Calculate");
        resultLabel = new JLabel();

        calculateButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                calculateBMI();
            }
        });

        panel.add(weightLabel);
        panel.add(weightField);
        panel.add(heightLabel);
        panel.add(heightField);
        panel.add(calculateButton);
        panel.add(resultLabel);

        add(panel);
    }

    private void calculateBMI() {
        try {
            double weight = Double.parseDouble(weightField.getText());
            double height = Double.parseDouble(heightField.getText());

            double bmi = weight / (height * height);

            String interpretation;
            if (bmi < 18.5) {
                interpretation = "Underweight";
            } else if (bmi < 25) {
                interpretation = "Normal weight";
            } else if (bmi < 30) {
                interpretation = "Overweight";
            } else {
                interpretation = "Obese";
            }

            resultLabel.setText("BMI: " + String.format("%.2f", bmi) + " (" + interpretation + ")");
        } catch (NumberFormatException e) {
            resultLabel.setText("Invalid input");
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                new BMICalculator().setVisible(true);
            }
        });
    }
}
