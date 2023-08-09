from datetime import datetime


def day_of_week(date_str):
    # Convert the input date string to a datetime object using the specified format
    date_obj = datetime.strptime(date_str, '%d %m %Y')

    # Extract day, month, and year from the datetime object
    day = date_obj.day
    month = date_obj.month
    year = date_obj.year

    # If the month is January or February, convert it to a month number of the previous year
    if month < 3:
        month += 12
        year -= 1

    # Calculate the day of the week using Zeller's Congruence algorithm
    # Formula: h = (q + 13(m+1)/5 + K + K/4 + J/4 - 2J) % 7
    # where h is the day of the week (0=Saturday, 1=Sunday, ..., 6=Friday)
    q = day              # Day of the month
    # Month (converted to March=3, April=4, ..., February=14)
    m = month
    K = year % 100       # Year of the century (last two digits of the year)
    J = year // 100      # Zero-based century (first two digits of the year)

    # Calculate the day of the week index (0-6)
    day_num = (q + (13 * (m + 1)) // 5 + K + K // 4 + J // 4 - 2 * J) % 7 - 1

    # Define a list of day names to map the day of the week index to the corresponding name
    day_names = ['Sunday', 'Monday', 'Tuesday',
                 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    # Return the day of the week name based on the calculated index
    return day_names[day_num]


print("Enter the following")
dt = input("DD: ")
mn = input("MM: ")
yr = input("YYYY: ")

date = dt + " " + mn + " " + yr

print(f"\nDate {date} is {day_of_week(date)}\n")
