import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Iterator;
import java.util.List;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.*;

import com.sun.syndication.feed.synd.SyndEntry;
import com.sun.syndication.feed.synd.SyndFeed;
import com.sun.syndication.io.FeedException;
import com.sun.syndication.io.SyndFeedInput;
import com.sun.syndication.io.XmlReader;
import java.io.IOException;
import java.net.MalformedURLException;


public class RssReader extends JFrame {
    
        RssReader()throws MalformedURLException, IllegalArgumentException, FeedException, IOException{
        URL url = new URL("http://feeds.bbci.co.uk/news/video_and_audio/world/rss.xml?edition=uk");
		HttpURLConnection httpcon = (HttpURLConnection)url.openConnection();
		// Reading the feed
		SyndFeedInput input = new SyndFeedInput();
		SyndFeed feed = input.build(new XmlReader(httpcon));
		List<SyndEntry> entries = feed.getEntries();
		Iterator<SyndEntry> itEntries = entries.iterator();
                String sc="";
		while (itEntries.hasNext()) {
			SyndEntry entry = itEntries.next();
                        try{
                            sc += "Title: "+ entry.getTitle()+"\nLink: " + entry.getLink()+"\nDescription: " + entry.getDescription().getValue()+"\n\n";
                        }catch(Exception e){sc += "Title: "+ entry.getTitle()+"\nLink: " + entry.getLink()+"\n\n" ;}
			System.out.println("Title: " + entry.getTitle());
			System.out.println("Link: " + entry.getLink());
			//System.out.println("Author: " + entry.getAuthor());
			//System.out.println("Publish Date: " + entry.getPublishedDate());
                        try{
			System.out.println("Description: " + entry.getDescription().getValue());
                        }catch(Exception e){System.out.print("");}
			System.out.println();
		}
                 JFrame f=new JFrame();  
            
            JTextArea textArea = new JTextArea(2000,1500);  
    textArea.setBounds(10,30,1800,1400);  
      
    textArea.setBackground(Color.white);  
    textArea.setForeground(Color.black); 
    textArea.setText(sc);
    JPanel jp = new JPanel();

    jp.add(textArea);
    jp.setSize(1850,1350);
    JScrollPane myJScrollPane = new JScrollPane(jp,
         JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED,
         JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
    f.add(textArea); 
    

// Then, add the jScrollPane to your frame

f.add(jp);
f.getContentPane().add(myJScrollPane);

   // Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();

    
   f.setSize(1900,1500);  
    f.setResizable(true);
     f.pack();
    f.setLayout(null);  
    f.setVisible(true);     
        }
	public static void main(String[] args) throws MalformedURLException, IllegalArgumentException, FeedException, IOException {			
	}
}
