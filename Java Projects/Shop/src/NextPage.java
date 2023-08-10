import javax.swing.*;
import javax.swing.border.LineBorder;

import java.awt.*;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.BorderLayout;
import java.awt.event.*;
  
public class NextPage implements ActionListener
 {
	JFrame f = new JFrame();
	JButton addproduct, deleteproduct , customerbill , topurchase , quit , feedback,exit;
	JLabel l;
	JPanel p = new JPanel();
	JLabel imgLabel = new JLabel(new ImageIcon("26786.png"));	
   NextPage()
  {
	   f.setContentPane(new JLabel(new ImageIcon("bg3.jpg")));
	//   p.setBackground(Color.black);
		  
	   p.setBounds(300,100,710,350);
	   p.add(imgLabel);
	   
	   
	   addproduct = new JButton();
	   addproduct.setBounds(350,130,260,50);
	   addproduct.setFocusable(false);
	   addproduct.setText("Add Product");
	   addproduct.setFont(new Font("Arial",Font.BOLD,25));
	   addproduct.setBorder(BorderFactory.createEtchedBorder());
	   addproduct.addActionListener(this);
	   
	   deleteproduct = new JButton();
	   deleteproduct.setBounds(350,210,260,50);
	   deleteproduct.setFocusable(false);
	   deleteproduct.setText("Delete Product");
	   deleteproduct.setFont(new Font("Arial",Font.BOLD,25));
	   deleteproduct.setBorder(BorderFactory.createEtchedBorder());
	   deleteproduct.addActionListener(this);
	   
	   topurchase = new JButton();
	   topurchase.setBounds(350,290,260,50);
	   topurchase.setFocusable(false);
	   topurchase.setText("Purchase Product");
	   topurchase.setFont(new Font("Arial",Font.BOLD,25));
	   topurchase.setBorder(BorderFactory.createEtchedBorder());
	   topurchase.addActionListener(this);
	   
	   customerbill = new JButton();
	   customerbill.setBounds(700,130,260,50);
	   customerbill.setFocusable(false);
	   customerbill.setText("View Product");
	   customerbill.setFont(new Font("Arial",Font.BOLD,25));
	   customerbill.setBorder(BorderFactory.createEtchedBorder());
	   customerbill.addActionListener(this);
	   
	   feedback = new JButton();
	   feedback.setBounds(700,210,260,50);
	   feedback.setFocusable(false);
	   feedback.setText("Update Product");
	   feedback.setFont(new Font("Arial",Font.BOLD,25));
	   feedback.setBorder(BorderFactory.createEtchedBorder());
	   feedback.addActionListener(this);
	   
	   quit = new JButton();
	   quit.setBounds(700,290,260,50);
	   quit.setFocusable(false);
	   quit.setText("Bill History");
	   quit.setFont(new Font("Arial",Font.BOLD,25));
	   quit.setBorder(BorderFactory.createEtchedBorder());
	   quit.addActionListener(this);
	   
	   exit = new JButton();
	   exit.setBounds(550,370,200,50);
	   exit.setFocusable(false);
	   exit.setText("Quit");
	   exit.setFont(new Font("Arial",Font.BOLD,25));
	   exit.setBorder(BorderFactory.createEtchedBorder());
	   exit.addActionListener(this);
	   f.add(exit);
	   
	   l = new JLabel("Menu");
	   l.setBounds(590,40,170,100);
	   l.setFont(new Font("Serif",Font.BOLD,50));
	   l.setForeground(Color.green);
	   
	  // p.setBackground(Color.black);
	  
	 //  p.setBounds(300,100,710,350);
		
	   

  f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
  f.setTitle("MENU");
  
  f.setSize(1370, 720);
/*  p.add(addproduct);
  p.add(deleteproduct);
  p.add(topurchase);
  p.add(customerbill);
  p.add(feedback);
  p.add(quit);*/
  
  
  f.add(addproduct);
  f.add(deleteproduct);
  f.add(topurchase);
  f.add(customerbill);
  f.add(feedback);
  f.add(quit);
 // f.add(l);
  //p.add(l);
  f.add(p);
  f.setVisible(true);
  f.setLayout(null);
//  f.add(p);
//  p.add(imgLabel);
   }

public void actionPerformed(ActionEvent e) {
	// TODO Auto-generated method stub
        if(e.getSource()==addproduct) {
        	AddProduct p = new AddProduct();
        }
        if(e.getSource()==topurchase) {
        	new ToPurchase();
        }
        if(e.getSource()==feedback) {
        	new UpdateProduct();
        }
        
        if(e.getSource()==deleteproduct) {
        	new DeleteProduct();
        }
        
        
        if(e.getSource()==quit) {
        	new CustomerBill();
        }
        if(e.getSource()==customerbill) {
        	new ViewProduct();
        }
        if(e.getSource()==exit) {
        	System.exit(0);
        }
        
}
  }