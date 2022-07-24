from PIL import Image

import os

filename = '2nd.jpg'

image = Image.open(filename)

if image.mode == "RGBA":
    image = image.convert("RGB")

output = "output.pdf"

if not os.path.exists(output):
    image.save(output,"PDF", resolution = 100.0)


