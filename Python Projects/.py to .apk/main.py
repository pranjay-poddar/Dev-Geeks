from kivymd.app import MDApp
from kivymd.uix.label import MDLabel
from kivymd.uix.button import MDFlatButton
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.textinput import TextInput


class MainApp(MDApp):
    def build(self):
        # Create the main layout
        layout = BoxLayout(orientation='vertical', spacing=10, padding=10)
        
        # Create a label
        label = MDLabel(text="Welcome to Dev-Geeks", halign="center")
        
        # Create a text input
        text_input = TextInput(hint_text="Enter your name")
        
        # Create a button
        button = MDFlatButton(text="Submit", on_release=self.on_button_release)
        
        # Add the widgets to the layout
        layout.add_widget(label)
        layout.add_widget(text_input)
        layout.add_widget(button)
        
        return layout
    
    def on_button_release(self, instance):
        # Get the text input value
        name = instance.parent.children[1].text
        
        # Display a greeting message
        greeting = f"Hello, {name}!"
        instance.parent.children[0].text = greeting


if __name__ == '__main__':
    MainApp().run()
