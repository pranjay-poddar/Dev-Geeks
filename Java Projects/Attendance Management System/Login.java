import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JTextField;

import java.sql.*;

public class Login{
	
	int usr = 0;
	public void loginView() {
		JFrame frame = new JFrame();
		Font text = new Font("Times New Roman", Font.PLAIN, 20);
		Home hm = new Home();
		TeacherView tview = new TeacherView();
		StudentView sview = new StudentView();
		
		//-------------------------LOGO--------------------------
		JLabel attendance = new JLabel("ATTENDANCE");
		attendance.setForeground(Color.decode("#37474F"));
		attendance.setBounds(100, 275, 400, 50);
		attendance.setFont(new Font("Verdana", Font.BOLD, 50));
		frame.add(attendance);
		JLabel management = new JLabel("MANAGEMENT SYSTEM");
		management.setForeground(Color.decode("#37474F"));
		management.setBounds(280, 310, 400, 50);
		management.setFont(new Font("Verdana", Font.BOLD, 15));
		frame.add(management);
		//-------------------------------------------------------
		
		//------------------Panel----------------------------------
		JPanel panel = new  JPanel();
		panel.setBounds(0, 0, 500, 600);
		panel.setBackground(Color.decode("#DEE4E7"));
		frame.add(panel);
		//---------------------------------------------------------
		
		//------------------------CLOSE---------------------------
		JLabel x = new JLabel("X");
		x.setForeground(Color.decode("#DEE4E7"));
		x.setBounds(965, 20, 100, 20);
		x.setFont(new Font("Times New Roman", Font.BOLD, 20));
		frame.add(x);
		x.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				System.exit(0);
			}
		});
		//----------------------------------------------------------
		
		//-----------------------MINIMIZE-----------------------------
		JLabel min = new JLabel("_");
		min.setForeground(Color.decode("#DEE4E7"));
		min.setBounds(935, 10, 100, 20);
		min.setFont(new Font("Times New Roman", Font.BOLD, 20));
		frame.add(min);
		min.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				frame.setState(JFrame.ICONIFIED);
			}
		});
		//-------------------------------------------------------------
		
		//--------------------------LOGINTEXT---------------------------
		JLabel lgn = new JLabel("LOGIN");
		lgn.setForeground(Color.decode("#DEE4E7"));
		lgn.setBounds(625, 100, 350, 75);
		lgn.setFont(new Font("Times New Roman", Font.BOLD, 75));
		frame.add(lgn);
		//---------------------------------------------------------------
		
		//-------------------------USER--------------------------
		JLabel user = new JLabel("Username");
		user.setForeground(Color.decode("#DEE4E7"));
		user.setBounds(570, 250, 100, 20);
		user.setFont(text);
		frame.add(user);
		//-------------------------------------------------------
		
		//-----------------------USERFIELD-----------------------
		JTextField username = new JTextField();
		username.setBounds(570, 285, 360, 35);
		username.setBackground(Color.decode("#DEE4E7"));
		username.setForeground(Color.decode("#37474F"));
		username.setFont(new Font("Times New Roman", Font.BOLD, 15));
		frame.add(username);
		//---------------------------------------------------------
		
		//-------------------------Password--------------------------
		JLabel pass = new JLabel("Password");
		pass.setForeground(Color.decode("#DEE4E7"));
		pass.setBounds(570, 350, 100, 20);
		pass.setFont(text);
		frame.add(pass);
		//-------------------------------------------------------
		
		//-----------------------PASSWORDFIELD-----------------------
		JPasswordField password = new JPasswordField();
		password.setBounds(570, 385, 360, 35);
		password.setBackground(Color.decode("#DEE4E7"));
		password.setForeground(Color.decode("#37474F"));
		frame.add(password);
		//---------------------------------------------------------
		
		//-------------------------WARNING--------------------------
		JLabel warning = new JLabel();
		warning.setForeground(Color.RED);
		warning.setBounds(625, 450, 250, 20);
		warning.setHorizontalAlignment(warning.CENTER);
		frame.add(warning);
		//-------------------------------------------------------
		
		//----------------------LOGIN----------------------------
		JButton login = new JButton("LOGIN");
		login.setBounds(625, 500, 250, 50);
		login.setFont(new Font("Times New Roman", Font.BOLD, 20));
		login.setBackground(Color.decode("#DEE4E7"));
		login.setForeground(Color.decode("#37474F"));
		frame.add(login);
		login.addActionListener(new ActionListener() {
			@SuppressWarnings("deprecation")
			@Override
			public void actionPerformed(ActionEvent e) {
				try {
					int res = dbCheck(username.getText(), password.getText());
					if(res == 0) {
						warning.setText("NO USER FOUND!!!");
						username.setText("");
						password.setText("");
					}
					else if(res == -1) {
						warning.setText("WRONG PASSWORD!!!");
						username.setText("");
						password.setText("");
					}
					else {
						if(res == 1)
							hm.homeView(usr);
						else if(res == 2)
							tview.tcView(usr);
						else if (res == 3)
							sview.stView(usr);
						frame.dispose();
					}
				} catch (SQLException e1) {
					e1.printStackTrace();
				}
			}
		});
		//----------------------------------------------------------
		
		//-------------------------------------------------------
		frame.setSize(1000,600);
		frame.setResizable(false);
		frame.setLayout(null);
		frame.setUndecorated(true);
		frame.setLocationRelativeTo(null);  
		frame.setVisible(true);
		frame.setFocusable(true);
		frame.getContentPane().setBackground(Color.decode("#37474F"));
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		//--------------------------------------------------------------
	}
	
	public int dbCheck(String name, String password) throws SQLException {
	    //ENTER PORT, USER, PASSWORD.
		String url = "jdbc:mysql://localhost:3306/attendance";
		String user = "root";
		String pass = "password";
		String str = "SELECT * FROM user WHERE username = '" + name + "'";
		Connection con = DriverManager.getConnection(url, user, pass);
		Statement stm = con.createStatement();
		ResultSet rst = stm.executeQuery(str);
		if(rst.next()) {
			if(rst.getString("password").equals(password)) {
				usr = rst.getInt("id");
				return rst.getInt("prio");
			}
			else
				return -1;
		}
		else {
			return 0;
		}
	}
}