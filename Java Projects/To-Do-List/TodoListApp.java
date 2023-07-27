import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

public class TodoListApp extends JFrame {
    private DefaultListModel<String> model;
    private JList<String> todoList;
    private JTextField inputField;
    private JButton addButton;
    private JButton deleteButton;

    public TodoListApp() {
        setTitle("To-Do List App");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(300, 400);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout());

        model = new DefaultListModel<>();
        todoList = new JList<>(model);
        JScrollPane scrollPane = new JScrollPane(todoList);
        add(scrollPane, BorderLayout.CENTER);

        inputField = new JTextField();
        add(inputField, BorderLayout.NORTH);

        addButton = new JButton("Add");
        addButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String item = inputField.getText();
                if (!item.isEmpty()) {
                    model.addElement(item);
                    inputField.setText("");
                }
            }
        });
        add(addButton, BorderLayout.SOUTH);

        deleteButton = new JButton("Delete");
        deleteButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int selectedIndex = todoList.getSelectedIndex();
                if (selectedIndex != -1) {
                    model.remove(selectedIndex);
                }
            }
        });
        add(deleteButton, BorderLayout.EAST);

        todoList.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                if (e.getClickCount() == 2) {
                    int selectedIndex = todoList.getSelectedIndex();
                    if (selectedIndex != -1) {
                        String selectedTask = model.getElementAt(selectedIndex);
                        // Implement task completion logic here
                        // Update the visual representation of completed tasks
                        // For example, you can use HTML formatting to strike-through the task
                        model.setElementAt("<html><strike>" + selectedTask + "</strike></html>", selectedIndex);
                    }
                }
            }
        });

        setVisible(true);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new TodoListApp();
            }
        });
    }
}
