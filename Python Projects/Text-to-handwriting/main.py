import pywhatkit as kit
import cv2
import tkinter as tk
from tkinter import filedialog
from tkinter import simpledialog
from PIL import Image, ImageDraw, ImageFont

# Create a simple GUI for user interaction
root = tk.Tk()
root.withdraw()  # Hide the main window

# Prompt user for input text
contents = simpledialog.askstring("Input", "Enter the text you want to convert to handwriting:")

# Prompt user for save location
save_location = filedialog.asksaveasfilename(defaultextension=".png", filetypes=[("PNG files", "*.png")])

# Convert text to handwriting image
handwriting_image_path = save_location
kit.text_to_handwriting(contents, save_to=handwriting_image_path)

# Load handwriting image
handwriting_img = Image.open(handwriting_image_path)

# Option to set background image
background_img_path = filedialog.askopenfilename(title="Select a background image (optional)", filetypes=[("Image files", "*.jpg *.jpeg *.png")])
if background_img_path:
    background_img = Image.open(background_img_path)
    background_img = background_img.resize(handwriting_img.size)
    handwriting_img = Image.alpha_composite(Image.new("RGBA", handwriting_img.size), handwriting_img)
    handwriting_img.paste(background_img, (0, 0), background_img)

# Add more features to the handwriting image (text formatting, color, etc.)
draw = ImageDraw.Draw(handwriting_img)
font = ImageFont.load_default()

# Display the image
handwriting_img.show()

# Close the image window on key press
cv2.waitKey(0)
cv2.destroyAllWindows()
