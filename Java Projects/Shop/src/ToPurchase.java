import javax.swing.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.*;
import java.util.Properties;
import javax.swing.border.Border;
import javax.swing.border.LineBorder;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import javax.swing.text.Caret;
import java.awt.event.*;
import java.sql.Array;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.awt.*;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.net.HttpURLConnection;
public class ToPurchase implements ListSelectionListener {
	JPanel p , pj;
	JLabel  price , quantityava , purchase ,quantity, productsadd , total,des,name,phn;
	JTextField pric , quaava , totl,nam,phnn;
	JButton avapro , addpur , buy,back,proceed;
	JComboBox quant;
	JTextArea b,desc;
	JScrollPane a;
	JList l,li;
	DefaultListModel m1 = new DefaultListModel();
	DefaultListModel m2 = new DefaultListModel();
	JLabel imgLabel = new JLabel(new ImageIcon("26998.png"));
	int aa;
	int totalll = 0;

	JFrame f = new JFrame();
	
	
	
    ToPurchase() {

    	f.setContentPane(new JLabel(new ImageIcon("bg3.jpg")));
    	f.setTitle("Make Purchase");
    	
    	p = new JPanel();
    	p.setBounds(250,70,900,550);
    	//p.setBackground(Color.gray);
    	p.add(imgLabel);

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
    	
    	avapro = new JButton("Products Available");
    	avapro.setFocusable(false);
    	avapro.setBounds(300,110,220,40);
    	avapro.setFont(new Font("Serif",Font.BOLD,22));
    	
    	f.add(avapro);
    	
    	pj = new JPanel();
        
    	price = new JLabel("Price:");
    	//price.setBounds(360,70,100,100);
    	price.setBounds(600,70,100,100);
    	price.setFont(new Font("Serif",Font.BOLD,18));
    	f.add(price);
    	
        pric = new JTextField();
        pric.setBounds(600,140,200,25);
    	pric.setFont(new Font("Serif",Font.BOLD,18));
    	f.add(pric);
    	
    	l = new JList();
    	a= new JScrollPane(l,JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED,JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
    	a.setBounds(300,160,220,400);
    	l.setFont(new Font("Serif",Font.PLAIN,25));
    	DefaultListCellRenderer renderer = (DefaultListCellRenderer) l.getCellRenderer();
    	renderer.setHorizontalAlignment(SwingConstants.CENTER);
    	
    	l.setModel(m1);
    	l.addListSelectionListener(this);
    	//a= new JScrollPane(l);
    
    	f.add(a);
  	  //  f.add(l);
    
    	
    	quantity = new JLabel("Quantity (Available):");
    	quantity.setBounds(600,160,300,100);
    	quantity.setFont(new Font("Serif",Font.BOLD,18));
    	f.add(quantity);
    	
    	
    	String[] c = {"0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"};
    	quant = new JComboBox(c);
    	quant.setBounds(600,230,100,20);
    	f.add(quant);
    	
    	des = new JLabel("Description:");
    	des.setBounds(600,240,100,100);
    	des.setFont(new Font("Serif",Font.BOLD,18));
    	f.add(des);
    	
    	desc = new JTextArea();
        desc.setBounds(600,320,200,120);
    	desc.setFont(new Font("Serif",Font.BOLD,18));
    	desc.setLineWrap(true);
        desc.setWrapStyleWord(true);      
    	f.add(desc);

    	buy = new JButton("ADD");
    	buy.setFocusable(false);
    	buy.setBounds(600,470,110,35);
    	buy.setFont(new Font("Serif",Font.BOLD,22));
    	buy.setBorder(new LineBorder(Color.green,5));
    	buy.setBackground(Color.cyan);
    	f.add(buy);
    	
    	productsadd = new JLabel("Products Purchased:");
    	productsadd.setBounds(900,50,200,100);
    	productsadd.setFont(new Font("Serif",Font.BOLD,18));
    	f.add(productsadd);
    	
    	b = new JTextArea();
    	//b.setBounds(600,140,200,200);
    	b.setBounds(900,120,200,200);
    	b.setFont(new Font("Serif",Font.PLAIN,20));
    	
    	//li.setModel(m2);
    	f.add(b);
    	
    	total = new JLabel("Total:");
    	total.setBounds(900,300,100,100);
    	total.setFont(new Font("Serif",Font.BOLD,18));
    	f.add(total);
    	
    	totl = new JTextField();
        totl.setBounds(900,370,200,25);
    	totl.setFont(new Font("Serif",Font.BOLD,18));
    	f.add(totl);
    	
    	name = new JLabel("Name:");
    	name.setBounds(900,380,100,100);
    	name.setFont(new Font("Serif",Font.BOLD,18));
    	f.add(name);
    	
    	nam = new JTextField();
        nam.setBounds(900,450,200,25);
    	nam.setFont(new Font("Serif",Font.BOLD,18));
    	f.add(nam);
    	
    	addpur = new JButton("Buy Now");
    	addpur.setFocusable(false);
    	addpur.setBounds(900,570,120,35);
    	addpur.setFont(new Font("Serif",Font.BOLD,22));
    	addpur.setBorder(new LineBorder(Color.green,4));
    	addpur.setBackground(Color.red);
    	addpur.setForeground(Color.black);
    	f.add(addpur);
    	
    	phn = new JLabel("Email:");
    	phn.setBounds(900,450,100,100);
    	phn.setFont(new Font("Serif",Font.BOLD,18));
    	f.add(phn);
    	
    	phnn = new JTextField();
        phnn.setBounds(900,520,200,25);
    	phnn.setFont(new Font("Serif",Font.BOLD,18));
    	f.add(phnn);

    	proceed = new JButton("Bill-Receipt");
    	proceed.setFocusable(false);
    	proceed.setBounds(1180,570,150,40);
    	proceed.setFont(new Font("Serif",Font.ITALIC,22));
    	proceed.setBorder(new LineBorder(Color.green,4));
    	proceed.setBackground(Color.black);
    	proceed.setForeground(Color.yellow);
    	f.add(proceed);
     	 proceed.addActionListener(new ActionListener() {
        	 
 			public void actionPerformed(ActionEvent e) {
 if(e.getSource()==proceed) {
 new Bill();
 }
 			}
 	 });
    	
    	f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    	f.setSize(1370,720);
        f.add(p);
    	 
    	f.setLayout(null);
    	f.setVisible(true);
    
   	 SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
     Date d = new Date();
     String date = sdf.format(d);
	
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
  
    buy.addActionListener(new ActionListener() {
    	 
  		public void actionPerformed(ActionEvent e) {
  			String tmp = (String)l.getSelectedValue()+" × "+(String) quant.getSelectedItem();
  			String q =  (String) quant.getSelectedItem();
  			int qq = Integer.parseInt(q);
  			int abc;
  	   
//  			m2.addElement(tmp);
  			if(qq!=0) {
            b.append(tmp+";\n");
  			}
  			else {
  				JOptionPane.showMessageDialog(buy, "Not in Stock");	
  			}
  			
  			try {
  			String	tmpp=(String)l.getSelectedValue();
  				Class.forName("com.mysql.cj.jdbc.Driver");
  				Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/naihora", "root", "Aakash@123");	
  		    	String sql = "Select * from product where name=?";
  		    	PreparedStatement pst;
  		    	pst = con.prepareStatement(sql);
  		    	pst.setString(1, tmpp);
  		    	ResultSet rs = pst.executeQuery();
  		    	if(rs.next()) {
  		    	String add3 = rs.getString("quan");
  		    	int ba;
  		    	ba = Integer.parseInt(add3);
  		    	if(qq>ba) {
  		    		JOptionPane.showMessageDialog(buy, "Not in Stock, Please select less quantity");
  		    		new ToPurchase();
  		    	}
                if(qq==ba ) {  		    	
                      String query = "Update product set quan='"+0+"' where name ='"+tmpp+"' " ;
                      pst = con.prepareStatement(query);
                      pst.execute();
                }
                if(qq<ba ) {
                	int n;
                	n = ba-qq;
                	String query = "Update product set quan= '"+n+"'where name ='"+tmpp+"'";
                	pst = con.prepareStatement(query);
                     pst.execute();
                }
  		    	
  		    	}
  			}
  			catch(Exception ex) {
  				
  			}
  			
  				aa = Integer.parseInt(pric.getText());
  				abc = aa * qq;
  				totalll = totalll + abc;
  			    abc=totalll;
  			    if(qq!=0) {
  			    totl.setText(Integer.toString(totalll));
  			    }
  			    
         			    
  			 
  		}
  		
  		
  	
  		
  		
    });
    addpur.addActionListener(new ActionListener() {
      	 
  		public void actionPerformed(ActionEvent e) {
               String ttt =   totl.getText();
               String na = nam.getText();
               String xi = b.getText();
               String z = phnn.getText();               
               String msg = "" + na;
               msg += " \n";
               try {
            	   Class.forName("com.mysql.cj.jdbc.Driver");
            	   Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/naihora", "root", "Aakash@123");
            		 String sql = "Insert into pro values('"+na+"','"+xi+"','"+ttt+"','"+date+"','"+z+"')";
            		
            		 Statement sta = conn.createStatement();
            	     int x = sta.executeUpdate(sql);
            	     if (x == 0) {
            	         JOptionPane.showMessageDialog(addpur, "This is alredy exist");
            	     } else {
            	         JOptionPane.showMessageDialog(null,"Thanks " + msg + " for shopping","Confirmation",JOptionPane.DEFAULT_OPTION);
            	         
            	     }
               }
               catch(Exception ex) {
            	   
               }
               
           /*    String q =  (String) quant.getSelectedItem();
     			int qq = Integer.parseInt(q);
               
               try {
         			String	tmpp=(String)l.getSelectedValue();
         				Class.forName("com.mysql.cj.jdbc.Driver");
         				Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/naihora", "root", "Aakash@123");	
         		    	String sql = "Select * from product where name=?";
         		    	PreparedStatement pst;
         		    	pst = con.prepareStatement(sql);
         		    	pst.setString(1, tmpp);
         		    	ResultSet rs = pst.executeQuery();
         		    	if(rs.next()) {
         		    	String add3 = rs.getString("quan");
         		    	int ba;
         		    	ba = Integer.parseInt(add3);
         		    	
         		    	
               
               
               
               
               
               if(qq==ba) {  		    	
                   String query = "Update product set quan='"+0+"' where name ='"+tmpp+"' " ;
                   pst = con.prepareStatement(query);
                   pst.execute();
             }
             if(qq<ba ) {
             	int n;
             	n = ba-qq;
             	String query = "Update product set quan= '"+n+"'where name ='"+tmpp+"'";
             	pst = con.prepareStatement(query);
                 pst.execute();
             }
         		    	}	}  	  catch(Exception e1) {   
         		    		
         		    	}
             */  
               
               
               
               
               
               
               
               
               
               
               
               
               
            Session newsession = null;
           	MimeMessage mimeMessage = null;
           	Properties properties =  System.getProperties();
    		properties.put("mail.smtp.auth","true");
    		properties.put("mail.smtp.starttls.enable","true");
    	      
    		properties.put("mail.smtp.port","587");
    	    newsession = Session.getDefaultInstance(properties,null);
    	    String[] emailReceipients = {z};
    		String emailSubject = "Bill Confirmation";
    		String emailBody = "Thank you for shopping "+na+". \nYour total bill is "+ttt+".\nHope you liked the experience. Please Visit again";
    		mimeMessage = new MimeMessage(newsession);
    		for (int i=0;i<emailReceipients.length;i++)
    		{
    			try {
					mimeMessage.addRecipient(Message.RecipientType.TO,new InternetAddress(emailReceipients[i]));
				} catch (AddressException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				} catch (MessagingException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
    		}
    		try {
				mimeMessage.setSubject(emailSubject);
			} catch (MessagingException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
    		MimeBodyPart bodypart = new MimeBodyPart();
    		try {
				bodypart.setContent(emailBody,"text/html");
			} catch (MessagingException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
    		MimeMultipart multipart = new MimeMultipart();
    		try {
				multipart.addBodyPart(bodypart);
			} catch (MessagingException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
    		try {
				mimeMessage.setContent(multipart);
			} catch (MessagingException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
    		String fromUser = "vaishnavaakash35@gmail.com";
    		String pa = "9673308462";
    		String ehost = "smtp.gmail.com";
    		Transport t = null;
			try {
				t = newsession.getTransport("smtp");
			} catch (NoSuchProviderException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
    		try {
				t.connect(ehost,fromUser,pa);
			} catch (MessagingException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
    		try {
				t.sendMessage(mimeMessage,mimeMessage.getAllRecipients());
			} catch (MessagingException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
    		try {
				t.close();
			} catch (MessagingException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
    		System.out.println("Email send");
              
               
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

