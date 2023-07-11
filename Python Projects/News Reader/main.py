import requests
import json
from win32com.client import Dispatch

# Function to speak the articles
def speak_new(articles_list):
    speak = Dispatch("SAPI.SpVoice")
    for i, article in enumerate(articles_list):
        print("Speak...:", (i + 1, article))
        speak.Speak(article)

if __name__ == '__main__':
    # Retrieve news from the API
    news = requests.get("https://newsapi.org/v2/top-headlines?country=in&apiKey=8d681cf0638047359c211f66c961ad11")
    json_news = news.json()

    # Extract the articles from the JSON response
    articles = json_news["articles"]
    articles_list = []

    # Get the titles of the articles
    for article in articles:
        articles_list.append(article["title"])

    # Speak the article titles
    speak_new(articles_list)
