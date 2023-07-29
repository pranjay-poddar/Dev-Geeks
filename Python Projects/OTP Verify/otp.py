"""
    OTP verify is a cli tool to verify OTP using the Simple messaging transfer protocrol library smtplib

    Owner: Devgeeks
"""
from dotenv import load_dotenv, find_dotenv
from os import environ as env
import random
from re import fullmatch
import smtplib
load_dotenv(find_dotenv())


# Create a file named ".env" in the sample floder where this file is stored and save the keys as below
# EMAIL=your_email
# PASSWORD=email_password (app password)

SENDER_EMAIL = env.get('EMAIL')
SENDER_EMAIL_PASSWD = env.get('PASSWORD')
OTP_LENGTH = env.get("OTP_LENGTH")

# regular expression for validating an Email
regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'


if __name__ == "__main__":

    # Taking Input
    print("Please Enter your Email to receive OTP")
    receiver_email = input("Email: ")

    while fullmatch(regex, receiver_email) == None:
        print("Please enter a valid email address")
        receiver_email = input("Email: ")


    # Generating OTP
    digits = "0123456789"
    otp = random.sample(digits, OTP_LENGTH)
    OTP = "".join(otp)


    # Sending OTP
    msg = '\n\nThe One Time Password(OTP) is: ' + str(OTP)

    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login(SENDER_EMAIL, SENDER_EMAIL_PASSWD)
    s.sendmail(SENDER_EMAIL, receiver_email, msg)
    s.quit()


    print()
    print("OTP is sent to the given email address")
    print()
    print("Please enter the OTP to proceed")

    # Validating OTP
    otp = input("OTP: ")

    if otp.strip() == OTP:
        print("Given OTP was correct")
    else:
        print("Given OTP was incorrect")
