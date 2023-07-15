import qrcode
def generate_qr_code(data):
    qr = qrcode.QRCode(version=1,error_correction=qrcode.constants.ERROR_CORRECT_L,box_size=10,border=4,)
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image()
    return img

if __name__ == "__main__":
    data = "https://www.google.com"
    img = generate_qr_code(data)
    img.save("qr_code.png")
    