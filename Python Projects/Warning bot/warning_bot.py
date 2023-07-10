from twilio.rest import Client
import time

# Twilio API credentials
account_sid = 'YOUR_TWILIO_ACCOUNT_SID'
auth_token = 'YOUR_TWILIO_AUTH_TOKEN'
twilio_phone_number = 'YOUR_TWILIO_PHONE_NUMBER'
recipient_phone_number = 'RECIPIENT_PHONE_NUMBER'

def send_warning():
    client = Client(account_sid, auth_token)
    message = client.messages.create(
        body='Warning: Your condition has been met!',
        from_=twilio_phone_number,
        to=recipient_phone_number
    )
    print(f"Warning message sent to {recipient_phone_number}!")

def check_condition():
    # Replace this with the actual condition you want to check
    # For demonstration purposes, let's assume the condition is met when the current time is greater than 10 seconds
    current_time = time.time()
    return current_time > 10

def main():
    while True:
        if check_condition():
            send_warning()
            break
        time.sleep(1)  # Sleep for 1 second before checking the condition again

if __name__ == '__main__':
    main()
