#first import all important libraries
"""To Use Email Via Python 
1.Disable two factor Authentication
2.Turn On less secure apps"""

from email.message import EmailMessage #for draft or composing or writing the message
import smtplib #SIMPLE MAIL TRANSFER PROTOCOL IT IS A SENDING PROTOCOL AND IT IS USED FOR CONNECTING TO A SERVER

def credentials():
    id="" #Kepp your mail id
    pwd="" #Keep your mail id password
    
    return(id,pwd)

try:
    smtpObj=smtplib.SMTP('smtp.gmail.com',587) #setting up the connection with smtp server 
    smtpObj.ehlo() #it will give error if connection is not ok
    smtpObj.starttls() #tls stands for transport layer security sending an emali please make sure that the communication is secure or not

    #credentials is a function to return a id and password
    id=credentials()[0]
    pwd=credentials()[1]
    smtpObj.login(id,pwd)
    
    msg=EmailMessage() #Create mail message object
    msg['From']="" #user id or user name
    msg['TO']="" #receiver mail id
    msg['Subject']="Testing" #subject of the msg
    msg.set_content("Hi How are you?") #content
    smtpObj.send_message(msg)
    smtpObj.quit()

except Exception as err:
    print(err)

