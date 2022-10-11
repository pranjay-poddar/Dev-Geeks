# -*- coding: utf-8 -*-
"""
Created on Tue Oct  4 03:57:31 2022

@author: samay
"""

import ctypes
import os.path
import pandas as pd
import re
import os
import matplotlib.pyplot as plt

df = pd.read_csv('Suicide_Detection_clean.csv')

df = df.fillna('')

df['class'].value_counts()

data = df['class'].value_counts()
names = list(data.keys())
values = list(data.values)



#ML function
#---------ML function ---
    
from sklearn.model_selection import train_test_split

df_ml = df

sentences = df['text'].values
y = df_ml['class'].values

sentences_train, sentences_test, y_train, y_test = train_test_split(
sentences, y, test_size=0.20, random_state=1000)


from sklearn.feature_extraction.text import CountVectorizer

vectorizer = CountVectorizer()

vectorizer.fit(sentences_train)

X_train = vectorizer.transform(sentences_train)
X_test  = vectorizer.transform(sentences_test)
X_train

from sklearn.linear_model import LogisticRegression

classifier = LogisticRegression(max_iter=1000)
classifier.fit(X_train, y_train)
score = classifier.score(X_test, y_test)
print('Score-Logistic Regression', score)

#Prediction deployment function sample
def predict_category(s,train=y,model=classifier):
    V=[s]
    vect = CountVectorizer()
    vect.fit(V)
    pr = vectorizer.transform(V)
    pred=model.predict(pr)
    
    return pred[0]

print(predict_category('I am not feeling bad'))





