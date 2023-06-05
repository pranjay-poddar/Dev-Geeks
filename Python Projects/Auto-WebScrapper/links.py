# This files gives you All website links.
import requests
import bs4

link_list = []
res = requests.get('https://www.apple.com/')
soup = bs4.BeautifulSoup(res.text, 'lxml')

for link in soup.find_all('a', href=True):
    if link['href'][0] == '#':
        pass
    elif link['href'][0] == '/':
        pass
    else:
        print(link['href'])
