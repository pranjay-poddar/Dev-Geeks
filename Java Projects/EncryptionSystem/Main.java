package EncryptionSystem;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import javax.imageio.ImageIO;
import javax.swing.JFrame;
import javax.swing.*;

public class Main {
ImageIcon image;
Dimension d = null;
  public Main() {
  	JFrame frame = new JFrame("Encryption & Decryption System");
  	d=Toolkit.getDefaultToolkit().getScreenSize();
  	frame.setSize(d.width/2, d.height/2);
	frame.setLocation(d.width/4,d.height/4);
	frame.setResizable(false);
frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
JPanel panel1=new JPanel();
JPanel panel2=new JPanel();
JPanel panel3=new JPanel();
panel1.setPreferredSize(new Dimension(100,100));
panel2.setPreferredSize(new Dimension(100,100));
panel3.setPreferredSize(new Dimension(100,100));
panel1.setOpaque(true);
panel2.setOpaque(true);
panel3.setOpaque(true);
panel1.setBackground(Color.yellow);
panel1.setForeground(Color.red);
panel2.setBackground(Color.green);
panel2.setForeground(Color.red);
panel3.setBackground(Color.yellow);
panel3.setForeground(Color.red);
image=new ImageIcon("wait.GIF");
JLabel im= new JLabel(image);
JLabel msg=new JLabel("LOADING............");
panel1.add(msg);
panel2.add(im);
frame.add(panel1,BorderLayout.NORTH);
frame.add(panel2,BorderLayout.CENTER);
frame.add(panel3,BorderLayout.SOUTH); 
//frame.setVisible(true);
//try
//{
	//Thread.sleep(4000);
	new Cryptography();
	//frame.setVisible(false);
	//frame.dispose();
//}
//catch(InterruptedException ec){}
}
public static void main(String args[]) throws Exception {
  	new Main();
  }
}