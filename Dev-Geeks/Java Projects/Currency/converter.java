import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
public class converter {

	
	public static void converter()
	{

		
		JFrame f = new JFrame("CONVERTER");

		
		JLabel l12, l22;

		
		JTextField t12, t22;

		
		JButton b12, b22, b32;

		
		l12 = new JLabel("Rupees:");
		l12.setBounds(20, 40, 60, 30);
		l22 = new JLabel("Dollars:");
		l22.setBounds(170, 40, 60, 30);

		
		t12 = new JTextField("0");
		t12.setBounds(80, 40, 50, 30);
		t22 = new JTextField("0");
		t22.setBounds(240, 40, 50, 30);

		
		b12 = new JButton("INR");
		b12.setBounds(50, 80, 60, 15);
		b22 = new JButton("Dollar");
		b22.setBounds(190, 80, 60, 15);
		b32 = new JButton("close");
		b32.setBounds(150, 150, 60, 30);

		// Adding action listener
		b12.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e)
			{
				
				double d
					= Double.parseDouble(t12.getText());

				
				double d1 = (d / 79.58);

				
				String str1 = String.valueOf(d1);

				
				t22.setText(str1);
			}
		});

		// Adding action listener
		b22.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e)
			{
				// Converting to double
				double d2
					= Double.parseDouble(t22.getText());

				// converting Dollars to rupees
				double d3 = (d2 * 79.58);

				String str2 = String.valueOf(d3);

				
				t12.setText(str2);
			}
		});

		
		b32.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e)
			{
				f.dispose();
			}
		});

		
		f.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e)
			{
				System.exit(0);
			}
		});

		
		f.add(l12);
		f.add(t12);
		f.add(l22);
		f.add(t22);
		f.add(b12);
		f.add(b22);
		f.add(b32);

		f.setLayout(null);
		f.setSize(400, 300);
		f.setVisible(true);
	}

	// Driver code
	public static void main(String args[])
	{
		converter();
	}
}

