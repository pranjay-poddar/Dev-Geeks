from tkinter import*
from tkinter import ttk


import json
conv=Tk()
conv.geometry("800x400")

conv.title("Currency Converter")
conv.wm_iconbitmap("math.ico")
OPTIONS= {
        "AED": 4.31089,
        "AFN": 101.526592,
        "ALL": 121.106967,
        "AMD": 570.255719,
        "ANG": 2.106547,
        "AOA": 722.488052,
        "ARS": 115.471648,
        "AUD": 1.618967,
        "AWG": 2.113077,
        "AZN": 2.003864,
        "BAM": 1.955781,
        "BBD": 2.369541,
        "BDT": 100.163577,
        "BGN": 1.953415,
        "BHD": 0.442308,
        "BIF": 2331.301618,
        "BMD": 1.173606,
        "BND": 1.585405,
        "BOB": 8.091597,
        "BRL": 6.235955,
        "BSD": 1.173571,
        "BTC": 2.7097287e-5,
        "BTN": 86.386872,
        "BWP": 13.126871,
        "BYN": 2.937326,
        "BYR": 23002.669953,
        "BZD": 2.365541,
        "CAD": 1.498372,
        "CDF": 2341.343652,
        "CHF": 1.084132,
        "CLF": 0.033363,
        "CLP": 920.540995,
        "CNY": 7.590174,
        "COP": 4510.166359,
        "CRC": 732.671652,
        "CUC": 1.173606,
        "CUP": 31.100549,
        "CVE": 110.262239,
        "CZK": 25.399148,
        "DJF": 208.914768,
        "DKK": 7.436079,
        "DOP": 66.410337,
        "DZD": 160.549419,
        "EGP": 18.437108,
        "ERN": 17.609898,
        "ETB": 54.29214,
        "EUR": 1,
        "FJD": 2.459405,
        "FKP": 0.847907,
        "GBP": 0.858698,
        "GEL": 3.644036,
        "GGP": 0.847907,
        "GHS": 7.080823,
        "GIP": 0.847907,
        "GMD": 60.499068,
        "GNF": 11469.012786,
        "GTQ": 9.077373,
        "GYD": 245.103862,
        "HKD": 9.139178,
        "HNL": 28.289292,
        "HRK": 7.499577,
        "HTG": 115.594105,
        "HUF": 354.975765,
        "IDR": 16727.752839,
        "ILS": 3.763296,
        "IMP": 0.847907,
        "INR": 86.47801,
        "IQD": 1713.367093,
        "IRR": 49514.42077,
        "ISK": 151.759112,
        "JEP": 0.847906,
        "JMD": 173.883607,
        "JOD": 0.832121,
        "JPY": 128.280373,
        "KES": 129.44693,
        "KGS": 99.518421,
        "KHR": 4786.411122,
        "KMF": 492.767658,
        "KPW": 1056.245066,
        "KRW": 1390.217841,
        "KWD": 0.353235,
        "KYD": 0.97788,
        "KZT": 500.33747,
        "LAK": 11546.479422,
        "LBP": 1774.355565,
        "LKR": 234.685126,
        "LRD": 201.035973,
        "LSL": 17.380959,
        "LTL": 3.465352,
        "LVL": 0.709902,
        "LYD": 5.318167,
        "MAD": 10.545536,
        "MDL": 20.74818,
        "MGA": 4644.87368,
        "MKD": 61.553459,
        "MMK": 2145.023895,
        "MNT": 3332.145393,
        "MOP": 9.410684,
        "MRO": 418.977001,
        "MUR": 49.759323,
        "MVR": 18.108738,
        "MWK": 957.011034,
        "MXN": 23.600798,
        "MYR": 4.910949,
        "MZN": 74.911507,
        "NAD": 17.38102,
        "NGN": 482.903296,
        "NIO": 41.208968,
        "NOK": 10.183387,
        "NPR": 138.218995,
        "NZD": 1.669559,
        "OMR": 0.451859,
        "PAB": 1.173571,
        "PEN": 4.833779,
        "PGK": 4.120462,
        "PHP": 58.805891,
        "PKR": 198.48498,
        "PLN": 4.62829,
        "PYG": 8061.408195,
        "QAR": 4.273121,
        "RON": 4.949388,
        "RSD": 117.602055,
        "RUB": 85.867441,
        "RWF": 1191.750155,
        "SAR": 4.40149,
        "SBD": 9.449419,
        "SCR": 15.409837,
        "SDG": 517.560246,
        "SEK": 10.169974,
        "SGD": 1.58614,
        "SHP": 1.616522,
        "SLL": 12273.567359,
        "SOS": 686.559297,
        "SRD": 25.145087,
        "STD": 24291.266623,
        "SVC": 10.268743,
        "SYP": 1475.736548,
        "SZL": 17.385465,
        "THB": 39.186714,
        "TJS": 13.307367,
        "TMT": 4.119356,
        "TND": 3.296068,
        "TOP": 2.652586,
        "TRY": 10.154218,
        "TTD": 7.9718,
        "TWD": 32.577531,
        "TZS": 2721.590898,
        "UAH": 31.327415,
        "UGX": 4150.796053,
        "USD": 1.173606,
        "UYU": 50.122833,
        "UZS": 12541.275934,
        "VEF": 250952348488.18805,
        "VND": 26709.103552,
        "VUV": 131.011627,
        "WST": 3.004805,
        "XAF": 655.934985,
        "XAG": 0.052024,
        "XAU": 0.000662,
        "XCD": 3.171728,
        "XDR": 0.827072,
        "XOF": 655.940574,
        "XPF": 119.854415,
        "YER": 294.338335,
        "ZAR": 17.409571,
        "ZMK": 10563.859818,
        "ZMW": 19.304717,
        "ZWL": 377.900528
    }
def ok():
    price=rupees.get()
    answer=var.get()
    DICT=OPTIONS.get(answer,None)
    converted=float(DICT)*float(price)
    result.delete(1.0,END)
    result.insert(INSERT,"Price in: ",INSERT,answer,INSERT," = ",INSERT,converted)


appName=Label(conv,text="CURRENCY",font=("arial",25,"bold","underline"),fg="dark blue")
appName.grid(row=0,column=0,padx=7)
photo=PhotoImage(file="logo.png")

logo=Label(conv,image=photo)
logo.grid(row=0,column=1,padx=5)
appName=Label(conv,text="CONVERTER",font=("arial",25,"bold","underline"),fg="dark blue")
appName.grid(row=0,column=1,padx=5)
result=Text(conv,height=3,width=30,font=("arial",18,"bold"),bd=10)
result.grid(row=4,columnspan=10,padx=3)
ind=Label(conv,text="Euro",font=("arial",15,"bold"),fg="red")
ind.grid(row=6,column=0)
rupees=Entry(conv,font=("calibri",15,"bold"))
rupees.grid(row=6,column=1)
choice=Label(conv,text="Choose Currency",font=("arial",15,"bold"),fg="red")
choice.grid(row=9,column=0)
var=StringVar(conv)
var.set(None)
option=OptionMenu(conv,var,*OPTIONS)
option.grid(row=9,column=1,sticky="nsew")
button=Button(conv,text="Convert",font=("arial",20,"bold"),bg="yellow",command=ok)
button.grid(row=9,column=3)
mainloop()
