import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.awt.*;

import javax.swing.DefaultListCellRenderer;
import javax.swing.DefaultListModel;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JList;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.SwingConstants;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;



public class DeleteProduct implements ListSelectionListener {
	JLabel  price , quantityava , purchase ,quantity, productsadd , total,des,name;
	JTextField pric , quaava , totl,nam;
	JTextArea desc;
	JButton avapro,del,back;
	JComboBox quant;
	JTextArea a,b;
	JScrollPane scr;
	JList l;
	DefaultListModel m1 = new DefaultListModel();
	JPanel p;
	JLabel imgLabel = new JLabel(new ImageIcon("26998.png"));
	JFrame f = new JFrame();
	DeleteProduct(){
		f.setContentPane(new JLabel(new ImageIcon("bg3.jpg")));
		f.setTitle("Delete Product");
		
		p = new JPanel();
    	p.setBounds(300,90,700,500);
    //	p.setBackground(Color.gray);
		p.add(imgLabel);
    	
		avapro = new JButton("Products Available");
    	avapro.setFocusable(false);
    	avapro.setBounds(400,110,180,40);
    	avapro.setFont(new Font("Serif",Font.BOLD,17));
    	
    	f.add(avapro);
    	
    	del = new JButton("Delete");
    	del.setFocusable(false);
    	del.setBounds(700,480,150,40);
    	del.setFont(new Font("Serif",Font.ITALIC,20));
    	del.setBackground(Color.red);
    	
    	f.add(del);
    	        
    	price = new JLabel("Price:");
    	price.setBounds(700,70,100,100);
    	price.setFont(new Font("Serif",Font.BOLD,18));
    	f.add(price);
    	
        pric = new JTextField();
        pric.setBounds(700,140,150,25);
    	pric.setFont(new Font("Serif",Font.BOLD,18));
    	f.add(pric);
    	
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
    	
    	l = new JList();
    	scr = new JScrollPane(l,JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED,JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
    	scr.setBounds(400,160,180,400);
    	l.setFont(new Font("Serif",Font.PLAIN,25));
    	DefaultListCellRenderer renderer = (DefaultListCellRenderer) l.getCellRenderer();
    	renderer.setHorizontalAlignment(SwingConstants.CENTER);
    	l.setModel(m1);
    	l.addListSelectionListener(this);
    	f.add(scr);
    	
    	quantity = new JLabel("Quantity:");
    	quantity.setBounds(700,160,100,100);
    	quantity.setFont(new Font("Serif",Font.BOLD,18));
    	f.add(quantity);
    	
    	
    	String[] a = {"0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"};
    	quant = new JComboBox(a);
    	quant.setBounds(700,230,100,20);
    	f.add(quant);
    	
    	des = new JLabel("Description:");
    	des.setBounds(700,240,100,100);
    	des.setFont(new Font("Serif",Font.BOLD,18));
    	f.add(des);
    	
    	desc = new JTextArea();
        desc.setBounds(700,320,180,120);
    	desc.setFont(new Font("Serif",Font.BOLD,18));
    	desc.setWrapStyleWord(true);
    	f.add(desc);
    	
    	f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    	f.setSize(1370,720); 
    	f.add(p);
    	f.setLayout(null);
    	f.setVisible(true);
    	
    	avapro.addActionListener(new ActionListener() {
    	   	 
      		public void actionPerformed(ActionEvent e) {
    		// TODO Auto-generated method stub
    	/*if(e.getSource()==addpur) {
    		JOptionPane.showMessageDialog(null,"Your purchase is succesful. Congrats "+nam.getText(),"Confirmation",JOptionPane.DEFAULT_OPTION);
    	}
    	if(e.getSource()==back) {
     	   new NextPage();
     	   
        }*/
      			
      			
    		try {
    			
    			 Class.forName("com.mysql.cj.jdbc.Driver");
    			 Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/naihora", "root", "Aakash@123");	
    			
    			 String query = "Select name from product";
    			 PreparedStatement ps = conn.prepareStatement(query);
    			 ResultSet rs=ps.executeQuery(query);
    			 while(rs.next()) {
     			      // pric.setText(rs.getString("price"));
     			       //desc.setText(rs.getString("des"));	
     			       String n = rs.getString("name");
     			       m1.addElement(n);
     
    			 }
    			 
    			 //JOptionPane.showMessageDialog(null, "Retrieved data succesfully.","Record Retrieved",JOptionPane.INFORMATION_MESSAGE);
    		}
    		catch(Exception ex){
    			
    		}
      		}
      		});
    	
	del.addActionListener(new ActionListener() {
	   	 
  		public void actionPerformed(ActionEvent e) {
  			try {
  				String tmp = (String)l.getSelectedValue();
  				Class.forName("com.mysql.cj.jdbc.Driver");
  				 Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/naihora", "root", "Aakash@123");	
                  String sql = "Delete from product where name = '"+tmp+"' ";
                  Statement s = con.prepareStatement(sql);
                  s.execute(sql);
                  JOptionPane.showMessageDialog(null,"Product deleted.","Confirmation",JOptionPane.DEFAULT_OPTION);
  			}
  			catch(Exception ex){
  				
  			}
  			 
  			
  		}
	});
	}

	@Override
	public void valueChanged(ListSelectionEvent e) {
		// TODO Auto-generated method stub
		try {
    		String tmp = (String)l.getSelectedValue();
    	Class.forName("com.mysql.cj.jdbc.Driver");
		 Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/naihora", "root", "Aakash@123");	
    	String sql = "Select * from product where name=?";
    	PreparedStatement pst;
    	pst = con.prepareStatement(sql);
    	pst.setString(1, tmp);
    	ResultSet rs = pst.executeQuery();
    	if(rs.next()) {
                  String add1 = rs.getString("price");
                  pric.setText(add1);
                  String add2 = rs.getString("des");
                  desc.setText(add2);
                  String add3 = rs.getString("quan");
                  quant.setSelectedItem(add3);
                  }
    			}
catch(Exception ex){
			
		}
  
	}


	

	}
	