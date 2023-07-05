import javax.swing.*;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class ColorPaletteGenerator extends JFrame {

    private JPanel colorPanel;
    private JSlider redSlider, greenSlider, blueSlider;
    private JButton generateButton;

    public ColorPaletteGenerator() {
        setTitle("Color Palette Generator");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        // Color Panel
        colorPanel = new JPanel();
        colorPanel.setPreferredSize(new Dimension(200, 200));
        colorPanel.setBackground(Color.BLACK);
        add(colorPanel, BorderLayout.CENTER);

        // Sliders
        redSlider = createSlider();
        greenSlider = createSlider();
        blueSlider = createSlider();

        // Generate Button
        generateButton = new JButton("Generate");
        generateButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                generatePalette();
            }
        });

        // Layout
        JPanel sliderPanel = new JPanel(new GridLayout(3, 2));
        sliderPanel.add(new JLabel("Red:"));
        sliderPanel.add(redSlider);
        sliderPanel.add(new JLabel("Green:"));
        sliderPanel.add(greenSlider);
        sliderPanel.add(new JLabel("Blue:"));
        sliderPanel.add(blueSlider);

        JPanel buttonPanel = new JPanel();
        buttonPanel.add(generateButton);

        JPanel controlPanel = new JPanel(new BorderLayout());
        controlPanel.add(sliderPanel, BorderLayout.CENTER);
        controlPanel.add(buttonPanel, BorderLayout.SOUTH);
        add(controlPanel, BorderLayout.SOUTH);

        pack();
        setVisible(true);
    }

    private JSlider createSlider() {
        JSlider slider = new JSlider(0, 255, 0);
        slider.setMajorTickSpacing(50);
        slider.setMinorTickSpacing(10);
        slider.setPaintTicks(true);
        slider.setPaintLabels(true);
        slider.addChangeListener(new ChangeListener() {
            @Override
            public void stateChanged(ChangeEvent e) {
                generatePalette();
            }
        });
        return slider;
    }

    private void generatePalette() {
        int red = redSlider.getValue();
        int green = greenSlider.getValue();
        int blue = blueSlider.getValue();

        Color selectedColor = new Color(red, green, blue);
        colorPanel.setBackground(selectedColor);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new ColorPaletteGenerator();
            }
        });
    }
}
