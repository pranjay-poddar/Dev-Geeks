import qrcode 

qrCodeLink = "https://github.com/Palakkgoyal" #Replace this link and add yours

#Customization
qrCodeSize = 10
qrCodeBorderWidth = 4
qrCodeBackgroundColor = "white"
qrCodeColor = "black"
imgName = "qrCode"
formatOfImg = "png"

qr = qrcode.QRCode(version=1,
                   error_correction=qrcode.ERROR_CORRECT_H,
                   box_size=qrCodeSize,
                   border=qrCodeBorderWidth,)

qr.add_data(qrCodeLink)
qr.make(fit=True)
img=qr.make_image(fill_color=qrCodeColor,back_color=qrCodeBackgroundColor)
img.save(f"{imgName}.{formatOfImg}")