import java.awt.*;
import java.awt.event.*;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;

import net.proteanit.sql.DbUtils;



public class CustomerBill{
	JFrame f = new JFrame();
	JPanel p,pa;
	JTable t;
	JScrollPane s;
	DefaultTableModel m;
	JButton gen,back;
	JLabel imgLabel = new JLabel(new ImageIcon("26998.png"));
	JLabel imgLabel1 = new JLabel(new ImageIcon("final.png"));
	JLabel l;
	CustomerBill(){
		f.setContentPane(new JLabel(new ImageIcon("bg3.jpg")));
    	f.setTitle("Customer Bill");
		
		p = new JPanel();
    	p.setBounds(325,25,700,590);
    	//p.setBackground(Color.gray);
    	p.add(imgLabel);
    	
    	/*pa =new JPanel();
    	pa.setBounds(325,0,700,300);
    	pa.add(imgLabel1);*/
    	
    	imgLabel1.setBounds(325,30,700,160);
    	
     	back = new JButton("Go Back");
     	 back.setFont(new Font("Callibri",Font.BOLD,18));
     	 back.setBounds(50,25,120,35);
     	 back.setFocusable(false);
     	 
     	 f.add(back);
     	 back.addActionListener(new ActionListener() {
       	 
			public void actionPerformed(ActionEvent e) {
if(e.getSource()==back) {
new NextPage();
}
			}
	 });

    	s=  new JScrollPane();
    	s.setBounds(325,190,700,350);
    	f.add(s);
    	
        t = new JTable();
        m= new DefaultTableModel();
        s.setViewportView(t);
      
    	gen = new JButton("Generate Bill");
    	gen.setBounds(490,550,350,50);
    	gen.setFocusable(false);
    	gen.setFont(new Font("Serif",Font.ITALIC,30));
    	f.add(gen);
    	
    	 SimpleDateFormat sdf = new SimpleDateFormat("dd/mm/yyyy");
         Date d = new Date();
         String date = sdf.format(d);
	
    	f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    	f.setSize(1370,720);
    //	f.add(p);
    	f.add(imgLabel1);
    	f.add(p);
    	f.setLayout(null);
    	f.setVisible(true);
    	
    	 gen.addActionListener(new ActionListener() {
    	   	
    	  		public void actionPerformed(ActionEvent arg0) {
    	         			
    	  			
    	  			try {
    	  				 Class.forName("com.mysql.cj.jdbc.Driver");
    	  				 Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/naihora", "root", "Aakash@123");
    	  				 String query = "Select * from pro";
    	  			      PreparedStatement pst =conn.prepareStatement(query);
    	  			      ResultSet rs = pst.executeQuery();
    	  			      t.setModel(DbUtils.resultSetToTableModel(rs));
    	  			}
    	  			catch(Exception ex) {
    	  				
    	  			}
    	  			
    	  			
    	  			
    	  			
    	  		}
    	 });
	}
	
	/*public void Date() {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/mm/yyyy");
        Date d = new Date();
        String date = sdf.format(d);
        
	}*/
	
	
}


