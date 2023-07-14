import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class DoraemonAnimation extends JPanel {
    private int x = 50; // Initial x-coordinate of Doraemon
    private int y = 50; // Initial y-coordinate of Doraemon
    private boolean isEating = false; // Flag to indicate if Doraemon is eating

    public DoraemonAnimation() {
        // Create a JFrame to hold the animation panel
        JFrame frame = new JFrame("Doraemon Animation");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(500, 500);
        frame.setResizable(false);
        frame.add(this);
        frame.setVisible(true);

        // Start the animation
        startAnimation();
    }

    private void startAnimation() {
        // Create a Timer to update the position and animation of Doraemon
        Timer timer = new Timer(200, new ActionListener() {
            private int frameCount = 0;

            @Override
            public void actionPerformed(ActionEvent e) {
                // Update the position of Doraemon
                x += 5;
                y += 5;

                // Update the animation frame
                frameCount++;

                // Toggle the eating flag every 10 frames
                if (frameCount % 10 == 0) {
                    isEating = !isEating;
                }

                // Repaint the panel to show the updated position and animation
                repaint();
            }
        });

        // Start the timer
        timer.start();
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        // Set the background color
        setBackground(Color.WHITE);

        // Draw Doraemon at the current position and animation state
        drawDoraemon(g, x, y, isEating);
    }

    private void drawDoraemon(Graphics g, int x, int y, boolean isEating) {
        // Draw the body of Doraemon
        g.setColor(new Color(16, 137, 255));
        g.fillOval(x, y, 100, 100);

        // Draw the face of Doraemon
        g.setColor(Color.WHITE);
        g.fillOval(x + 20, y + 20, 60, 60);

        // Draw the eyes of Doraemon
        g.setColor(Color.BLACK);
        g.fillOval(x + 30, y + 40, 15, 20);
        g.fillOval(x + 55, y + 40, 15, 20);

        // Draw the nose of Doraemon
        g.setColor(Color.RED);
        g.fillOval(x + 42, y + 55, 15, 15);

        // Draw the mouth of Doraemon
        g.setColor(Color.BLACK);
        g.fillArc(x + 30, y + 60, 45, 20, 180, 180);

        // Draw the Dorayaki
        g.setColor(Color.ORANGE);
        g.fillArc(x + 20, y + 80, 30, 15, 0, 180);

        // Draw the whiskers of Doraemon
        g.setColor(Color.BLACK);
        g.drawLine(x + 20, y + 45, x + 10, y + 55);
        g.drawLine(x + 20, y + 50, x + 10, y + 50);
        g.drawLine(x + 20, y + 55, x + 10, y + 45);
        g.drawLine(x + 80, y + 45, x + 90, y + 55);
        g.drawLine(x + 80, y + 50, x + 90, y + 50);
        g.drawLine(x + 80, y + 55, x + 90, y + 45);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(DoraemonAnimation::new);
    }
}
