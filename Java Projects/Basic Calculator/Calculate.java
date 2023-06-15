import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.*;

public class Calculate extends JFrame implements ActionListener {
    private JTextField textField;
    private JButton[] numberButtons;
    private JButton[] operatorButtons;
    private JButton decimalButton, equalButton, clearButton;
    private JPanel panel;

    private double num1, num2, result;
    private String operator;

    public Calculate() {
        setTitle("Calculator");
        setSize(300, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setResizable(false);

        textField = new JTextField();
        textField.setBounds(30, 30, 240, 30);
        textField.setEditable(false);

        numberButtons = new JButton[10];
        for (int i = 0; i < 10; i++) {
            numberButtons[i] = new JButton(String.valueOf(i));
            numberButtons[i].addActionListener(this);
        }

        operatorButtons = new JButton[4];
        operatorButtons[0] = new JButton("+");
        operatorButtons[1] = new JButton("-");
        operatorButtons[2] = new JButton("*");
        operatorButtons[3] = new JButton("/");

        decimalButton = new JButton(".");
        equalButton = new JButton("=");
        clearButton = new JButton("C");

        panel = new JPanel();
        panel.setBounds(30, 80, 240, 240);
        panel.setLayout(new GridLayout(4, 4, 10, 10));

        panel.add(numberButtons[1]);
        panel.add(numberButtons[2]);
        panel.add(numberButtons[3]);
        panel.add(operatorButtons[0]);
        panel.add(numberButtons[4]);
        panel.add(numberButtons[5]);
        panel.add(numberButtons[6]);
        panel.add(operatorButtons[1]);
        panel.add(numberButtons[7]);
        panel.add(numberButtons[8]);
        panel.add(numberButtons[9]);
        panel.add(operatorButtons[2]);
        panel.add(decimalButton);
        panel.add(numberButtons[0]);
        panel.add(clearButton);
        panel.add(operatorButtons[3]);

        setLayout(null);
        add(textField);
        add(panel);
        add(equalButton);

        decimalButton.addActionListener(this);
        clearButton.addActionListener(this);
        equalButton.addActionListener(this);

        for (JButton button : operatorButtons) {
            button.addActionListener(this);
        }

        setVisible(true);
    }

    public void actionPerformed(ActionEvent e) {
        String input = e.getActionCommand();

        if (input.equals("+") || input.equals("-") || input.equals("*") || input.equals("/")) {
            num1 = Double.parseDouble(textField.getText());
            operator = input;
            textField.setText("");
        } else if (input.equals("=")) {
            num2 = Double.parseDouble(textField.getText());

            switch (operator) {
                case "+":
                    result = num1 + num2;
                    break;
                case "-":
                    result = num1 - num2;
                    break;
                case "*":
                    result = num1 * num2;
                    break;
                case "/":
                    if (num2 != 0)
                        result = num1 / num2;
                    else
                        textField.setText("Error");
                    break;
            }

            textField.setText(String.valueOf(result));
        } else if (input.equals("C")) {
            textField.setText("");
        } else {
            textField.setText(textField.getText() + input);
        }
    }

    public static void main(String[] args) {
        new Calculate();
    }
}
