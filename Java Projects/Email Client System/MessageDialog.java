import java.awt.*;
import java.awt.event.*;
import javax.mail.*;
import javax.swing.*;
 
// This class displays the dialog used for creating messages.
public class MessageDialog extends JDialog {
     
  
    public static final int NEW = 0;
    public static final int REPLY = 1;
    public static final int FORWARD = 2;
     
    public static  java.io.File file;
    private JTextField fromTextField, toTextField;
    private JTextField subjectTextField;
     
  
    private JTextArea contentTextArea;
     
    
    private boolean cancelled;
     
    // Constructor for dialog.
    public MessageDialog(Frame parent, int type, Message message)
    throws Exception {
        
        super(parent, true);
         
    /* Set dialog title and get message's "to", "subject"
       and "content" values based on message type. */
        String to = "", subject = "", content = "";
        switch (type) {
            // Reply message.
            case REPLY:
                setTitle("Reply To Message");
                 
                // Get message "to" value
                Address[] senders = message.getFrom();
                if (senders != null || senders.length > 0) {
                    to = senders[0].toString();
                }
                to = message.getFrom()[0].toString();
                 
                // Get message subject.
                subject = message.getSubject();
                if (subject != null && subject.length() > 0) {
                    subject = "RE: " + subject;
                } else {
                    subject = "RE:";
                }
                 
                // Get message content and add "REPLIED TO" notation.
                content = "\n----------------- " +
                        "REPLIED TO MESSAGE" +
                        " -----------------\n" +
                        EmailClient.getMessageContent(message);
                
                break;
                 
                // Forward message.
            case FORWARD:
                setTitle("Forward Message");
                 
                // Get message subject.
                subject = message.getSubject();
                if (subject != null && subject.length() > 0) {
                    subject = "FWD: " + subject;
                } else {
                    subject = "FWD:";
                }
                 
                // Get message content and add "FORWARDED" notation.
                content = "\n----------------- " +
                        "FORWARDED MESSAGE" +
                        " -----------------\n" +
                        EmailClient.getMessageContent(message);
                break;
                 
                // New message.
            default:
                setTitle("New Message");
        }
         
        // Handle closing events.
        addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                actionCancel();
            }
        });
         
        // Setup fields panel.
        JPanel fieldsPanel = new JPanel();
        GridBagConstraints constraints;
        GridBagLayout layout = new GridBagLayout();
        fieldsPanel.setLayout(layout);
        JLabel fromLabel = new JLabel("From:");
        constraints = new GridBagConstraints();
        constraints.anchor = GridBagConstraints.EAST;
        constraints.insets = new Insets(5, 5, 0, 0);
        layout.setConstraints(fromLabel, constraints);
        fieldsPanel.add(fromLabel);
        fromTextField = new JTextField();
        constraints = new GridBagConstraints();
        constraints.fill = GridBagConstraints.HORIZONTAL;
        constraints.gridwidth = GridBagConstraints.REMAINDER;
        constraints.insets = new Insets(5, 5, 0, 0);
        layout.setConstraints(fromTextField, constraints);
        fieldsPanel.add(fromTextField);
        JLabel toLabel = new JLabel("To:");
        constraints = new GridBagConstraints();
        constraints.anchor = GridBagConstraints.EAST;
        constraints.insets = new Insets(5, 5, 0, 0);
        layout.setConstraints(toLabel, constraints);
        fieldsPanel.add(toLabel);
        toTextField = new JTextField(to);
        constraints = new GridBagConstraints();
        constraints.fill = GridBagConstraints.HORIZONTAL;
        constraints.gridwidth = GridBagConstraints.REMAINDER;
        constraints.insets = new Insets(5, 5, 0, 0);
        constraints.weightx = 1.0D;
        layout.setConstraints(toTextField, constraints);
        fieldsPanel.add(toTextField);
        JLabel subjectLabel = new JLabel("Subject:");
        constraints = new GridBagConstraints();
        constraints.insets = new Insets(5, 5, 5, 0);
        layout.setConstraints(subjectLabel, constraints);
        fieldsPanel.add(subjectLabel);
        subjectTextField = new JTextField(subject);
        constraints = new GridBagConstraints();
        constraints.fill = GridBagConstraints.HORIZONTAL;
        constraints.gridwidth = GridBagConstraints.REMAINDER;
        constraints.insets = new Insets(5, 5, 5, 0);
        layout.setConstraints(subjectTextField, constraints);
        fieldsPanel.add(subjectTextField);
         
        // Setup content panel.
        JScrollPane contentPanel = new JScrollPane();
        contentTextArea = new JTextArea(content, 10, 50);
        contentPanel.setViewportView(contentTextArea);
         
        // Setup buttons panel.
        final JPanel buttonsPanel = new JPanel();
        JButton sendButton = new JButton("Send");
        sendButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                actionSend();
            }
        });
        buttonsPanel.add(sendButton);
        JButton cancelButton = new JButton("Cancel");
        cancelButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                actionCancel();
            }
        });
        buttonsPanel.add(cancelButton);
        
        final JFileChooser  fileDialog = new JFileChooser();
      JButton showFileDialogButton = new JButton("Open File");
      showFileDialogButton.addActionListener(new ActionListener() {
         public void actionPerformed(ActionEvent e) {
            int returnVal = fileDialog.showOpenDialog( buttonsPanel);
            if (returnVal == JFileChooser.APPROVE_OPTION) {
               file = fileDialog.getSelectedFile();
              
            }
            else{
              // statusLabel.setText("Open command cancelled by user." );           
            }      
         }
      });
         
        // Add panels to display.
        getContentPane().setLayout(new BorderLayout());
        getContentPane().add(fieldsPanel, BorderLayout.NORTH);
        getContentPane().add(contentPanel, BorderLayout.CENTER);
        getContentPane().add(buttonsPanel, BorderLayout.SOUTH);
         
        // Size dialog to components.
        pack();
         
        // Center dialog over application.
        setLocationRelativeTo(parent);
    }

   /* MessageDialog(EmailClient aThis, int type, Message message) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }*/
     
    // Validate message fields and close dialog.
    private void actionSend() {
        if (fromTextField.getText().trim().length() < 1
                || toTextField.getText().trim().length() < 1
                || subjectTextField.getText().trim().length() < 1
                || contentTextArea.getText().trim().length() < 1) {
            JOptionPane.showMessageDialog(this,
                    "One or more fields is missing.",
                    "Missing Field(s)", JOptionPane.ERROR_MESSAGE);
            return;
        }
         
        // Close dialog.
        dispose();
    }
     
    // Cancel creating this message and close dialog.
    private void actionCancel() {
        cancelled = true;
         
        // Close dialog.
        dispose();
    }
     
    // Show dialog.
    public boolean display() {
        show();
         
        // Return whether or not display was successful.
        return !cancelled;
    }
     
    // Get message's "From" field value.
    public String getFrom() {
        return fromTextField.getText();
    }
     
    // Get message's "To" field value.
    public String getTo() {
        return toTextField.getText();
    }
     
    // Get message's "Subject" field value.
    public String getSubject() {
        return subjectTextField.getText();
    }
     
    // Get message's "content" field value.
    public String getContent() {
        return contentTextArea.getText();
    }
}
 