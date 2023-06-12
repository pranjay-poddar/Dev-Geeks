import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.*;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;


/*

public class Java{
	Session newsession = null;
	MimeMessage mimeMessage = null;
	public static void main(String[] args) throws AddressException, MessagingException {
		Java mail = new Java();
		mail.setUpServerProperties();
		mail.draftEmail();
		mail.sendEmail();
	}

	private MimeMessage draftEmail() throws AddressException, MessagingException {
		// TODO Auto-generated method stub
		String[] emailReceipients = {"vaishnavaakash35@gmail.com"};
		String emailSubject = "Hi";
		String emailBody = "Hoga kya";
		mimeMessage = new MimeMessage(newsession);
		for (int i=0;i<emailReceipients.length;i++)
		{
			mimeMessage.addRecipient(Message.RecipientType.TO,new InternetAddress(emailReceipients[i]));
		}
		mimeMessage.setSubject(emailSubject);
		MimeBodyPart bodypart = new MimeBodyPart();
		bodypart.setContent(emailBody,"text/html");
		MimeMultipart multipart = new MimeMultipart();
		multipart.addBodyPart(bodypart);
		mimeMessage.setContent(multipart);
		return mimeMessage;
		
	}

	private void sendEmail() throws MessagingException {
		// TODO Auto-generated method stub
		String fromUser = "vaishnavaakash35@gmail.com";
		String pa = "9673308462";
		String ehost = "smtp.gmail.com";
		Transport t = newsession.getTransport("smtp");
		t.connect(ehost,fromUser,pa);
		t.sendMessage(mimeMessage,mimeMessage.getAllRecipients());
		t.close();
		System.out.println("Email send");
	}

	private void setUpServerProperties() {
		// TODO Auto-generated method stub
		Properties properties =  System.getProperties();
		properties.put("mail.smtp.auth","true");
		properties.put("mail.smtp.starttls.enable","true");
	      
		properties.put("mail.smtp.port","587");
	    newsession = Session.getDefaultInstance(properties,null);
	}
}*/
