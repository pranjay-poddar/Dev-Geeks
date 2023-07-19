import java.awt.*;
import java.awt.event.*;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

import javax.swing.*;

public class phonebook implements ActionListener {
    
    JFrame frame;
    JTextField nameField, phoneField, searchField;
    JTextArea contactArea;
    JButton addButton, viewButton, searchButton;
    JPanel inputPanel, outputPanel;
    String name, phone, search;
    
    public phonebook() {
        frame = new JFrame("Contact Book");
        nameField = new JTextField();
        phoneField = new JTextField();
        searchField = new JTextField();
        contactArea = new JTextArea();
        addButton = new JButton("Add Contact");
        viewButton = new JButton("View Contacts");
        searchButton = new JButton("Search");
        inputPanel = new JPanel(new GridLayout(3, 2));
        outputPanel = new JPanel(new BorderLayout());
        name = "";
        phone = "";
        search = "";
        
        inputPanel.add(new JLabel("Name:"));
        inputPanel.add(nameField);
        inputPanel.add(new JLabel("Phone:"));
        inputPanel.add(phoneField);
        inputPanel.add(new JLabel("Search:"));
        inputPanel.add(searchField);
        addButton.addActionListener(this);
        viewButton.addActionListener(this);
        searchButton.addActionListener(this);
        outputPanel.add(contactArea, BorderLayout.CENTER);
        outputPanel.add(viewButton, BorderLayout.SOUTH);
        frame.add(inputPanel, BorderLayout.NORTH);
        frame.add(outputPanel, BorderLayout.CENTER);
        JPanel buttonPanel = new JPanel(new FlowLayout());
        buttonPanel.add(addButton);
        buttonPanel.add(searchButton);
        frame.add(buttonPanel, BorderLayout.SOUTH);
        frame.setSize(400, 400);
        frame.setVisible(true);
    }
    
    public static void main(String[] args) {
        new phonebook();
    }
    
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == addButton) {
            name = nameField.getText();
            phone = phoneField.getText();
            if (!name.equals("") && !phone.equals("")) {
                try {
                    FileWriter writer = new FileWriter("contacts.txt", true);
                    writer.write(name + "," + phone + "\n");
                    writer.close();
                    contactArea.append(name + " - " + phone + "\n");
                    nameField.setText("");
                    phoneField.setText("");
                } catch (IOException ex) {
                    ex.printStackTrace();
                }
            }
        } else if (e.getSource() == viewButton) {
            try {
                BufferedReader reader = new BufferedReader(new FileReader("contacts.txt"));
                String line;
                contactArea.setText("");
                while ((line = reader.readLine()) != null) {
                    String[] contact = line.split(",");
                    contactArea.append(contact[0] + " - " + contact[1] + "\n");
                }
                reader.close();
                JOptionPane.showMessageDialog(frame, outputPanel, "Contacts", JOptionPane.PLAIN_MESSAGE);
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        } else if (e.getSource() == searchButton) {
            search = searchField.getText();
            try {
                BufferedReader reader = new BufferedReader(new FileReader("contacts.txt"));
                String line;
                contactArea.setText("");
                while ((line = reader.readLine()) != null) {
                    String[] contact = line.split(",");
                    if (contact[0].toLowerCase().contains(search.toLowerCase())) {
                        contactArea.append(contact[0] + " - " + contact[1] + "\n");
                    }
                }
                reader.close();
                JOptionPane.showMessageDialog(frame, outputPanel, "Contacts", JOptionPane.PLAIN_MESSAGE);
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
    }
}