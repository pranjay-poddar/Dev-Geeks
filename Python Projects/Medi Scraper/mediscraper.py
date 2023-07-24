from html.parser import HTMLParser
import bs4
from bs4 import BeautifulSoup
import requests

"""
        Create an instance of `MediEncyclopedia` class.

    ```python
    ency = MediEncyclopedia()
    ```

    | Methods               | Details                                                                                      |
    | --------------------- | -------------------------------------------------------------------------------------------- |
    | `.scrapebyurl()`      | Returns the medical dictation of associated topic url                                        |
    | `.query()`            | It takes a user query parameter as an argument and returns all relevant terms related to it. |
    | `.byletter()`         | Returns the list of medical relics starting with a particular letter                         |


    """


class MediEncyclopedia:

  def __init__(self):
    print(self)

  def scrapebyurl(self,url):
    """Returns the medical data including references, review dates, content, topic-head and so on.\n
    Parameters:\n
      - url: It is the url of the Mediline's encyclopedia page the information of whom is to be fetched."""

    try:
      content = requests.get(url)
      soup = BeautifulSoup(content.content, 'html.parser')
      headline = soup.find('h1',attrs={'class':'with-also'}).text
      article = soup.find('article')
      for script in article(["script", "style"]):
        script.extract()
      text = article.get_text().replace('Browse the Encyclopedia','').replace('Clinical Trials','')
      text = text.replace('To use the sharing features on this page, please enable JavaScript.','')

      return [headline,text]
    except:
      return None

  def query(self, userquery):
    """This function takes a query from the users and returns all the matching terms/responses from the encyclopedia matching the user's query. If there is no matching response, than it returns None\n
    Parameters:\n
      - userquery: String query input given by the user"""
    try:

      fl = userquery[0].upper()
      resq = []
      vals = MediEncyclopedia().byletter(fl)
      ls = userquery.split(' ')
      for i in ls:
        for j in vals:
          if i in j[0]:
            resq.append(j)
      resq = list(resq)
      return resq
    except:
      return None





  def byletter(self, character):
    """Returns the list of medical encyclopedia terms starting with a particular english character.\n
    Paramters:\n
     -- character: It is the single character input given by the user. The corresponding encyclopedia entries starting with this character are returned as a response then."""
    try:
      character = character.upper()
      chk = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      if character not in chk:
        return None
      url = 'https://medlineplus.gov/ency/encyclopedia_{}.htm'.format(character)
      content = requests.get(url)
      base = 'https://medlineplus.gov/ency/'
      soup = BeautifulSoup(content.content, 'html.parser')
      vals = []
      heads = soup.find_all('li')
      allheads = heads[42:len(heads)-16]
      for i in allheads:
        t = base+i.find('a')['href']
        h = i.find('a').text
        vals.append([h,t])

      return vals
    except:
      return None

