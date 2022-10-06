import numpy as np
import pandas as pd
import matplotlib.pyplot as plt 
import pandas_datareader as data
from datetime import date

# for importing models
from keras.models import load_model
import streamlit as st


start = '2010-01-01'
# end = '2022-08-08'
##:? for dynamically setting dates 
end = date.today().strftime('%Y-%m-%d')

curr_year = date.today().strftime('%Y')

st.title('Stock Trend Prediction 🪙')


st.markdown("""
This app retrieves the Data of Stock (from Yahoo Finance) and gives insights about it including Moving Averages of 100 & 200 days. And also predicts the prices by the Trained Model (using LSTM)
* **Github Repo:** [Stock Market Predictor](https://github.com/pranjal-barnwal/stock-market-predictor)
* **Python libraries:** keras, pandas, streamlit, pandas-datareader, numpy, matplotlib, scikit-learn, tensorflow
* **Data source:** [Yahoo Finance Tickers](https://finance.yahoo.com/screener/predefined/134b914f-e393-4b2e-a824-b4be15517cd8?.tsrc=fin-srch)
* To find Ticker for your Stock use: [Yahoo Finance's Ticker](https://finance.yahoo.com/)

    NOTE: Yahoo Finance's Tickers are little different, so visit their [site](https://finance.yahoo.com/) and search for the Stock Tickers you want, then copy the Ticker from there and paste it down below here.
""")

st.title('Enter Stock Ticker below:')
user_input = st.text_input('👇🏻💹👇🏻', 'RELIANCE.NS')        
#? second value here shows the default value
st.text('For Indian Stock use .NS in last like: SBIN.NS, TATAMOTORS.NS')
st.text('For US Stock use directly like: GOOG, TSLA')

#:?     we will be Predicting Prices for Uesr-Input     
df = data.DataReader(user_input, 'yahoo', start, end)

#://     Describing Data            
st.markdown('#')
st.subheader('Data from 2010-'+curr_year)
st.write(df.describe())


#://     Visualizations            
st.markdown('#')
st.subheader('Closing Price vs Time Chart - since 2010')
fig = plt.figure(figsize=(12,6))
plt.plot(df.Close, 'b', label='Price', color='green')
plt.legend()
plt.xlabel('Time')
plt.ylabel('Price')
st.pyplot(fig)


#://     100 Moving Average            
st.markdown('#')
st.subheader('Closing Price vs Time Chart with 100MA')
ma100 = df.Close.rolling(100).mean()
fig = plt.figure(figsize=(12,6))
plt.plot(df.Close, 'b', label='Price', color='green')
plt.plot(ma100, 'r', label='MA-100', color='orange')
plt.legend()
plt.xlabel('Time')
plt.ylabel('Price')
st.pyplot(fig)


#://     100 & 200 Moving Average            
st.markdown('#')
st.subheader('Closing Price vs Time Chart with 100MA & 200MA')
ma100 = df.Close.rolling(100).mean()
ma200 = df.Close.rolling(200).mean()
fig = plt.figure(figsize=(12,6))
plt.plot(df.Close, 'b', label='Price', color='green')
plt.plot(ma100, 'r', label='MA-100', color='orange')
plt.plot(ma200, 'g', label='MA-200', color='red')
plt.legend()
plt.xlabel('Time')
plt.ylabel('Price')
st.pyplot(fig)

#://    Splitting Data into Training & Testing      
data_training = pd.DataFrame(df['Close'][0:int(len(df)*0.70)])
data_testing = pd.DataFrame(df['Close'][int(len(df)*0.70): int(len(df))])


#://        Min-Max Scaling         
from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler(feature_range=(0,1))

data_training_array = scaler.fit_transform(data_training)      


# since the model is already trained previously, we don't need to retrain it again



#://    Loading My Model         
model = load_model('keras_model.h5')


#://    Testing Part             
past_100_days = data_training.tail(100)
final_df = past_100_days.append(data_testing, ignore_index=True)
input_data = scaler.fit_transform(final_df)

x_test = []
y_test = []

for i in range(100, input_data.shape[0]):
    x_test.append(input_data[i-100:i])
    y_test.append(input_data[i,0])

x_test, y_test = np.array(x_test), np.array(y_test)
y_predicted = model.predict(x_test)

scaler = scaler.scale_
scale_factor = 1/(scaler[0])


y_predicted = y_predicted * scale_factor
y_test = y_test * scale_factor


#://     Plotting the Data      
st.markdown('#')
st.subheader('Predictions vs Original')
fig2 = plt.figure(figsize=(12,6))
plt.plot(y_test, 'b', label='Original Price', color='green')
plt.plot(y_predicted, 'r', label='Predicted Price', color='red')
plt.xlabel('Time')
plt.ylabel('Price')
plt.title('Making Prediction')
plt.legend()
st.pyplot(fig2)

st.text('')
st.text('Prediction with the Trained Model')
st.text('')






st.markdown("""
Made with 💖 by 
[Pranjal Kumar🧑🏻‍💻](https://pranjal-kumar.vercel.app/)
</p>
""")