# SENTIMENT ANALYSIS TWEET OF TWEETER

# LIBRARY 
warnings.filterwarnings("ignore")

pandas - used to perform data manipulation and analysis

numpy - used to perform a wide variety of mathematical operations on arrays

matplotlib - used for data visualization and graphical plotting

seaborn - built on top of matplotlib with similar functionalities

re – used as a regular expression to find particular patterns and process it

string – used to obtain information in the string and manipulate the string overall

nltk –  a natural language processing toolkit module associated in anaconda

warnings - to manipulate warnings details

%matplotlib - to enable the inline plotting

#     use probability to get output

pred_prob= model.predict_proba(x_test)

# Predict probability feature to receive a output in probability value
# pred_prob[: , 1] >= 0.3 if result is greater than 30 percent it will assign 1, else it will assign 0
# pred.astype(np.int) assign the value to an integer


# ACCURACY 
accuracy_score(y_test,pred)
0.9433112251282693