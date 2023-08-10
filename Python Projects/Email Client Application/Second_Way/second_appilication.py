# first import all important libraries
from email.message import EmailMessage  # for draft or composing or writing the message
import smtplib  # SIMPLE MAIL TRANSFER PROTOCOL IT IS A SENDING PROTOCOL AND IT IS USED FOR CONNECTING TO A SERVER
import csv
def credentials():
    id="" #Kepp your mail id
    pwd="" #Keep your mail id password
    
    return(id,pwd)
  
try:
    smtpObj = smtplib.SMTP('smtp.gmail.com', 587)  # setting up the connection with smtp server
    smtpObj.ehlo()  # is this connection is ok.will give error if connection is not ok
    smtpObj.starttls()  # tls stands for transport layer security sendin an emali please make sure that the communication is secure or not

    # credentials is a function to return a id and password
    id=credentials()[0]
    pwd=credentials()[1]
    smtpObj.login(id,pwd)
    #reading from a csv file
    with open('mails.csv','r') as email_file:
        csv_reader=csv.DictReader(email_file) #allowing to convert each row in file into a dictionary

        for row in csv_reader:
            msg=EmailMessage() #creating a email object
            msg['To']=row['To']
            msg['From']=row['From']
            msg['Subject']=row['Subject']
            msg.set_content(row['Content'])

            smtpObj.send_message(msg)
    smtpObj.quit()



except Exception as err:
    print(err)

