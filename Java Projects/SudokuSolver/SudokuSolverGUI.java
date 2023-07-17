import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class SudokuSolverGUI extends JFrame {

    private JTextField[][] puzzleFields;
    private JButton solveButton;

    public SudokuSolverGUI() {
        super("Sudoku Solver");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        // Create the puzzle grid
        JPanel puzzlePanel = new JPanel(new GridLayout(9, 9));
        puzzleFields = new JTextField[9][9];

        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                puzzleFields[row][col] = new JTextField(1);
                puzzleFields[row][col].setFont(new Font("Arial", Font.BOLD, 24));
                puzzleFields[row][col].setHorizontalAlignment(JTextField.CENTER);
                puzzlePanel.add(puzzleFields[row][col]);
            }
        }

        // Create the solve button
        solveButton = new JButton("Solve");
        solveButton.setFont(new Font("Arial", Font.BOLD, 16));
        solveButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                solveSudoku();
            }
        });

        // Add components to the frame
        add(puzzlePanel, BorderLayout.CENTER);
        add(solveButton, BorderLayout.SOUTH);

        pack();
        setLocationRelativeTo(null);
        setResizable(false);
        setVisible(true);
    }

    // Solve the Sudoku puzzle
    private void solveSudoku() {
        int[][] puzzle = new int[9][9];

        // Read the puzzle values from the text fields
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                String value = puzzleFields[row][col].getText();
                puzzle[row][col] = value.isEmpty() ? 0 : Integer.parseInt(value);
            }
        }

        // Solve the puzzle
        if (solve(puzzle)) {
            // Display the solution in the text fields
            for (int row = 0; row < 9; row++) {
                for (int col = 0; col < 9; col++) {
                    puzzleFields[row][col].setText(String.valueOf(puzzle[row][col]));
                }
            }
        } else {
            JOptionPane.showMessageDialog(this, "No solution found!", "Sudoku Solver", JOptionPane.ERROR_MESSAGE);
        }
    }

    // Recursive method to solve the Sudoku puzzle
    private boolean solve(int[][] puzzle) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (puzzle[row][col] == 0) {
                    for (int num = 1; num <= 9; num++) {
                        if (isValid(puzzle, row, col, num)) {
                            puzzle[row][col] = num;

                            if (solve(puzzle)) {
                                return true;
                            } else {
                                puzzle[row][col] = 0; // Backtrack
                            }
                        }
                    }
                    return false; // No valid number found
                }
            }
        }
        return true; // Puzzle solved
    }

    // Check if a number is valid in the Sudoku puzzle
    private boolean isValid(int[][] puzzle, int row, int col, int num) {
        // Check row
        for (int j = 0; j < 9; j++) {
                        if (puzzle[row][j] == num) {
                return false;
            }
        }

        // Check column
        for (int k = 0; k < 9; k++) {
            if (puzzle[k][col] == num) {
                return false;
            }
        }

        // Check 3x3 box
        int boxRow = (row / 3) * 3;
        int boxCol = (col / 3) * 3;
        for (int m = 0; m < 3; m++) {
            for (int n = 0; n < 3; n++) {
                if (puzzle[boxRow + m][boxCol + n] == num) {
                    return false;
                }
            }
        }

        return true; // Number is valid
    }

    public static void main(String[] args) {
        try {
            // Set look and feel to Nimbus for a modern UI
            UIManager.setLookAndFeel("javax.swing.plaf.nimbus.NimbusLookAndFeel");
        } catch (Exception e) {
            e.printStackTrace();
        }

        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                new SudokuSolverGUI();
            }
        });
    }
}

