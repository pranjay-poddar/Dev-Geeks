
#WordCloud Made By Shivsagar Mishra


import wikipedia
from wordcloud import WordCloud,STOPWORDS
import matplotlib.pyplot as plt
import re

text = wikipedia.page("Python Programming language")
content=text.content
print (content)

#code to remove unwanted stuff
content = re.sub(r'==.*?===+','', content)
content= content.replace("\n",'')

print (content)

#Code to remove STOPWORDS From our webpage paragraph
stopwords = set(STOPWORDS)

print(stopwords)

#code to create wordcloud from our wikipedia content
wordcloud= WordCloud(width = 800, height=800,
                     background_color="white",
                     stopwords=stopwords,
                     min_font_size=10).generate(content)

plt.figure(figsize=(8,8), facecolor=None)
plt.imshow(wordcloud)
plt.axis("off")
plt.show()
