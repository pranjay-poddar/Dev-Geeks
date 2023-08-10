import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.table.DefaultTableModel;

public class Students {
	DefaultTableModel model = new DefaultTableModel();
	Connection con;
	int check;
	JButton edit;
	JButton delete;
	JButton add;
	
	public void studentView() throws SQLException {
		
		Font text = new Font("Times New Roman", Font.PLAIN, 18);
		Font btn = new Font("Times New Roman", Font.BOLD, 20);

		JFrame frame = new JFrame();
		
		//------------------------CLOSE---------------------------
		JLabel x = new JLabel("X");
		x.setForeground(Color.decode("#37474F"));
		x.setBounds(965, 10, 100, 20);
		x.setFont(new Font("Times New Roman", Font.BOLD, 20));
		frame.add(x);
		x.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				System.exit(0);
			}
		});
		//----------------------------------------------------------
		
		//-----------------------BACK---------------------------------
		JLabel back = new JLabel("< BACK");
		back.setForeground(Color.decode("#37474F"));
		back.setFont(new Font("Times New Roman", Font.BOLD, 17));
		back.setBounds(18, 10, 100, 20);
		frame.add(back);
		back.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				frame.dispose();
			}
		});
		//--------------------------------------------------------------
		
		//------------------Panel----------------------------------
		JPanel panel = new  JPanel();
		panel.setBounds(0, 0, 1000, 35);
		panel.setBackground(Color.decode("#DEE4E7"));
		frame.add(panel);
		//---------------------------------------------------------
		
		//----------------TABLE---------------------------------
		@SuppressWarnings("serial")
		JTable table=new JTable(){
			public boolean isCellEditable(int row,int column){
				return false;
			}
		};
		model = (DefaultTableModel)table.getModel();
		model.addColumn("ID");
		model.addColumn("USERNAME");
		model.addColumn("NAME");
		tblupdt();
		table.getColumnModel().getColumn(0).setPreferredWidth(50);
		table.getColumnModel().getColumn(1).setPreferredWidth(200);
		table.getColumnModel().getColumn(2).setPreferredWidth(200);
		JScrollPane scPane=new JScrollPane(table);
		scPane.setBounds(500, 50, 480, 525);
		frame.add(scPane);
		//------------------------------------------------------
		
		//--------------------ID-----------------------------------
		JLabel id = new JLabel("ID : ");
		id.setFont(text);
		id.setBounds(25, 60, 40, 20);
		id.setForeground(Color.decode("#DEE4E7"));
		frame.add(id);
		JTextField idbox= new JTextField();
		idbox.setBounds(60, 60, 50, 25);
		idbox.setBackground(Color.decode("#DEE4E7"));
		idbox.setFont(text);
		idbox.setForeground(Color.decode("#37474F"));
		idbox.setEditable(false);
		idbox.setText(String.valueOf(getid()));
		frame.add(idbox);
		//--------------------------------------------------------
		
		//--------------------CLASS---------------------------------
		JLabel classes = new JLabel("CLASS : ");
		classes.setFont(text);
		classes.setBounds(250, 60, 100, 20);
		classes.setForeground(Color.decode("#DEE4E7"));
		frame.add(classes);
		@SuppressWarnings("unchecked")
		JComboBox clss= new JComboBox(classEt());
		clss.setBounds(350, 60, 50, 25);
		clss.setEnabled(false);
		frame.add(clss);
		//------------------------------------------------------------
		
		//---------------------USERNAME-------------------------
		JLabel user = new JLabel("USERNAME : ");
		user.setFont(text);
		user.setBounds(25, 120, 150, 20);
		user.setForeground(Color.decode("#DEE4E7"));
		frame.add(user);
		JTextField username= new JTextField();
		username.setBounds(25, 160, 400, 35);
		username.setBackground(Color.decode("#DEE4E7"));
		username.setFont(text);
		username.setForeground(Color.decode("#37474F"));
		username.setEditable(false);
		frame.add(username);
		//------------------------------------------------------
		
		//-------------------NAME----------------------------------
		JLabel nm = new JLabel("NAME : ");
		nm.setFont(text);
		nm.setBounds(25, 240, 150, 20);
		nm.setForeground(Color.decode("#DEE4E7"));
		frame.add(nm);
		JTextField name= new JTextField();
		name.setBounds(25, 270, 400, 35);
		name.setBackground(Color.decode("#DEE4E7"));
		name.setFont(text);
		name.setForeground(Color.decode("#37474F"));
		name.setEditable(false);
		frame.add(name);
		//--------------------------------------------------------
		
		//---------------------PASS--------------------------------
		JLabel pass = new JLabel("PASSWORD : ");
		pass.setFont(text);
		pass.setBounds(25, 350, 150, 20);
		pass.setForeground(Color.decode("#DEE4E7"));
		frame.add(pass);
		JTextField password= new JTextField();
		password.setBounds(25, 380, 400, 35);
		password.setBackground(Color.decode("#DEE4E7"));
		password.setFont(text);
		password.setForeground(Color.decode("#37474F"));
		password.setEditable(false);
		frame.add(password);
		//-----------------------------------------------------------
		
		//--------------------SAVEBUTTON---------------------------
		JButton save = new JButton("SAVE");
		save.setBounds(25, 500, 125, 50);
		save.setFont(btn);
		save.setBackground(Color.decode("#DEE4E7"));
		save.setForeground(Color.decode("#37474F"));
		save.setEnabled(false);
		frame.add(save);
		save.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				if(check == 1) {
					try {
						adder(Integer.parseInt(idbox.getText()), username.getText(), name.getText(), password.getText(), String.valueOf(clss.getSelectedItem()));
					}
					catch (SQLException e1) {
						e1.printStackTrace();
					}
				}
				else if(check == 2) {
					save.setEnabled(false);
					try {
						if(password.getText().equals(""))
							editor(Integer.parseInt(idbox.getText()), username.getText(), name.getText(), String.valueOf(clss.getSelectedItem()));
						else
							editor(Integer.parseInt(idbox.getText()), username.getText(), name.getText(), password.getText(), String.valueOf(clss.getSelectedItem()));
					}
					catch (SQLException e1) {
						e1.printStackTrace();
					}
				}
				try {
					idbox.setText(String.valueOf(getid()));
					edit.setEnabled(false);
					delete.setEnabled(false);
					name.setText("");
					username.setText("");
					password.setText("");
					while(model.getRowCount() > 0)
						model.removeRow(0);
					tblupdt();
				} catch (SQLException e1) {
					e1.printStackTrace();
				}
			}
		});
		//-------------------------------------------------------
		
		//----------------------EDITBUTTON-----------------------
		edit = new JButton("EDIT");
		edit.setBounds(175, 500, 125, 50);
		edit.setFont(btn);
		edit.setEnabled(false);
		edit.setBackground(Color.decode("#DEE4E7"));
		edit.setForeground(Color.decode("#37474F"));
		frame.add(edit);
		edit.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				edit.setEnabled(false);
				save.setEnabled(true);
				check = 2;
				username.setEditable(true);
				name.setEditable(true);
				password.setEditable(true);
				clss.setEnabled(true);
			}
		});
		//-------------------------------------------------------
		
		//--------------------ADDBUTTON-------------------------
		add = new JButton("ADD");
		add.setBounds(325, 500, 125, 50);
		add.setFont(btn);
		add.setBackground(Color.decode("#DEE4E7"));
		add.setForeground(Color.decode("#37474F"));
		frame.add(add);
		add.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				add.setEnabled(false);
				save.setEnabled(true);
				delete.setEnabled(false);
				username.setEditable(true);
				name.setEditable(true);
				password.setEditable(true);
				clss.setEnabled(true);
				check = 1;
				try {
					idbox.setText(String.valueOf(getid()));
				} catch (SQLException e1) {
					e1.printStackTrace();
				}
			}
		});
		//------------------------------------------------------
		
		//------------------------DELETEBUTTON-----------------------
		delete = new JButton("DELETE");
		delete.setBounds(175, 432, 125, 50);
		delete.setFont(btn);
		delete.setBackground(Color.decode("#DEE4E7"));
		delete.setForeground(Color.decode("#37474F"));
		delete.setEnabled(false);
		frame.add(delete);
		delete.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				username.setEditable(false);
				name.setEditable(false);
				password.setEditable(false);
				clss.setEnabled(false);
				edit.setEnabled(false);
				add.setEnabled(true);
				try {
					deleter(Integer.parseInt(idbox.getText()));
					idbox.setText(String.valueOf(getid()));
					name.setText("");
					username.setText("");
					password.setText("");
					while(model.getRowCount() > 0)
						model.removeRow(0);
					tblupdt();
				} 
				catch (SQLException e1) {
					e1.printStackTrace();
				}
			}
		});
		//------------------------------------------------------------
		
		//-----------------TABLE ACTION----------------------------
		table.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				int row = table.getSelectedRow();
				password.setText("");
				idbox.setText(String.valueOf(table.getModel().getValueAt(row, 0)));
				username.setText(String.valueOf(table.getModel().getValueAt(row, 1)));
				name.setText(String.valueOf(table.getModel().getValueAt(row, 2)));
				edit.setEnabled(true);
				username.setEditable(false);
				password.setEditable(false);
				clss.setEnabled(false);
				name.setEditable(false);
				save.setEnabled(false);
				delete.setEnabled(true);
				add.setEnabled(true);
			}
		});
		//-------------------------------------------------------------
		
		//-------------------------------------------------------
		frame.setSize(1000,600);
		frame.setResizable(false);
		frame.setLayout(null);
		frame.setUndecorated(true);
		frame.setLocationRelativeTo(null);  
		frame.setVisible(true);
		frame.setFocusable(true);
		frame.getContentPane().setBackground(Color.decode("#37474F"));
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		//--------------------------------------------------------------
	}
	
	public void tblupdt() {
		try {
			ResultSet res = dbSearch();
			for(int i=0; res.next(); i++) {
				model.addRow(new Object[0]);
				model.setValueAt(res.getInt("id"), i, 0);
		        model.setValueAt(res.getString("username"), i, 1);
		        model.setValueAt(res.getString("name"), i, 2);
			}
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
	}
	
	public int getid() throws SQLException {
        Statement stm = con.createStatement();
        ResultSet rst = stm.executeQuery("SELECT MAX(id) from user");
        if(rst.next()) {
            return rst.getInt("MAX(id)")+1;
        }
        else {
            return 1;
        }
    }
	
	public ResultSet dbSearch() throws SQLException {
		//ENTER PORT, USER, PASSWORD.
		String str1 = "SELECT user.id, user.username, students.name FROM user, students where user.id = students.id";
		String url = "jdbc:mysql://localhost:3306/attendance";
		String user = "root";
		String pass = "password";
		con = DriverManager.getConnection(url, user, pass);
		Statement stm = con.createStatement();
		ResultSet rst = stm.executeQuery(str1);
		return rst;
	}
	
	public void adder(int id, String user, String name, String password, String classes) throws SQLException {
		String adding = "insert into user values ("+id+", '"+user+"', '"+name+"', '"+password+"', 3)";
		String adding2 = "insert into students values ("+id+", '"+name+"', '"+classes+"')";
        Statement stm = con.createStatement();
        stm.executeUpdate(adding);
        stm.executeUpdate(adding2);
	}
	
	public void deleter(int id) throws SQLException {
		String del = "DELETE FROM students WHERE id = "+id;
		String del2 = "DELETE FROM user WHERE id = "+id;
        Statement stm = con.createStatement();
        stm.executeUpdate(del);
        stm.executeUpdate(del2);
	}
	public void editor(int id, String username, String name, String password, String classes) throws SQLException {
		String update = "UPDATE user SET username = '"+username+"', name = '"+name+"', password = '"+password+"'WHERE id = "+id;
		String update2 = "UPDATE students SET name = '"+name+"', class = '"+classes+"' WHERE id = "+id;
        Statement stm = con.createStatement();
        stm.executeUpdate(update);
        stm.executeUpdate(update2);
	}
	public void editor(int id, String username, String name, String classes) throws SQLException {
		String update = "UPDATE user SET username = '"+username+"', name = '"+name+"' WHERE id = "+id;
		String update2 = "UPDATE students SET name = '"+name+"', class = '"+classes+"' WHERE id = "+id;
		Statement stm = con.createStatement();
        stm.executeUpdate(update);
        stm.executeUpdate(update2);
	}
	
	public String[] classEt() throws SQLException {
		String str1 = "SELECT name from class";
		Statement stm = con.createStatement();
		ResultSet rst = stm.executeQuery(str1);
		String[] rt = new String[25];
		int i=0;
		while(rst.next()) {
			rt[i] = rst.getString("name");
			i++;
		}
		return rt;
	}
}
