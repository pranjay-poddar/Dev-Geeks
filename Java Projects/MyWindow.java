//java programm to create digital watch
import java.awt.Color;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
//import java.sql.Date;
import java.util.*;
//import java.util.Timer;


import javax.swing.*;
import javax.swing.Timer;
public class MyWindow extends JFrame{
    private JLabel heading;
    private JLabel clockLabel;
     private Font fon=new Font("",Font.ITALIC,35);
    private Font font=new Font("",Font.BOLD,30);
    //private Color c=new Color(PROPERTIES, HEIGHT, SOMEBITS, FRAMEBITS)
     //private Font f=new Font("",Font.BOLD,25);
    MyWindow(){
        //setTitle function () defines title to appear at the top of the sketch window
        super.setTitle("CLOCK");
        super.getContentPane().setBackground(Color.pink);
        //super.setForeground(Color.red);
        super.setSize(450,400);
        super.setLocation(450,50);
        this.createGUI();
        this.startClock();
        super.setVisible(true);
    }
    public void createGUI(){
        heading=new JLabel("            DIGI CLOCK");
        clockLabel=new JLabel("clock");
        heading.setFont(fon);
        clockLabel.setFont(font);
        this.setLayout(new GridLayout(2,1));
        this.add(heading);
        this.add(clockLabel);
    }
    public void startClock(){
        Timer timer=new Timer(1000,new ActionListener() {
            
            @Override
            public void actionPerformed(ActionEvent e){
                //Date() is a constructor initializes the object with current dare and time
                String dateTime=new Date().toString();
                clockLabel.setText(dateTime);
            }
        });

        
        
        
        timer.start();

    }
    
}
