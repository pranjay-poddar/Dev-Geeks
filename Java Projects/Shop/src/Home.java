

import java.awt.BorderLayout;
import java.awt.EventQueue;
import java.awt.event.*;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import java.awt.Frame;
import java.awt.Dimension;
import java.awt.Component;
import javax.swing.JLabel;
import javax.swing.ImageIcon;
import java.awt.SystemColor;
import java.awt.Color;
import java.awt.Font;
import javax.swing.JButton;
import javax.swing.UIManager;

public class Home extends JFrame implements ActionListener {

	private JPanel contentPane;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Home frame = new Home();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the frame.
	 */JButton btnNewButton;
	public Home() {
		//setExtendedState(Frame.MAXIMIZED_BOTH);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 1114, 651);
		setLocationRelativeTo(null);
		contentPane = new JPanel();
		contentPane.setBackground(SystemColor.inactiveCaptionBorder);
		contentPane.setAlignmentY(Component.TOP_ALIGNMENT);
		contentPane.setAlignmentX(Component.RIGHT_ALIGNMENT);
		contentPane.setMaximumSize(new Dimension(32779, 32772));
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);
		
		JLabel lblNewLabel = new JLabel("");
		lblNewLabel.setBackground(new Color(240, 240, 240));
		lblNewLabel.setIcon(new ImageIcon("bg.jpg"));
		lblNewLabel.setBounds(-19, 0, 852, 614);
		contentPane.add(lblNewLabel);
		
		JLabel lblNewLabel_1 = new JLabel("");
		lblNewLabel_1.setBackground(new Color(240, 255, 255));
		lblNewLabel_1.setIcon(new ImageIcon("Side1.jpg"));
		lblNewLabel_1.setBounds(803, -32, 389, 306);
		contentPane.add(lblNewLabel_1);
		
		 btnNewButton = new JButton("Proceed to Login");
		btnNewButton.setBackground(Color.LIGHT_GRAY);
		btnNewButton.setBounds(843, 571, 247, 33);
		btnNewButton.setFocusable(false);
		btnNewButton.addActionListener(this);
		contentPane.add(btnNewButton);
		
		JLabel lblNewLabel_2 = new JLabel("Welcome ");
		lblNewLabel_2.setFont(new Font("Tahoma", Font.BOLD, 34));
		lblNewLabel_2.setBounds(875, 287, 249, 78);
		contentPane.add(lblNewLabel_2);
		
		JLabel lblNewLabel_3 = new JLabel("To");
		lblNewLabel_3.setFont(new Font("Tahoma", Font.BOLD, 34));
		lblNewLabel_3.setBounds(925, 375, 130, 63);
		contentPane.add(lblNewLabel_3);
		
		JLabel lblNewLabel_4 = new JLabel("Star Shop!");
		lblNewLabel_4.setFont(new Font("Tahoma", Font.BOLD, 34));
		lblNewLabel_4.setBounds(875, 445, 188, 63);
		contentPane.add(lblNewLabel_4);
	}

	
	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub
		if(e.getSource()== btnNewButton) {
			Login l = new Login();
		}
	}
}