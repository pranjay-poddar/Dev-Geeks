import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class TicTacToeGame extends JFrame implements ActionListener {
    private JButton[][] buttons;
    private boolean xTurn;
    private int moves;

    public TicTacToeGame() {
        super("Tic-Tac-Toe");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(300, 300);
        setLayout(new GridLayout(3, 3));
        initializeButtons();
        xTurn = true;
        moves = 0;
    }

    private void initializeButtons() {
        buttons = new JButton[3][3];
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                buttons[i][j] = new JButton();
                buttons[i][j].setFont(new Font(Font.SANS_SERIF, Font.BOLD, 80));
                buttons[i][j].addActionListener(this);
                add(buttons[i][j]);
            }
        }
    }

    private void resetGame() {
        xTurn = true;
        moves = 0;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                buttons[i][j].setEnabled(true);
                buttons[i][j].setText("");
            }
        }
    }

    private void checkWin() {
        String[][] board = new String[3][3];
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                board[i][j] = buttons[i][j].getText();
            }
        }

        // Check rows
        for (int i = 0; i < 3; i++) {
            if (board[i][0].equals(board[i][1]) && board[i][0].equals(board[i][2]) && !board[i][0].isEmpty()) {
                highlightWinningCells(i, 0, i, 1, i, 2);
                showWinMessage(board[i][0]);
                return;
            }
        }

        // Check columns
        for (int i = 0; i < 3; i++) {
            if (board[0][i].equals(board[1][i]) && board[0][i].equals(board[2][i]) && !board[0][i].isEmpty()) {
                highlightWinningCells(0, i, 1, i, 2, i);
                showWinMessage(board[0][i]);
                return;
            }
        }

        // Check diagonals
        if (board[0][0].equals(board[1][1]) && board[0][0].equals(board[2][2]) && !board[0][0].isEmpty()) {
            highlightWinningCells(0, 0, 1, 1, 2, 2);
            showWinMessage(board[0][0]);
            return;
        }

        if (board[0][2].equals(board[1][1]) && board[0][2].equals(board[2][0]) && !board[0][2].isEmpty()) {
            highlightWinningCells(0, 2, 1, 1, 2, 0);
            showWinMessage(board[0][2]);
            return;
        }

        // Check draw
        if (moves == 9) {
            showDrawMessage();
        }
    }

    private void highlightWinningCells(int x1, int y1, int x2, int y2, int x3, int y3) {
        buttons[x1][y1].setBackground(Color.GREEN);
        buttons[x2][y2].setBackground(Color.GREEN);
        buttons[x3][y3].setBackground(Color.GREEN);
    }

    private void showWinMessage(String winner) {
        JOptionPane.showMessageDialog(this, "Player " + winner + " wins!", "Game Over", JOptionPane.INFORMATION_MESSAGE);
        disableAllButtons();
    }

    private void showDrawMessage() {
        JOptionPane.showMessageDialog(this, "It's a draw!", "Game Over", JOptionPane.INFORMATION_MESSAGE);
        disableAllButtons();
    }

    private void disableAllButtons() {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                buttons[i][j].setEnabled(false);
            }
        }
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        JButton button = (JButton) e.getSource();
        if (button.getText().isEmpty()) {
            if (xTurn) {
                button.setText("X");
            } else {
                button.setText("O");
            }
            xTurn = !xTurn;
            moves++;
            button.setEnabled(false);
            checkWin();
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            TicTacToeGame game = new TicTacToeGame();
            game.setVisible(true);
        });
    }
}
