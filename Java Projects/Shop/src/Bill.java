import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.swing.BorderFactory;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import java.awt.*;
import java.awt.print.*;

import com.mysql.cj.xdevapi.Statement;

public class Bill {
	JPanel p , pj;
	JLabel imgLabel = new JLabel(new ImageIcon("pa5.jpg"));
	JLabel name,items,total,email,nam,item,totl,emai,tot,date, dat,cash,time,tim;
	JButton View,print;
	JFrame f = new JFrame();
	Bill(){
		f.setContentPane(new JLabel(new ImageIcon("bg3.jpg")));
    	f.setTitle("Bill");
    	p = new JPanel();
    	p.setBounds(250,70,900,520);
    	//p.setBackground(Color.gray);
    	
    	p.add(imgLabel);
       
    	name = new JLabel("Name - ");
    	name.setBounds(450,200,220,40); //450,200,220,40
    	name.setFont(new Font("Serif",Font.BOLD,25));
    	f.add(name);
    
    	//f.add(name);
    	
    	items = new JLabel("Items Purchased - ");
    	items.setBounds(450,270,220,40);
    	items.setFont(new Font("Serif",Font.BOLD,25));
    	f.add(items);
    	
    	total = new JLabel("Total(\u20B9) - ");
    	total.setBounds(450,340,220,40);
    	total.setFont(new Font("Serif",Font.BOLD,25));
    	f.add(total);
    	
    	email = new JLabel("Email - ");
    	email.setBounds(450,410,220,40);
    	email.setFont(new Font("Serif",Font.BOLD,25));
    	f.add(email);
    	
    	nam = new JLabel();
    	nam.setBounds(550,200,220,40);
    	nam.setFont(new Font("Serif",Font.ITALIC,25));
    	f.add(nam);
    	
    	item = new JLabel();
    	item.setBounds(650,270,500,40);
    	item.setFont(new Font("Serif",Font.ITALIC,25));
    	f.add(item);
    	
    	totl = new JLabel();
    	totl.setBounds(570,340,220,40);
    	totl.setFont(new Font("Serif",Font.ITALIC,25));
    	f.add(totl);
    	
    	cash = new JLabel("Cash-Bill");
    	cash.setBounds(600,100,300,60);
    	cash.setFont(new Font("Serif",Font.ITALIC,60));
    	f.add(cash);
    	
    	emai = new JLabel();
    	emai.setBounds(550,410,400,40);
    	emai.setFont(new Font("Serif",Font.ITALIC,25));
    	f.add(emai);
    	
    	date = new JLabel("Date - ");
    	date.setBounds(950,120,220,40);
    	date.setFont(new Font("Serif",Font.ITALIC,25));
    	f.add(date);
    	
    	time = new JLabel("Time - ");
    	time.setBounds(950,150,220,40);
    	time.setFont(new Font("Serif",Font.ITALIC,25));
    	f.add(time);
    	
    	tim = new JLabel();
    	tim.setBounds(1020,150,220,40);
    	tim.setFont(new Font("Serif",Font.ITALIC,22));
    	f.add(tim);
    	
    	dat = new JLabel();
    	dat.setBounds(1020,120,220,40);
    	dat.setFont(new Font("Serif",Font.ITALIC,22));
    	f.add(dat);
    	
    	View = new JButton("View Bill");
    	View.setFocusable(false);;
    	View.setBounds(620,470,160,40);
    	View.setFont(new Font("Serif",Font.BOLD,25));
    	View.setBorder(BorderFactory.createEtchedBorder());
    	f.add(View);
    	
    	print = new JButton("Print");
    	print.setFocusable(false);;
    	print.setBounds(800,470,160,40);
    	print.setFont(new Font("Serif",Font.BOLD,25));
    	print.setBorder(BorderFactory.createEtchedBorder());
    	f.add(print);
    	
    	f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    	f.setSize(1370,720);
    	
        f.add(p);
    	 
    	f.setLayout(null);
    	f.setVisible(true);
    	
    	SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        Date d = new Date();
        String date = sdf.format(d);
      //  tim.setText(date);
    
    	View.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				// TODO Auto-generated method stub
				
				if(View==e.getSource()) {
					View.setVisible(false);
				}
				 tim.setText(date);
				
				try {
				 Class.forName("com.mysql.cj.jdbc.Driver");
				 Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/naihora", "root", "Aakash@123");
				 String sql = ("SELECT * FROM pro ORDER BY Product DESC LIMIT 1;");
				 PreparedStatement s = conn.prepareStatement(sql);
				 ResultSet rs = s.executeQuery();
				 if(rs.next()) {
					 String n = rs.getString("CustomerName");
					 nam.setText(n);
					 String p = rs.getString("Product");
					 item.setText(p);
					 String t = rs.getString("Total");
					 totl.setText(t);
					 String z = rs.getString("Email Id");
					 emai.setText(z);
					 String d = rs.getString("Date");
					 dat.setText(d);
				 }
				 
				// nam.setText(n);
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				}catch(Exception ex) {
					ex.printStackTrace();
				}
				}
			
			
    		
    	});
    

    	
    print.addActionListener(new ActionListener() {

		@Override
		public void actionPerformed(ActionEvent e) {
			// TODO Auto-generated method stub
			if(print==e.getSource()) {
				print.setVisible(false);
			}
			PrinterJob job = PrinterJob.getPrinterJob();
            job.setJobName("Print Data");
            
            job.setPrintable(new Printable(){
            public int print(Graphics pg,PageFormat pf, int pageNum){
                    pf.setOrientation(PageFormat.LANDSCAPE);
                 if(pageNum > 0){
                    return Printable.NO_SUCH_PAGE;
                }
                
                Graphics2D g2 = (Graphics2D)pg;
                g2.translate(pf.getImageableX(), pf.getImageableY());
                g2.scale(0.47,0.47);
                
                f.print(g2);
         
               
                return Printable.PAGE_EXISTS;
                         
                
            }
    });
            boolean ok = job.printDialog();
        if(ok){
        try{
            
        job.print();
        }
        catch (PrinterException ex){
	ex.printStackTrace();
}
        }
		}
    	
    });	
    	
	}

}
