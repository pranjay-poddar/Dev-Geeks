import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.net.MalformedURLException;
import java.net.URL;
import javax.swing.JEditorPane;
import javax.swing.JFrame;
import javax.swing.JTextField;
import javax.swing.event.HyperlinkEvent;
import javax.swing.event.HyperlinkListener;

 class MainClass extends JFrame implements ActionListener, HyperlinkListener {
  JEditorPane view;

  JTextField commandLine;

  MainClass(String title) {
    super(title);

    setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

    commandLine = new JTextField();
    commandLine.addActionListener(this);
    getContentPane().add(commandLine, BorderLayout.NORTH);

    view = new JEditorPane();
    view.setEditable(false);
    view.setPreferredSize(new Dimension(400, 400));
    view.addHyperlinkListener(this);

    getContentPane().add(view, BorderLayout.CENTER);

    pack();
    setVisible(true);
  }

  public void actionPerformed(ActionEvent e) {
    try {
      URL url = new URL(e.getActionCommand());
      view.setPage(url);
      commandLine.setText(url.toExternalForm());
    } catch (MalformedURLException e2) {
      System.out.println("Bad URL: " + e.getActionCommand());
    } catch (java.io.IOException e2) {
    }
  }

  public void hyperlinkUpdate(HyperlinkEvent e) {
    try {
      view.setPage(e.getURL());
      commandLine.setText(e.getURL().toExternalForm());
    } catch (java.io.IOException e2) {
    }
  }

  public static void main(String[] args) {
    new MainClass("Editor Demo");
  }
}
