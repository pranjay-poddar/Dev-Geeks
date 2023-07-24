package EncryptionSystem;


import java.nio.*;
import java.nio.channels.*;
import java.io.*;
import java.awt.*;
import java.awt.event.*;
import java.awt.Color.*;
import javax.swing.*;
import javax.swing.filechooser.FileFilter;
import java.util.*;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
class JavaFileFilter extends FileFilter{
	public boolean accept(File file)
	{
		if(file.getName().endsWith(".txt")) return true;
		if(file.getName().endsWith(".java")) return true;
		if(file.isDirectory()) return true;
		return false;
	}
	public String getDescription()
	{
		return "Java & Text file for Encryption and Dencryption";
	}
}

class SaveJavaFileFilter extends FileFilter
 {
    public boolean accept(File f)
   {
        if (f.isDirectory())
        	return true;

         String s = f.getName();

        return s.endsWith(".java");
   }

   public String getDescription()
  {
       return "*.java";
  }

}

class SaveTextFileFilter extends FileFilter
 {
    public boolean accept(File f)
   {
        if (f.isDirectory())
        	return true;
         String s = f.getName();

        return s.endsWith(".txt");
   }

   public String getDescription()
  {
       return "*.txt";
  }

}
public class Cryptography extends JFrame implements ActionListener
{
	public JButton browse,enc,denc,cancel;
    private JLabel label;
    private JTextField filename;
    private JFileChooser jfc;
    private File file;
    Dimension d = null;
FileInputStream fin;
FileOutputStream fout;
FileChannel fichan,fochan;
long fsize;
ByteBuffer mbuf,ombuf;
long key=0;
String ext="";
JScrollPane displayScrollPane;
ImageIcon image;
int wdth,hight;

    public Cryptography() {
    	super("Encryption and Decryption System");
    	d=Toolkit.getDefaultToolkit().getScreenSize();
    	setBackground(Color.yellow);
		setForeground(Color.red);
    	wdth=d.width/2;
    	hight=d.height/2;
        setSize(wdth, hight);
        setLocation(d.width/4, d.height/4);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setResizable(false);
        label = new JLabel("CHOOSE THE TEXT OR JAVA FILE FOR ENCRYPTION OR DECRYPTION");
        filename = new JTextField(50);
        filename.setEditable(false);
        browse=new JButton("Browse");
        browse.setForeground(Color.BLUE);
        enc=new JButton("Encrypt");
        enc.setForeground(Color.BLUE);
        enc.setEnabled(false);
        denc=new JButton("Dencrypt");
        denc.setForeground(Color.BLUE);
        denc.setEnabled(false);
        cancel=new JButton("Cancel");
        cancel.setForeground(Color.RED);
        jfc=new JFileChooser();
        jfc.setFileFilter(new JavaFileFilter());
        JPanel buttonPanel1 = new JPanel();
        JPanel buttonPanel2 = new JPanel();
        JPanel loadPanel = new JPanel();
        buttonPanel1.setPreferredSize(new Dimension(100,100));
        buttonPanel2.setPreferredSize(new Dimension(100,100));
        loadPanel.setPreferredSize(new Dimension(100,100));
        buttonPanel1.setOpaque(true);
		buttonPanel2.setOpaque(true);
		loadPanel.setOpaque(true);
		loadPanel.setBackground(Color.yellow);
		buttonPanel1.setBackground(Color.green);
		buttonPanel1.setForeground(Color.red);
		buttonPanel2.setBackground(Color.green);
		buttonPanel2.setForeground(Color.red);
		buttonPanel1.setBorder(BorderFactory.createLineBorder(Color.BLUE));
		buttonPanel2.setBorder(BorderFactory.createLineBorder(Color.BLUE));
		buttonPanel1.add(label);
        buttonPanel1.add(filename);
        buttonPanel1.add(browse);
        buttonPanel2.add(enc);
        buttonPanel1.add(denc);
        buttonPanel2.add(cancel);
        label.setBounds(105, 10, 400, 25);
       	browse.addActionListener(this);
       	enc.addActionListener(this);
       	denc.addActionListener(this);
       	cancel.addActionListener(this);
       	add(buttonPanel1, BorderLayout.NORTH);
        add(loadPanel, BorderLayout.CENTER);
        add(buttonPanel2, BorderLayout.SOUTH);
        setVisible(true);
     }
    public void actionPerformed(ActionEvent e) {
    	if(e.getSource() == browse)	{
    		int result = jfc.showOpenDialog(null);
    		 	if(result==JFileChooser.APPROVE_OPTION)
    		 	{
    		 		label.setText("Selected file is : "+jfc.getSelectedFile().getName());
    		 		filename.setText(jfc.getSelectedFile().getPath());
    		 		file=jfc.getSelectedFile();
    		 		denc.setEnabled(true);
    		 		enc.setEnabled(true);
    		 	}
    		 	else
    		 	{
    		 		filename.setText("No file selected");
    		 		denc.setEnabled(false);
    		 		enc.setEnabled(false);
    		 	}
    	}
    	if(e.getSource()==enc)
    	{
    		try
    		{
    		key=enterKey();
    		if(key>=1)
    		{
    		JOptionPane.showMessageDialog(null,"Save the Encrypted file","ENCRYPTION COMPLETED",JOptionPane.INFORMATION_MESSAGE);
    	convert(-key);
    		}
    		else
	   			JOptionPane.showMessageDialog(null,"Please enter a nonzero key","WARNING",JOptionPane.WARNING_MESSAGE);
    		}catch(Exception ioee){
    		}
    	}
    	if(e.getSource()==denc)
    	{try
    	{
	   		key=enterKey();
	   		if(key>=1)
	   		{
	   		JOptionPane.showMessageDialog(null,"Save the Decrypted file","DECRYPTION COMPLETED",JOptionPane.INFORMATION_MESSAGE);
	   		convert(key);
	   		}
	   		else
	   			JOptionPane.showMessageDialog(null,"Please enter a nonzero key","WARNING",JOptionPane.WARNING_MESSAGE);
    	}catch(Exception ex){}
    	}
    if(e.getSource() == cancel)	{
    		System.exit(1);
    	}
    }
private long enterKey() throws IOException
{
	long k=0;
	String key=JOptionPane.showInputDialog(null,"Enter the Key","SECURE KEYS",JOptionPane.QUESTION_MESSAGE);
	long intKey=(long)Integer.parseInt(key);
	long temp=intKey;
	checking:
	{
	do
	{
	k=k+(intKey%10);
	intKey=intKey/10;
	}while(intKey>=10);
	k=k+intKey;
	if(k>32)
	{
		intKey=temp/10;
		break checking;
	}
	}
	return k;
}
private void convert(long secureKey)
{
	long Key=secureKey;
try
{
JFileChooser jFileChooser = new JFileChooser();
jFileChooser.addChoosableFileFilter(new SaveJavaFileFilter());
jFileChooser.addChoosableFileFilter(new SaveTextFileFilter());
jFileChooser.setSelectedFile(new File("fileToSave.txt"));
int responce = jFileChooser.showSaveDialog(null);
if(responce==JFileChooser.APPROVE_OPTION)
{
    String extension=jFileChooser.getFileFilter().getDescription();
    if(extension.equals("*.java"))
      {
          ext=".java";
      }
    if(extension.equals("*.txt"))
      {
          ext=".txt";
      }
}

fin=new FileInputStream(file);
fout=new FileOutputStream(jFileChooser.getSelectedFile()+ext);
fichan=fin.getChannel();
fochan=fout.getChannel();
fsize=fichan.size();
mbuf=ByteBuffer.allocate((int)fsize);
ombuf=ByteBuffer.allocate((int)fsize);
fichan.read(mbuf);
mbuf.rewind();
for(int i=0;i<fsize;i++)
{
long data=((long) mbuf.get());
ombuf.put((byte)(data+Key));
}
ombuf.rewind();
fochan.write(ombuf);
fichan.close();
fin.close();
fochan.close();
fout.close();
}
catch(IOException e)
{
System.out.println(e);
System.exit(1);
}
catch(BufferUnderflowException uf)
{
	System.out.println(uf);
}
 }
 public static void main(String args[]){
    	SwingUtilities.invokeLater(new Runnable()
		{
			public void run()
			{
				new Cryptography();
			}
		});
	}

}

