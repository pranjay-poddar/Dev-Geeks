
#WordCloud Made By Shivsagar Mishra


import wikipedia
from wordcloud import WordCloud,STOPWORDS
import matplotlib.pyplot as plt
import re

wikipage=input("Enter the Name of the wikipedia page of which you want to create the wordcloud: ")
text = wikipedia.page(wikipage)
content=text.content
print (content)

content = re.sub(r'==.*?===+','', content)
content= content.replace("\n",'')

print (content)


stopwords = set(STOPWORDS)

print(stopwords)

wordcloud= WordCloud(width = 800, height=800,
                     background_color="white",
                     stopwords=stopwords,
                     min_font_size=10).generate(content)

plt.figure(figsize=(8,8), facecolor=None)
plt.imshow(wordcloud)
plt.axis("off")
plt.show()
