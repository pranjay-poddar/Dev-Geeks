import errno
import os
import random
import re
import socket
import sys
from datetime import datetime
from pathlib import Path
import bleach

HEADER_LENGTH = 64
ADDR_LIST = socket.gethostbyname_ex(socket.gethostname())[2]
HOST = ADDR_LIST[-1]
PORT = 5051
ADDR = (HOST,PORT)
FORMAT = 'utf-8'
DISCONNECT_MESSAGE = "!DISCONNECT"
PATH = '\\AppData\\Local\\Temp'
UID = ''


def validate_user(user_input):
	
	len_test = lambda x: 5 <= x <= 30
	str_regex = re.compile('^([0-9a-z]|-)+$', re.I)
	str_match = str_regex.match(str(user_input))
	
	if len_test(len(user_input)) and bool(str_match):
		return True
	else:
		return False


def check_user_file():
	global UID
	try:
		usr_file_path = Path(str(Path.home()) + PATH + '\\python_chatroom.txt')
		if os.path.exists(usr_file_path):
			
			usr_file = open(usr_file_path, "r")
			lines = usr_file.readlines()
			usr_file.close()

			UID = lines[0].strip('\n')
			previous_username = lines[1]
			aux = ' '.join(lines[2].split()[2:])
			fetched_dt = datetime.strptime(aux, '%Y-%m-%d %H:%M:%S')
			dt_today = datetime.now()

		
			last_login = str((dt_today - fetched_dt).days) + " days(s) ago."
			
			print('Welcome back!\nYour previous username: ', previous_username)
			print("Your last login was: {}\n\n".format(last_login))
		else:
			#user does not exist, create file with user info
			usr_file = open(usr_file_path, "w")
			UID = str(random.randint(1000000,9999999))
			usr_file.write(f'{UID}\n{my_username}\nCreation date: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}')
			usr_file.close()
			return 0

	except FileExistsError as e:
			print(e)
	except OSError as e:
		print(e)
	except Exception as e:
		print(e)


def handle_session():
	while True:
		message = bleach.clean(input(f'{my_username} > '))

		if message:
			message = message.encode(FORMAT)
			message_header = f'{len(message):<{HEADER_LENGTH}}'.encode(FORMAT)
			client_socket.send(message_header + message)

		try:
			while True:
				msg_header = client_socket.recv(HEADER_LENGTH)

				if  len(msg_header) == 0:
					print("Connection closed by the server.")
					sys.exit()

				
				username_length = int(msg_header.decode(FORMAT).strip())
				username = client_socket.recv(username_length).decode(FORMAT)
				aux = username.split(" ")
				username = ' '.join(aux[:len(aux)-1])
				
				
				message_header = client_socket.recv(HEADER_LENGTH)
				message_length = int(message_header.decode(FORMAT).strip())
				message = client_socket.recv(message_length).decode(FORMAT)

				print(f'{username} > {message}')

		except IOError as e:
			
			if e.errno != errno.EAGAIN and e.errno != errno.EWOULDBLOCK:
				print('Error: {}'.format(str(e)))
				sys.exit()
			continue
		except KeyboardInterrupt:
			print("Connection closed by Keyboard.")
		except Exception as e:
			print('General error: {}'.format(str(e)))
			sys.exit()


if __name__ == "__main__":
	my_username = input("Please insert a username: ")

	while not validate_user(my_username):
		print('\nYour username can only contain alphanumerics and dashes.')
		my_username = input('Try again. Username: ')

	check_user_file()

	client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	client_socket.connect(ADDR)
	client_socket.setblocking(False) #set recv method to not block

	client_id = f'{my_username} {UID}'
	initial_data = client_id.encode(FORMAT)
	username_header = f'{len(initial_data):<{HEADER_LENGTH}}'.encode(FORMAT)
	client_socket.send(username_header + initial_data)

	
	handle_session()
