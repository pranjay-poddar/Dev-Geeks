import os
from dotenv import load_dotenv

load_dotenv()

DISPLAY_NAME = os.getenv('display_name')
SENDER_EMAIL = os.getenv('sender_email')
PASSWORD = os.getenv('password')

try:
    assert DISPLAY_NAME
    assert SENDER_EMAIL
    assert PASSWORD
except AssertionError:
    print('Please set up credentials.Refer to README file')
else:
    print('Credentials loaded successfully')
