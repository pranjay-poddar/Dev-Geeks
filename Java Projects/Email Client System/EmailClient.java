
import com.sun.syndication.io.FeedException;
import java.awt.*;
import java.awt.event.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.mail.*;
import javax.mail.internet.*;
import javax.swing.*;
import javax.swing.event.*;
import javax.swing.table.TableModel;
import com.sun.mail.pop3.POP3Store;
// The E-mail Client.
 class EmailClient extends JFrame {
     
    // Message table's data model.
    private MessagesTableModel tableModel;
     
    // Table listing messages.
    private JTable table;
     
    // This the text area for displaying messages.
    private JTextArea messageTextArea,textArea;
     
  /* This is the split panel that holds the messages
     table and the message view panel. */
    private JSplitPane splitPane;
     
    // These are the buttons for managing the selected message.
    private JButton replyButton, forwardButton, deleteButton,readRss;
     
    // Currently selected message in table.
    private Message selectedMessage;
     
    // Flag for whether or not a message is being deleted.
    private boolean deleting;
     
    // This is the JavaMail session.
    private Session session;
    String host  ,storeType, user , password,host1 ; 
    // Constructor for E-mail Client.
    public EmailClient() {
        // Set application title.
        setTitle("E-mail Client");
         
        // Set window size.
        setSize(640, 480);
         
        // Handle window closing events.
        addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                actionExit();
            }
        });
         
        // Setup file menu.
        JMenuBar menuBar = new JMenuBar();
        JMenu fileMenu = new JMenu("File");
        fileMenu.setMnemonic(KeyEvent.VK_F);
        JMenuItem fileExitMenuItem = new JMenuItem("Exit",
                KeyEvent.VK_X);
        fileExitMenuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                actionExit();
            }
        });
        fileMenu.add(fileExitMenuItem);
        menuBar.add(fileMenu);
        setJMenuBar(menuBar);
         
        // Setup buttons panel.
        JPanel buttonPanel = new JPanel();
        JButton newButton = new JButton("Compose Mail");
        newButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                try {
                    actionNew();
                } catch (MessagingException ex) {
                    Logger.getLogger(EmailClient.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        });
        buttonPanel.add(newButton);
         
        // Setup messages table.
        tableModel = new MessagesTableModel();
        table = new JTable((TableModel) tableModel);
        table.getSelectionModel().addListSelectionListener(new
                ListSelectionListener() {
            public void valueChanged(ListSelectionEvent e) {
                tableSelectionChanged();
            }
        });
        // Allow only one row at a time to be selected.
        table.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
         
        // Setup E-mails panel.
        JPanel emailsPanel = new JPanel();
        emailsPanel.setBorder(
                BorderFactory.createTitledBorder("E-mails"));
        messageTextArea = new JTextArea();
        messageTextArea.setEditable(false);
        splitPane = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                new JScrollPane(table), new JScrollPane(messageTextArea));
        emailsPanel.setLayout(new BorderLayout());
        emailsPanel.add(splitPane, BorderLayout.CENTER);
         
        // Setup buttons panel 2.
        JPanel buttonPanel2 = new JPanel();
        replyButton = new JButton("Reply");
        replyButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                try {
                    actionReply();
                } catch (MessagingException ex) {
                    Logger.getLogger(EmailClient.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        });
        replyButton.setEnabled(false);
        buttonPanel2.add(replyButton);
        forwardButton = new JButton("Forward");
        forwardButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                try {
                    actionForward();
                } catch (MessagingException ex) {
                    Logger.getLogger(EmailClient.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        });
        forwardButton.setEnabled(false);
        buttonPanel2.add(forwardButton);
        deleteButton = new JButton("Delete");
        deleteButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                actionDelete();
            }
        });
        deleteButton.setEnabled(false);
        buttonPanel2.add(deleteButton);
        readRss = new JButton("Latest News");
        readRss.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                actionNew1();
                
            }
        });
        readRss.setEnabled(true);
        buttonPanel2.add(readRss);
         
        // Add panels to display.
        getContentPane().setLayout(new BorderLayout());
        getContentPane().add(buttonPanel, BorderLayout.NORTH);
        getContentPane().add(emailsPanel, BorderLayout.CENTER);
        getContentPane().add(buttonPanel2, BorderLayout.SOUTH);
    }
     
    // Exit this program.
    private void actionExit() {
        System.exit(0);
    }
     
    // Create a new message.
    private void actionNew() throws MessagingException {
        sendMessage(MessageDialog.NEW, null);
    }
    
    private void actionNew1() {
        String readRss1[]={""};
        try {
            new RSSFrame().main(readRss1);
        } catch (IllegalArgumentException ex) {
            Logger.getLogger(EmailClient.class.getName()).log(Level.SEVERE, null, ex);
        } catch (FeedException ex) {
            Logger.getLogger(EmailClient.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(EmailClient.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
     // table row selection changes.
    private void tableSelectionChanged() {
    /* If not in the middle of deleting a message, set
       the selected message and display it. */
        if (!deleting) {
            selectedMessage =
                    tableModel.getMessage(table.getSelectedRow());
            showSelectedMessage();
            updateButtons();
        }
    }
     
    // Reply to a message.
    private void actionReply() throws MessagingException {
        sendMessage(MessageDialog.REPLY, selectedMessage);
    }
     
    // Forward a message.
    private void actionForward() throws MessagingException {
        sendMessage(MessageDialog.FORWARD, selectedMessage);
    }
     
    // Delete the selected message.
    private void actionDelete() {
        deleting = true;
         
        try {
            // Delete message from server.
            selectedMessage.setFlag(Flags.Flag.DELETED, true);
            Folder folder = selectedMessage.getFolder();
            folder.close(true);
            folder.open(Folder.READ_WRITE);
        } catch (Exception e) {
            showError("Unable to delete message.", false);
        }
         
        // Delete message from table.
        tableModel.deleteMessage(table.getSelectedRow());
         
        // Update GUI.
        messageTextArea.setText("");
        deleting = false;
        selectedMessage = null;
        updateButtons();
    }
     
    // Send the specified message.
    private void sendMessage(int type, Message message) throws MessagingException {
        // Display message dialog to get message values.
        MessageDialog dialog;
        try {
            dialog = new MessageDialog(this, type, message);
            if (!dialog.display()) {
                // Return if dialog was cancelled.
                return;
            }
        } catch (Exception e) {
            e.printStackTrace();
            showError("Unable to send message.", false);
            return;
        }
        
            Properties properties = System.getProperties();
   // Setup mail server
   properties.put("mail.smtp.starttls.enable", "true");
   properties.put("mail.smtp.host", host);
   properties.put("mail.smtp.user", user);
   properties.put("mail.smtp.password", password);
   properties.put("mail.smtp.port", "587");
   properties.put("mail.smtp.auth", "true");

   // Get the default Session object.
   Session session = Session.getInstance(properties,
      new javax.mail.Authenticator() {
         protected PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(user, password);
         }
      });

   try{
      // Create a default MimeMessage object.
      MimeMessage newMessage = new MimeMessage(session);
            newMessage.setFrom(new InternetAddress(dialog.getFrom()));
            newMessage.setRecipient(Message.RecipientType.TO,
                    new InternetAddress(dialog.getTo()));
            newMessage.setSubject(dialog.getSubject());
            newMessage.setSentDate(new Date());
            newMessage.setText(dialog.getContent());
            
      // Send message
      
      Transport transport = session.getTransport("smtp");
      transport.connect(host, user, password);
      transport.send(newMessage);
      transport.close();
      System.out.println("Sent message successfully....");
      showError1("Message Sent Successfully......", false);
    }catch (MessagingException mex) {
      mex.printStackTrace();
      showError("Unable to send message.", false);
   }
    }  
    // Show the selected message in the content panel.
    private void showSelectedMessage() {
        // Show hour glass cursor while message is loaded.
        setCursor(Cursor.getPredefinedCursor(Cursor.WAIT_CURSOR));
        try {
            messageTextArea.setText(
                    getMessageContent(selectedMessage));
            messageTextArea.setCaretPosition(0);
        } catch (Exception e) {
            showError("Unabled to load message.", false);
        } finally {
            // Return to default cursor.
            setCursor(Cursor.getDefaultCursor());
        }
    }
     
  /* Update each button's state based off of whether or not
     there is a message currently selected in the table. */
    private void updateButtons() {
        if (selectedMessage != null) {
            replyButton.setEnabled(true);
            forwardButton.setEnabled(true);
            deleteButton.setEnabled(true);
        } else {
            replyButton.setEnabled(false);
            forwardButton.setEnabled(false);
            deleteButton.setEnabled(false);
        }
    }
     
    // Show the application window on the screen.
    public void show() {
        super.show();
         
        // Update the split panel to be divided 50/50.
        splitPane.setDividerLocation(.5);
    }
     
    // Connect to e-mail server.
    public void connect() {
        // Display connect dialog.
        ConnectDialog dialog = new ConnectDialog(this);
        dialog.show();
       
         host =dialog.getSmtpServer() ;
         System.out.println(host);
         storeType = dialog.getType1();
         user = dialog.getUsername();
         password = dialog.getPassword();
         
         if(host.equals("smtp.gmail.com")){host1 = host;}
         if(host.equals("smtp.mail.yahoo.com")){host1 = "pop.mail.yahoo.com";}
         
    /* Display dialog stating that messages are
       currently being downloaded from server. */
        final DownloadingDialog downloadingDialog =
                new DownloadingDialog(this);
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                downloadingDialog.show();
            }
        });
         
        // Establish JavaMail session and connect to server.
        Store store = null;
        try {
            // Initialize JavaMail session with SMTP server.
            Properties properties = new Properties();

      properties.put("mail.pop3.host", host1);
      properties.put("mail.pop3.port", "995");
      properties.put("mail.pop3.starttls.enable", "true");
      //properties.put("mail.pop3.startssl.enable", "true");
      Session emailSession = Session.getDefaultInstance(properties);
  
      //create the POP3 store object and connect with the pop server
      
           store = emailSession.getStore("pop3s");
         
      store.connect(host1, user, password);
             
            // Connect to e-mail server.
           /* URLName urln = new URLName(connectionUrl.toString());*/
            /*store = session.getStore(urln);
            store.connect();*/
            
        } catch (Exception e) {
            // Close the downloading dialog.
            e.printStackTrace();
            downloadingDialog.dispose();
            // Show error dialog.
            showError("Unable to connect.", true);
        }
         
        // Download message headers from server.
        try {
            // Open main "INBOX" folder.
            Folder folder = store.getFolder("INBOX");
            folder.open(Folder.READ_WRITE);
             
            // Get folder's list of messages.
            Message[] messages = folder.getMessages();
             
            // Retrieve message headers for each message in folder.
            FetchProfile profile = new FetchProfile();
 
            profile.add(FetchProfile.Item.ENVELOPE);
            folder.fetch(messages, profile);
             
            // Put messages in table.
            tableModel.setMessages(messages);
        } catch (Exception e) {
            // Close the downloading dialog.
            downloadingDialog.dispose();
             
            // Show error dialog.
            showError("Unable to download messages.", true);
        }
         
        // Close the downloading dialog.
        downloadingDialog.dispose();
    }
     
    // Show error dialog and exit afterwards if necessary.
    private void showError(String message, boolean exit) {
        JOptionPane.showMessageDialog(this, message, "Error",
                JOptionPane.ERROR_MESSAGE);
        if (exit)
            System.exit(0);
    }
    private void showError1(String message, boolean exit) {
        JOptionPane.showMessageDialog(this, message,"Success",2);
        if (exit)
            System.exit(0);
    }
     
    // Get a message's content.
    public static String getMessageContent(Message message)
    throws Exception {
        Object content = message.getContent();
        if (content instanceof Multipart) {
            StringBuffer messageContent = new StringBuffer();
            Multipart multipart = (Multipart) content;
            for (int i = 0; i < multipart.getCount(); i++) {
                Part part = (Part) multipart.getBodyPart(i);
                if (part.isMimeType("text/plain")) {
                    messageContent.append(part.getContent().toString());
                }
            }
            return messageContent.toString();
        } else {
            return content.toString();
        }
    }
     
    // Run the E-mail Client.
    public static void main(String[] args) {
       try {
            // select Look and Feel
            UIManager.setLookAndFeel("com.jtattoo.plaf.mcwin.McWinLookAndFeel");
            // start application
           
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        EmailClient client = new EmailClient();
        client.show();
         
        // Display connect dialog.
        client.connect();
    }
}