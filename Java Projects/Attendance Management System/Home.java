import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;


public class Home{
	
	public void homeView(int id) throws SQLException {
		JFrame frame = new JFrame();
		Font btn = new Font("Times New Roman", Font.BOLD, 20);
		Admin adm = new Admin();
		
		//------------------------CLOSE---------------------------
		JLabel x = new JLabel("X");
		x.setForeground(Color.decode("#37474F"));
		x.setBounds(965, 10, 100, 20);
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
		min.setForeground(Color.decode("#37474F"));
		min.setBounds(935, 0, 100, 20);
		frame.add(min);
		min.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				frame.setState(JFrame.ICONIFIED);
			}
		});
		//-------------------------------------------------------------
		
		//------------------Panel----------------------------------
		JPanel panel = new  JPanel();
		panel.setBounds(0, 0, 1000, 35);
		panel.setBackground(Color.decode("#DEE4E7"));
		frame.add(panel);
		//---------------------------------------------------------
		
		//-------------------Welcome---------------------------------
		JLabel welcome = new JLabel("Welcome "+getUser(id)+",");
		welcome.setForeground(Color.decode("#DEE4E7"));
		welcome.setBounds(10, 50, 250, 20);
		welcome.setFont(new Font("Times New Roman", Font.PLAIN, 20));
		frame.add(welcome);
		//-----------------------------------------------------------
		
		//----------------------STUDENTS----------------------------
		JButton students = new JButton("STUDENTS");
		students.setBounds(150, 125, 700, 60);
		students.setFont(btn);
		students.setBackground(Color.decode("#DEE4E7"));
		students.setForeground(Color.decode("#37474F"));
		frame.add(students);
		students.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				Students std = new Students();
				try {
					std.studentView();
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
		});
		//----------------------------------------------------------
		
		//----------------------ADDATTENDANCE----------------------------
		JButton addattendance = new JButton("ADD ATTENDANCE");
		addattendance.setBounds(150, 250, 400, 60);
		addattendance.setFont(btn);
		addattendance.setBackground(Color.decode("#DEE4E7"));
		addattendance.setForeground(Color.decode("#37474F"));
		frame.add(addattendance);
		addattendance.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				AddAttendance addatt = new AddAttendance();
				try {
					addatt.addView();
				} catch (SQLException e1) {
					e1.printStackTrace();
				}
			}
		});
		//----------------------------------------------------------
		
		//----------------------EDITATTENDANCE----------------------------
		JButton editattendance = new JButton("EDIT ATTENDANCE");
		editattendance.setBounds(600, 250, 250, 60);
		editattendance.setFont(btn);
		editattendance.setBackground(Color.decode("#DEE4E7"));
		editattendance.setForeground(Color.decode("#37474F"));
		frame.add(editattendance);
		editattendance.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				EditAttendance editatt = new EditAttendance();
				try {
					editatt.editView();
				} catch (SQLException e1) {
					e1.printStackTrace();
				}
			}
		});
		//----------------------------------------------------------
		
		//----------------------TEACHERS----------------------------
		JButton teacher = new JButton("TEACHERS");
		teacher.setBounds(150, 375, 700, 60);
		teacher.setFont(new Font("Times New Roman", Font.BOLD, 20));
		teacher.setBackground(Color.decode("#DEE4E7"));
		teacher.setForeground(Color.decode("#37474F"));
		frame.add(teacher);
		teacher.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				Teachers teacher = new Teachers();
				try {
					teacher.teachersView();
				} catch (SQLException e1) {
					e1.printStackTrace();
				}
			}
		});
		//----------------------------------------------------------
		
		//----------------------USER----------------------------
		JButton admin = new JButton("ADMIN");
		admin.setBounds(150, 500, 250, 60);
		admin.setFont(new Font("Times New Roman", Font.BOLD, 20));
		admin.setBackground(Color.decode("#DEE4E7"));
		admin.setForeground(Color.decode("#37474F"));
		frame.add(admin);
		admin.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				try {
					adm.adminView();
				} 
				catch (SQLException e1) {
					e1.printStackTrace();
				}
			}
		});
		//----------------------------------------------------------
		
		//----------------------CLASS----------------------------
		JButton classes = new JButton("CLASS");
		classes.setBounds(450, 500, 400, 60);
		classes.setFont(new Font("Times New Roman", Font.BOLD, 20));
		classes.setBackground(Color.decode("#DEE4E7"));
		classes.setForeground(Color.decode("#37474F"));
		frame.add(classes);
		classes.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				Class classroom = new Class();
				classroom.classView();
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
	
	public String getUser(int id) throws SQLException {
	    //ENTER PORT, USER, PASSWORD.
		String url = "jdbc:mysql://localhost:3306/attendance";
		String user = "root";
		String pass = "password";
		Connection con = DriverManager.getConnection(url, user, pass);
		String str = "SELECT name FROM user WHERE id = "+id;
		Statement stm = con.createStatement();
		ResultSet rst = stm.executeQuery(str);
		rst.next();
		return rst.getString("name");
	}
}