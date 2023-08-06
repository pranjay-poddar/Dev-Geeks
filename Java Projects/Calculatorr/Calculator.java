import java.awt.*;
import java.awt.event.*;

public class Calculator extends Frame implements ActionListener {

    private TextField displayField;
    private double num1, num2, result;
    private String operator;

    public Calculator() {
        num1 = 0;
        num2 = 0;
        result = 0;
        operator = "";

        displayField = new TextField(20);
        displayField.setEditable(false);

        Button[] numberButtons = new Button[10];
        for (int i = 0; i < 10; i++) {
            numberButtons[i] = new Button(String.valueOf(i));
            numberButtons[i].addActionListener(this);
        }

        Button addButton = new Button("+");
        Button subtractButton = new Button("-");
        Button multiplyButton = new Button("*");
        Button divideButton = new Button("/");
        Button equalButton = new Button("=");
        Button clearButton = new Button("C");

        addButton.addActionListener(this);
        subtractButton.addActionListener(this);
        multiplyButton.addActionListener(this);
        divideButton.addActionListener(this);
        equalButton.addActionListener(this);
        clearButton.addActionListener(this);

        Panel buttonPanel = new Panel(new GridLayout(4, 4));
        buttonPanel.add(numberButtons[1]);
        buttonPanel.add(numberButtons[2]);
        buttonPanel.add(numberButtons[3]);
        buttonPanel.add(addButton);
        buttonPanel.add(numberButtons[4]);
        buttonPanel.add(numberButtons[5]);
        buttonPanel.add(numberButtons[6]);
        buttonPanel.add(subtractButton);
        buttonPanel.add(numberButtons[7]);
        buttonPanel.add(numberButtons[8]);
        buttonPanel.add(numberButtons[9]);
        buttonPanel.add(multiplyButton);
        buttonPanel.add(clearButton);
        buttonPanel.add(numberButtons[0]);
        buttonPanel.add(equalButton);
        buttonPanel.add(divideButton);

        setLayout(new BorderLayout());
        add(displayField, BorderLayout.NORTH);
        add(buttonPanel, BorderLayout.CENTER);

        setTitle("Calculator");
        setSize(300, 300);
        setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        String command = e.getActionCommand();

        if (Character.isDigit(command.charAt(0))) {
            displayField.setText(displayField.getText() + command);
        } else if (command.equals("+") || command.equals("-") || command.equals("*") || command.equals("/")) {
            operator = command;
            num1 = Double.parseDouble(displayField.getText());
            displayField.setText("");
        } else if (command.equals("=")) {
            num2 = Double.parseDouble(displayField.getText());
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
                    result = num1 / num2;
                    break;
            }
            displayField.setText(String.valueOf(result));
            num1 = result;
        } else if (command.equals("C")) {
            displayField.setText("");
            num1 = 0;
            num2 = 0;
            result = 0;
            operator = "";
        }
    }

    public static void main(String[] args) {
        new Calculator();
    }
}
