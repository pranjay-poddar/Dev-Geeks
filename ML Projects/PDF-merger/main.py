from PyPDF4 import PdfFileMerger
import os

merger = PdfFileMerger()

files = ['report1.pdf', r'C:\Users\Srinjoy\Desktop\pdf merger\report2.pdf']

for file in files:

    bookmarkName = os.path.basename(file)

    merger.append(file, bookmark= bookmarkName)

merger.write('result.pdf')
merger.close()