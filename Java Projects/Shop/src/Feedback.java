import java.awt.BorderLayout;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.ImageIcon;
import java.awt.Font;
import java.awt.Color;
import javax.swing.UIManager;
import javax.swing.JTextField;
import javax.swing.JButton;
import javax.swing.JRadioButton;
import javax.swing.ButtonGroup;
import java.awt.event.*;

public class Feedback extends JFrame implements ActionListener{

	public JPanel contentPane;
	public JTextField textField;
	public final ButtonGroup buttonGroup = new ButtonGroup();

	/**
	 * Launch the application.
	 */
	

JButton back,btnNewButton;
	/**
	 * Create the frame.
	 */
	public Feedback() {
		
		setBackground(UIManager.getColor("InternalFrame.inactiveTitleGradient"));
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 1125, 675);
		setLocationRelativeTo(null);
		
		contentPane = new JPanel();
		contentPane.setBackground(UIManager.getColor("InternalFrame.inactiveTitleGradient"));
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		
		contentPane.setLayout(null);
		
		JLabel lblNewLabel = new JLabel("");
		lblNewLabel.setIcon(new ImageIcon("feed.png"));
		lblNewLabel.setBounds(-13, 36, 588, 525);
		contentPane.add(lblNewLabel);
		
		JLabel lblNewLabel_1 = new JLabel("Feedback Form");
		lblNewLabel_1.setForeground(new Color(240, 128, 128));
		lblNewLabel_1.setFont(new Font("Tahoma", Font.BOLD, 38));
		lblNewLabel_1.setBounds(406, 10, 567, 63);
		contentPane.add(lblNewLabel_1);
		
		JLabel lblNewLabel_2 = new JLabel("Suggestions/Queries:");
		lblNewLabel_2.setFont(new Font("Tahoma", Font.PLAIN, 22));
		lblNewLabel_2.setBounds(580, 337, 219, 41);
		contentPane.add(lblNewLabel_2);
		
		textField = new JTextField();
		textField.setBounds(805, 353, 255, 82);
		contentPane.add(textField);
		textField.setColumns(10);
		
		 btnNewButton = new JButton("Submit");
		btnNewButton.setBounds(855, 511, 162, 31);
		btnNewButton.setFocusable(false);
		btnNewButton.addActionListener(this);
		contentPane.add(btnNewButton);
		
		 back = new JButton("Go Back");
    	 back.setFont(new Font("Callibri",Font.BOLD,18));
    	 back.setBounds(25,25,120,35);
    	 back.setFocusable(false);
    	 back.addActionListener(this);
    	 contentPane.add(back);
    	
		
		JLabel lblNewLabel_3 = new JLabel("How was your ");
		lblNewLabel_3.setFont(new Font("Tahoma", Font.PLAIN, 22));
		lblNewLabel_3.setBounds(580, 149, 208, 31);
		contentPane.add(lblNewLabel_3);
		
		JLabel lblNewLabel_4 = new JLabel("experience?");
		lblNewLabel_4.setFont(new Font("Tahoma", Font.PLAIN, 22));
		lblNewLabel_4.setBounds(580, 172, 162, 40);
		contentPane.add(lblNewLabel_4);
		
		JRadioButton rdbtnNewRadioButton = new JRadioButton("Poor");
		buttonGroup.add(rdbtnNewRadioButton);
		rdbtnNewRadioButton.setBounds(805, 154, 127, 31);
		contentPane.add(rdbtnNewRadioButton);
		
		JRadioButton rdbtnNewRadioButton_1 = new JRadioButton("Good");
		buttonGroup.add(rdbtnNewRadioButton_1);
		rdbtnNewRadioButton_1.setBounds(805, 207, 127, 31);
		contentPane.add(rdbtnNewRadioButton_1);
		
		JRadioButton rdbtnNewRadioButton_2 = new JRadioButton("Excellent");
		buttonGroup.add(rdbtnNewRadioButton_2);
		rdbtnNewRadioButton_2.setBounds(805, 259, 127, 31);
		contentPane.add(rdbtnNewRadioButton_2);
		
		setVisible(true);
		
	}
	
	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub
           if(e.getSource()==btnNewButton) {
        	   JOptionPane.showMessageDialog(null,"Your response is Submitted","Thank You!",JOptionPane.DEFAULT_OPTION);
           }
           if(e.getSource()==back) {
        	   new NextPage();
           }
	}
}
