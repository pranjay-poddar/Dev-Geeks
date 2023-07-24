import pickle
import os
import pathlib

############################### Book a Ticket Class

class Ticket:
    name = ''
    email = ''
    bus = ''


    def bookTicket(self):
        self.name= input("Enter Customer Name: ")
        self.email = input("Enter Customer Email: ")


        a=self.email
        from email_validator import validate_email, EmailNotValidError
        email = a
        is_new_account = True
        try:
            validation = validate_email(email, check_deliverability=is_new_account)
            email = validation.email
            file = pathlib.Path("buses.data")
            if file.exists():
                infile = open('buses.data', 'rb')
                busdetails = pickle.load(infile)

            for bus in busdetails:
                print("Available Bus Code : " + bus.buscode + " Bus Name : " + bus.busname)
            infile.close()
            self.bus = input("Enter Bus Code: ")
            
        except EmailNotValidError as e:
            print(str(e),'\n''Please enter Valid email ID')
            exit()
        
    def check(self):
        file = pathlib.Path("tickets.data")
        if file.exists():
            infile = open('tickets.data', 'rb')
            ticketdetails = pickle.load(infile)
            for ticket in ticketdetails:
                if ticket.email == self.email and ticket.bus == self.bus:
                    return True
            infile.close()


    def gettotalticketcount(self):
        file = pathlib.Path("buses.data")
        if file.exists():
            infile = open('buses.data', 'rb')
            busdetails = pickle.load(infile)
            for bus in busdetails:
                if bus.buscode == self.bus:
                    return int(bus.busTotalAvaibleSeat)
            infile.close
        else:
            return 0

    def getBookedSeatCount(self):
        file = pathlib.Path("tickets.data")
        counter= 0
        if file.exists():
            infile = open('tickets.data', 'rb')
            ticketdetails = pickle.load(infile)
            for ticket in ticketdetails:
                if ticket.bus == self.bus:
                    counter = counter + 1
            return int(counter)
        return 0



############################ Create bus Class


class Bus:
    busname = ''
    buscode = ''
    busTotalAvaibleSeat = 10

    def createBus(self):
        self.busname= input("Enter Bus Route(Departure to Destination): ")
        self.buscode = input("Enter Bus Code: ")
        self.busTotalAvaibleSeat = input("Enter Bus Total Available Seats: ")
        print("\n\n ------> Bus Created!")



############################################## Main Program Modules

# Book Ticket and Check Condition


def bookBusTicket(infile=None):

    ticket = Ticket()
    ticket.bookTicket()
    if ticket.check():
        print("Warning : You Already Book A Seat")

    elif ticket.getBookedSeatCount() >= ticket.gettotalticketcount():
        print("Warning : All Ticket Sold Out")


    else:
        print("Sucess : Ticket Booked!")
        saveTicketDetiails(ticket)

# Save Ticket Detials to File

def saveTicketDetiails(ticket):
    file = pathlib.Path("tickets.data")
    if file.exists():
        infile = open('tickets.data', 'rb')
        oldlist = pickle.load(infile)
        oldlist.append(ticket)
        infile.close()
        os.remove('tickets.data')
    else:
        oldlist = [ticket]
    outfile = open('tempTicket.data', 'wb')
    pickle.dump(oldlist, outfile)
    outfile.close()
    os.rename('tempTicket.data', 'tickets.data')


# Display Saved Ticket Details

def getTicketDetails():
    file = pathlib.Path("tickets.data")
    if file.exists ():
        infile = open('tickets.data','rb')
        ticketdetails = pickle.load(infile)
        print("---------------TICKET DETAILS---------------------")
        print(" C-Name    C-Email    E-Code")
        for ticket in ticketdetails :
            print("\t",ticket.name,"\t", ticket.email, "\t",ticket.bus)
        infile.close()
        print("--------------------------------------------------")
        input('Press Enter To Main Menu')
    else :
        print("NO TICKET RECORDS FOUND")

# Create Bus Module

def createBus():
    bus = Bus()
    bus.createBus()
    saveBusDetails(bus)

# Save Bus Details to File

def saveBusDetails(bus):
    file = pathlib.Path("buses.data")
    if file.exists():
        infile = open('buses.data', 'rb')
        oldlist = pickle.load(infile)
        oldlist.append(bus)
        infile.close()
        os.remove('buses.data')
    else:
        oldlist = [bus]
    outfile = open('tempbuses.data', 'wb')
    pickle.dump(oldlist, outfile)
    outfile.close()
    os.rename('tempbuses.data', 'buses.data')

# Display All Bus Details

def getBusesDetails():
    file = pathlib.Path("buses.data")
    if file.exists ():
        infile = open('buses.data','rb')
        busdetails = pickle.load(infile)
        print("---------------BUS DETAILS---------------------")
        print("E-Name    E-Code    E-Total-Seats")
        for bus in busdetails :
            print(bus.busname,"\t", bus.buscode, "\t",bus.busTotalAvaibleSeat)
        infile.close()
        print("--------------------------------------------------")
        input('Press Enter To Main Menu')
    else :
        print("NO  RECORDS FOUND")

# Display Reports About Buses

def getBusesSummary():
    filetickets = pathlib.Path("tickets.data")
    if filetickets.exists():
        infiletickets = open('tickets.data', 'rb')
        ticketdetails = pickle.load(infiletickets)


    fileBuses = pathlib.Path("buses.data")
    if fileBuses.exists ():
        infileBuses = open('buses.data','rb')
        busdetails = pickle.load(infileBuses)


        print("---------------REPORTS---------------------")
        for bus in busdetails :
            print("\n\nBus Name : " + bus.busname + " | Total Seats : " + bus.busTotalAvaibleSeat + " \n")
            for ticket in ticketdetails:
                if bus.buscode == ticket.bus:
                    print("\t", ticket.name, "\t", ticket.email)

        infileBuses.close()
        infiletickets.close()

        print("--------------------------------------------------")
        input('Press Enter To Main Menu')
    else :
        print("NO BUSES RECORDS FOUND")


###################################################### Start Program
ch=''
num=0
while ch != 8:
    print("\t\t\t\t-----------------------")
    print("\t\t\t\tBUS MANAGEMENT SYSTEM")
    print("\t\t\t\t-----------------------")
    print("\tMAIN MENU")
    print("\t1. CREATE BUSES")
    print("\t2. BOOK TICKET")
    print("\t3. VIEW TICKET")
    print("\t4. VIEW BUSES")
    print("\t5. SHOW SUMMARY")
    print("\tSelect Your Option (1-5) ")
    ch = input()

    if ch == '1':
        createBus()
    elif ch == '2':
        bookBusTicket()
    elif ch == '3':
        getTicketDetails()
    elif ch == '4':
        getBusesDetails()
    elif ch == '5':
        getBusesSummary()
    else:
        print('Please select suitable option')