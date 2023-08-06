from phonenumbers import timezone, geocoder, carrier, is_valid_number, parse

countryCode = input("Enter your country code: ")
nationalNumber = input("Enter your phone number: ")

number = f"+{countryCode}{nationalNumber}"
phone = parse(number)

valid = is_valid_number(phone)
if phone:
    print("Number is valid")
else:
    print("Number is not valid")

time = timezone.time_zones_for_number(phone)
print("Timezone:", time)

car = carrier.name_for_number(phone, "en")
print("SIM:", car)

reg = geocoder.description_for_number(phone, "en")
print("Country:", reg)
