# import libraries
import smtplib
from email.message import EmailMessage

my_email = "sender mail address"
password = "16 digit password"
receiver = "receiver mail address"

subject = "Demo mail"
msg = """
        hello world.
      """
mail = EmailMessage()
mail['From'] = my_email
mail['To'] = receiver
mail['Subject'] = subject
mail.set_content(msg)

conn = smtplib.SMTP("smtp.gmail.com", 587)
conn.starttls()     # for secure connection
conn.login(user=my_email, password=password)
conn.sendmail(my_email, receiver, mail.as_string())

conn.close()
