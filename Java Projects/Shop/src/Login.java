import java.awt.Font;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.Arrays;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;
import java.sql.Statement;


import javax.swing.JOptionPane;
public class Login  {
        JFrame f;
        JLabel l;
        JLabel la;
        JLabel im;
        JButton b,bu,but;
       
       JTextField t,te;
       JPasswordField p = new JPasswordField();
     Login(){
    	 f = new JFrame("Login");
    	 l = new JLabel();
    	 la = new JLabel();
    	 //b = new JButton();
    	 //bu = new JButton();
    	 but = new JButton();
    	t= new JTextField();
    	te = new JTextField();
    	 
    	 f.setContentPane(new JLabel(new ImageIcon("hue.jpg")));
    	
         
    	 
         
    	 f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    	 f.setSize(1370,720);
    	 
    	 l.setText("Username ");
    	 l.setBounds(530,100,200,200);
    	 
    	 t.setBounds(650,190,200,30);
    	 t.setFont(new Font("Consolas",Font.PLAIN,18));
    	 
    	 l.setFont(new Font("Serif",Font.BOLD,18));
    	 
    	 la.setText("Password ");
    	 la.setBounds(530,165,200,200);
    	 
    	 p.setBounds(650,250,200,30);
    	 p.setFont(new Font("Consolas",Font.PLAIN,18));
    	 
    	 la.setFont(new Font("Serif",Font.BOLD,18));
    	 
    	 
    	 
    	 but.setBounds(590,310,80,30);
    	 but.setText("Login");
    	 but.setFont(new Font("Serif",Font.BOLD,18));
    	 but.setFocusable(false);
    	 
    	 f.add(l);
    	 f.add(la);
    	 f.add(t);
    	 f.add(p);
    	
    	 f.add(but);
    
    	 
    	 f.setLayout(null);
    	 f.setVisible(true);
    	 
    	 but.addActionListener(new ActionListener() {
     
    
    		 public void actionPerformed(ActionEvent e) {    
	
	   /* String tt = t.getText();
	    String pp = p.getText();
	    String msg = "" + tt;
        msg += " \n";*/
		// TODO Auto-generated method stub
		try {
            Class.forName("com.mysql.cj.jdbc.Driver");

			Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/firstdb", "root", "Aakash@123");
            
			 Statement stmt=con.createStatement();
			 String sql="Select * from login where  username='"+t.getText()+"' and password='"+p.getText().toString()+"'";
			 ResultSet rs=stmt.executeQuery(sql);
			 if(rs.next()) {
			 JOptionPane.showMessageDialog(null, "Login Sucessful");
			 new NextPage();
			 }
			 else
			 JOptionPane.showMessageDialog(null, "Incorrect Username  and Password");
			
					}
           
		catch (Exception exception) {
            exception.printStackTrace();
        }
	}
 });
     }
}