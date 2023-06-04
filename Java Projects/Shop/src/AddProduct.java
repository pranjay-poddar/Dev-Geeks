import java.awt.Color;
import java.awt.Component;
import java.awt.Font;
import java.awt.event.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.swing.*;
public class AddProduct {
	JFrame f;
	JLabel name,price,quantity,description,date;
	JTextField nam,pric,dat;
	JTextArea des;
	JButton add,back;
	JPanel p;
	JComboBox quan;
	JLabel imgLabel = new JLabel(new ImageIcon("26998.png"));
	//ImageIcon i = new ImageIcon("panel bg.jpg");
         AddProduct(){
        	 f = new JFrame();
        	 f.setContentPane(new JLabel(new ImageIcon("bg3.jpg")));
        	 

        	    p = new JPanel();
            	p.setBounds(150,100,1100,500);
            	//p.setBackground(new Color(0,255,128));
            	p.add(imgLabel);
            	
        	                
        	 String[] nos = {"1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"};
             quan = new JComboBox(nos);
        	 
        	 
        	 name = new JLabel();
        	 price = new JLabel();
        	 quantity = new JLabel();
        	 description = new JLabel();
        	 date = new JLabel();
        	 
        	 nam = new JTextField();
        	 pric = new JTextField();
        	 dat = new JTextField();
        	 des = new JTextArea();
        	 
        	 add = new JButton("Add");
        	 add.setFont(new Font("Callibri",Font.BOLD,18));
        	 add.setBounds(670,500,100,35);
        	 add.setFocusable(false);
        	 
        	 
        	 back = new JButton("Go Back");
        	 back.setFont(new Font("Callibri",Font.BOLD,18));
        	 back.setBounds(50,25,120,35);
        	 back.setFocusable(false);
        	 back.addActionListener(new ActionListener() {
            	 
        			public void actionPerformed(ActionEvent e) {
 if(e.getSource()==back) {
	 new NextPage();
 }
        			}
        	 });
        	 
        	 
        	 name.setText("Product Name:");
        	  name.setFont(new Font("Serif",Font.BOLD,18));
        	  name.setBounds(200,50,250,200);
        	  
        	  
        	  price.setText("Product Price:");
        	  price.setFont(new Font("Serif",Font.BOLD,18));
        	  price.setBounds(200,140,250,200);
        	  
        	  quantity.setText("Quantity:");
        	  quantity.setFont(new Font("Serif",Font.BOLD,18));
        	  quantity.setBounds(200,230,250,200);
        	  
        	  date.setText("Added on Date:");
        	  date.setFont(new Font("Serif",Font.BOLD,18));
        	  date.setBounds(200,320,250,200);
        	  
        	  description.setText("Description:");
        	  description.setFont(new Font("Serif",Font.BOLD,18));
        	  description.setBounds(800,50,250,200);

        	  
        	  nam.setBounds(200,170,500,25);
        	  nam.setFont(new Font("Callibri",Font.PLAIN,16));
        	  
        	  pric.setBounds(200,260,500,25);
        	  pric.setFont(new Font("Callibri",Font.PLAIN,16));
        	  
        	  quan.setBounds(200,350,250,25);
        	  
        	  SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        	     Date d = new Date();
        	     String da = sdf.format(d);
        	  
        	  dat.setText(da);
        	  dat.setBounds(200,440,500,25);
        	  dat.setFont(new Font("Callibri",Font.PLAIN,16));
        	  
        	  des.setBounds(800,170,400,200);
        	  des.setFont(new Font("Callibri",Font.PLAIN,16));
        	  
        	  f.setTitle("Add Product");
        	  f.setSize(1370,720);
        	  f.add(name);
        	  f.add(price);
        	  f.add(quantity);
        	  f.add(date);
        	  f.add(description);
        	  f.add(nam);
        	  f.add(pric);
        	  f.add(quan);
        	  f.add(dat);
        	  f.add(des);
        	  f.add(add);
        	  f.add(back);
        	  
        	  f.add(p);
        	  
        	
        	  f.setLayout(null);
        	  f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        	  f.setVisible(true);
         
		
         add.addActionListener(new ActionListener() {
        	 
		public void actionPerformed(ActionEvent e) {
			// TODO Auto-generated method stub
			
		String n = nam.getText() ;
		String p = pric.getText();
		String q = (String) quan.getSelectedItem();		
		String d = dat.getText();
		String de = des.getText();
		String msg = "" + n;
        msg += " \n";	
		
try {

	 Class.forName("com.mysql.cj.jdbc.Driver");
	 Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/naihora", "root", "Aakash@123");
	 String query = "INSERT INTO product values('" + n + "','" +p + "','" + q + "','" + d + "','" + de + "' )";
	 Statement sta = conn.prepareStatement(query);
      sta.execute(query);
    /* if (x == 0) {
         JOptionPane.showMessageDialog(add, "This is alredy exist");
     }*/
         JOptionPane.showMessageDialog(add,"Your Product, " + msg + " is successfully added");
         add.setVisible(false);
         new AddProduct().add.setVisible(true);
         
         
     
	
	
}
catch (Exception exception) {
    exception.printStackTrace();
}			
			
			
						
			
			/*if(e.getSource()==add) {
				JOptionPane.showMessageDialog(null,"Your product is successfully added.","Confirmation",JOptionPane.DEFAULT_OPTION);
			}*/
			/*if(e.getSource()==back) {
				new NextPage();
			}*/
		}
		});
		}
}

