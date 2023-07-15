import pickle
import pandas as pd
import streamlit as st
import datetime

model = pickle.load(open('rf_model.pkl', 'rb'))

st.title("Car Price Prediction")
st.subheader("Enter the car details here: ")

Year = st.text_input("Year the car is bought:")
Present_Price = st.text_input("Showroom price of the car (In lakhs):")
Kms_Driven = st.text_input("Car kms driven:")
Owner = st.selectbox("No of previous owners of the car: ", [0, 1, 3])
Fuel_Type = st.selectbox("Fuel Type:", ["Petrol", "Diesel", "CNG"])
Seller_Type = st.radio("Are you a dealer or individual?", ["Individual", 'Dealer'])
Transmission = st.radio("Transmission Type: ", ["Manual", 'Automatic'])

if st.button("Calculate the selling price"):
    Present_Price = float(Present_Price)
    Kms_Driven = int(Kms_Driven)
    # Kms_Driven = np.log(Kms_Driven)
    Owner = int(Owner)
    date_time = datetime.datetime.now()
    No_of_years = date_time.year - int(Year)
    Fuel_Type_Diesel = 0
    if Fuel_Type == 'Petrol':
        Fuel_Type = 0
    if Fuel_Type == 'Diesel':
        Fuel_Type = 1
    if Fuel_Type == 'CNG':
        Fuel_Type = 2
    if Seller_Type == 'Individual':
        Seller_Type = 1
    if Seller_Type == 'Dealer':
        Seller_Type = 0
    if Transmission == "Manual":
        Transmission = 0
    if Transmission == "Automatic":
        Transmission = 1

    data_new = pd.DataFrame({
        'Present_Price': Present_Price,
        'Kms_Driven': Kms_Driven,
        'Fuel_Type': Fuel_Type,
        'Seller_Type': Seller_Type,
        'Transmission': Transmission,
        'Owner': Owner,
        'No_of_years': No_of_years}, index=[0])

    price = model.predict(data_new)
    output = round(price[0], 2)
    if output < 0:
        st.text("Sorry you cannot sell this car")
    else:
        st.text("You Can Sell The Car at " + str(output) + " lakhs")
