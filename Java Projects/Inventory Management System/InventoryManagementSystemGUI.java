import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class InventoryManagementSystemGUI extends JFrame {

    private JLabel nameLabel;
    private JTextField nameTextField;
    private JLabel priceLabel;
    private JTextField priceTextField;
    private JLabel quantityLabel;
    private JTextField quantityTextField;
    private JButton addButton;
    private JButton updateButton;
    private JButton removeButton;
    private JButton checkButton;

    private JTextArea outputTextArea;

    private Product[] products;

    public InventoryManagementSystemGUI() {
        super("Inventory Management System");
        initializeComponents();
        createLayout();
        createListeners();
        initializeProducts();
    }

    private void initializeComponents() {
        nameLabel = new JLabel("Product Name:");
        nameTextField = new JTextField(20);
        priceLabel = new JLabel("Price:");
        priceTextField = new JTextField(10);
        quantityLabel = new JLabel("Quantity:");
        quantityTextField = new JTextField(10);
        addButton = new JButton("Add");
        updateButton = new JButton("Update");
        removeButton = new JButton("Remove");
        checkButton = new JButton("Check");
        outputTextArea = new JTextArea(10, 40);
        outputTextArea.setEditable(false);
    }

    private void createLayout() {
        JPanel panel = new JPanel();
        panel.setLayout(new GridLayout(6, 2));
        panel.add(nameLabel);
        panel.add(nameTextField);
        panel.add(priceLabel);
        panel.add(priceTextField);
        panel.add(quantityLabel);
        panel.add(quantityTextField);
        panel.add(addButton);
        panel.add(updateButton);
        panel.add(removeButton);
        panel.add(checkButton);

        JScrollPane scrollPane = new JScrollPane(outputTextArea);

        Container container = getContentPane();
        container.setLayout(new BorderLayout());
        container.add(panel, BorderLayout.NORTH);
        container.add(scrollPane, BorderLayout.CENTER);
    }

    private void createListeners() {
        addButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String name = nameTextField.getText();
                double price = Double.parseDouble(priceTextField.getText());
                int quantity = Integer.parseInt(quantityTextField.getText());
                Product product = new Product(name, price, quantity);
                products = addProduct(products, product);
                outputTextArea.append("Product added: " + product.getName() + "\n");
                clearInputFields();
            }
        });

        updateButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String name = nameTextField.getText();
                double price = Double.parseDouble(priceTextField.getText());
                int quantity = Integer.parseInt(quantityTextField.getText());
                Product product = new Product(name, price, quantity);
                products = updateProduct(products, product);
                outputTextArea.append("Product updated: " + product.getName() + "\n");
                clearInputFields();
            }
        });

        removeButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String name = nameTextField.getText();
                products = removeProduct(products, name);
                outputTextArea.append("Product removed: " + name + "\n");
                clearInputFields();
            }
        });

        checkButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String name = nameTextField.getText();
                checkProduct(products, name);
                clearInputFields();
            }
        });
    }

    private void initializeProducts() {
        int n = Integer.parseInt(JOptionPane.showInputDialog("Please enter the number of products you want to add: "));
        products = new Product[n];
        for (int i = 0; i < n; i++) {
            String name = JOptionPane.showInputDialog("Please enter the name of the product: ");
            double price = Double.parseDouble(JOptionPane.showInputDialog("Please enter the price of the product: "));
            int quantity = Integer.parseInt(JOptionPane.showInputDialog("Please enter the quantity of the product: "));
            products[i] = new Product(name, price, quantity);
        }
    }

    private void clearInputFields() {
        nameTextField.setText("");
        priceTextField.setText("");
        quantityTextField.setText("");
    }

    public static Product[] addProduct(Product[] products, Product product) {
        Product[] newProducts = new Product[products.length + 1];
        System.arraycopy(products, 0, newProducts, 0, products.length);
        newProducts[products.length] = product;
        return newProducts;
    }

    public static Product[] updateProduct(Product[] products, Product product) {
        Product[] newProducts = new Product[products.length];
        for (int i = 0; i < products.length; i++) {
            if (products[i].getName().equals(product.getName())) {
                newProducts[i] = product;
            } else {
                newProducts[i] = products[i];
            }
        }
        return newProducts;
    }

    public static Product[] removeProduct(Product[] products, String name) {
        Product[] newProducts = new Product[products.length - 1];
        int j = 0;
        for (int i = 0; i < products.length; i++) {
            if (!products[i].getName().equals(name)) {
                newProducts[j] = products[i];
                j++;
            }
        }
        return newProducts;
    }

    public static void checkProduct(Product[] products, String name) {
        for (Product product : products) {
            if (product.getName().equals(name)) {
                JOptionPane.showMessageDialog(null, "Product found!\n" +
                        "Name: " + product.getName() + "\n" +
                        "Price: " + product.getPrice() + "\n" +
                        "Quantity: " + product.getQuantity());
                return;
            }
        }
        JOptionPane.showMessageDialog(null, "Product not found!");
    }

    public static void main(String[] args) {
        InventoryManagementSystemGUI frame = new InventoryManagementSystemGUI();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.pack();
        frame.setVisible(true);
    }
}
