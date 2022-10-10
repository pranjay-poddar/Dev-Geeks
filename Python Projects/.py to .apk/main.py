# First you have to import the modules using these following codes

from kivymd.app import MDApp 
from kivymd.uix.label import MDLabel #This is for graphics purpose
 
 # Now you have to create a class and design your app 
class Main_App(MDApp):
    def build(self):
        return MDLabel(text="Welcome to Dev-Geeks", halign="center") #Here you can customize your app
 

#Now run your app
if __name__ == '__main__':
    Main_App().run()
    
# After run this main.py you can see the created app in a pop-up window 
# Now follow README.md to create .apk file

# Thank You
