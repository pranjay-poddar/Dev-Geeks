import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class FlappyBird extends JFrame implements ActionListener {
    private Timer timer;
    private int delay = 10;
    private int birdY = 300;
    private int birdVelocity = 0;
    private int score = 0;
    private int gapPosition = 250;
    private int gapHeight = 200;
    private int gapWidth = 100;
    private boolean gameover = false;

    public FlappyBird() {
        setTitle("Flappy Bird");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setResizable(false);
        setSize(800, 600);
        setLocationRelativeTo(null);

        timer = new Timer(delay, this);
        timer.start();

        addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                if (e.getKeyCode() == KeyEvent.VK_SPACE && !gameover) {
                    birdVelocity = -8;
                }
                if (e.getKeyCode() == KeyEvent.VK_ENTER && gameover) {
                    resetGame();
                }
            }
        });

        setVisible(true);
    }

    public void paint(Graphics g) {
    g.setColor(Color.cyan);
    g.fillRect(0, 0, getWidth(), getHeight());

    g.setColor(Color.orange);
    g.fillRect(0, getHeight() - 120, getWidth(), 120);

    g.setColor(Color.green);
    g.fillRect(gapPosition, getHeight() - 120 - gapHeight, gapWidth, gapHeight);

    // Draw the bird using pixels
    g.setColor(Color.red);
    g.fillRect(100, birdY, 40, 40);

    g.setColor(Color.white);
    g.setFont(new Font("Arial", Font.BOLD, 25));
    g.drawString("Score: " + score, 10, 30);

    if (gameover) {
        g.setFont(new Font("Arial", Font.BOLD, 50));
        g.drawString("Game Over", 250, getHeight() / 2 - 50);
        g.setFont(new Font("Arial", Font.BOLD, 30));
        g.drawString("Press Enter to Play Again", 230, getHeight() / 2);
    }
}




    public void actionPerformed(ActionEvent e) {
        if (!gameover) {
            birdY += birdVelocity;
            birdVelocity += 1;
            if (birdY > getHeight() - 120 - 40) {
                gameover = true;
            }
            if (gapPosition == 100) {
                score++;
            }
            gapPosition -= 2;
            if (gapPosition + gapWidth == 100) {
                gapPosition = getWidth();
                gapHeight = 100 + (int) (Math.random() * 200);
            }
            if (birdY < 0) {
                birdY = 0;
                birdVelocity = 0;
            }
        }
        repaint();
    }

    public void resetGame() {
        birdY = 300;
        birdVelocity = 0;
        score = 0;
        gapPosition = 250;
        gapHeight = 200;
        gameover = false;
    }

    public static void main(String[] args) {
        new FlappyBird();
    }
}
