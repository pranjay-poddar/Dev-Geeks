from forex_python.converter import CurrencyCodes, CurrencyRates


cn = CurrencyCodes()

print('Enter the currency code of first currency :')
k1 = input()
k1.capitalize()

curs = cn.get_symbol(k1)
curn = cn.get_currency_name(k1)


print('Host currency and it\'s symbol are as follows : ')
print(curn, curs)

print('\nEnter the amount of first currency to be converted : ')
t = float(input())

print('\nEnter the currency code of second currency : ')
k2 = input()
k2.capitalize()

cursf = cn.get_symbol(k2)
curnf = cn.get_currency_name(k2)

print('Final currency and it\'s symbol are as follows : ')
print(curnf, cursf)

print('Converted amount in second currency :\n ')

cr = CurrencyRates()
rate = cr.get_rate(k1,k2)
cval = cr.convert(k1,k2,t)

print('---------------------------------------')  

print('Converted amount : ', cval)

