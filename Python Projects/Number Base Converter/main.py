def convert_number(number, input_base, output_base):
    '''
    Converts a number from one base to another.

    Args: 
        number (str): The number to convert.(in digit and/or alphabetic)
        input_base (int): Base of input number.(should be between 2-36)
        output_base (int): Base of output number.(should be between 2-36)

    Returns:
        str: The converted  number.
    '''

    # convert input number to base 10
    def convert_to_base10(number, input_base):
        base_10 = 0
        power = 0
        for digit in number[::-1]:
            if digit.isdigit() and int(digit) < input_base:
                base_10 += int(digit) * (input_base ** power)
            elif digit.isalpha() and (ord(digit.upper()) - ord('A') + 10) < input_base:
                base_10 += (ord(digit.upper()) - ord('A') + 10) * (input_base ** power)
            else:
                raise ValueError("Provide the number in the correct format for the given base")
            power += 1
        return base_10

    # covert base 10 number to output base
    def convert_from_base10(base_10, output_base):
        if base_10 == 0:
            return "0"

        converted_number = ""
        base_10 = int(base_10)
        while base_10 > 0:
            remainder = base_10 % output_base
            if remainder < 10:
                converted_number = str(remainder) + converted_number
            else:
                converted_number = chr(remainder - 10 + ord('A')) + converted_number
            base_10 = base_10 // output_base

        return converted_number
    
    try:
        base_10 = convert_to_base10(number, input_base)
        converted_number = convert_from_base10(base_10, output_base)
        return converted_number
    except ValueError as e:
        print("Error", str(e))
        return None

number = input("Enter the number to convert in digits and/or alphabets: ")
input_base = int(input("Enter the base of input number(2-36): "))
output_base = int(input("Enter the base of output number(2-36): "))

converted_number = convert_number(number, input_base, output_base)

if converted_number is not None:
    print("Converted number: ", converted_number)
