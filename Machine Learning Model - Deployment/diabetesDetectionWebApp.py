import numpy as np
import pickle
import streamlit as st

# Loading saved model
loaded_model=pickle.load(open("E:/DataScience/Machine Learning Model - Deployment/diabetes_model.sav",'rb'))

def diabetesPrediction(input_data):
    input_np=np.array(input_data)
    input=input_np.reshape(1,-1)
    
    inputPreds=loaded_model.predict(input)
    
    if(inputPreds[0]==1):
      return "Person is Diabetic"
    else:
      return "Person is NOT Diabetic"
    
def main():
   # give title
   st.title("DIABETES PREDICTION (IN WOMEN)")

   # take inputs
   # Pregnancies,Glucose,BloodPressure,SkinThickness,Insulin,BMI,DiabetesPedigreeFunction,Age
   Pregnancies=st.text_input("Pregnancies")
   Glucose=st.text_input("Glucose")
   BloodPressure=st.text_input("BloodPressure")
   SkinThickness=st.text_input("SkinThickness")
   Insulin=st.text_input("Insulin")
   BMI=st.text_input("BMI")
   DiabetesPedigreeFunction=st.text_input("DiabetesPedigreeFunction")
   Age=st.text_input("Age")

   # define outcome
   diagnosis=''

   # button
   if(st.button("Predict Diabetes")):
      diagnosis=diabetesPrediction([Pregnancies,Glucose,BloodPressure,SkinThickness,Insulin,BMI,DiabetesPedigreeFunction,Age])

   # success
   st.success(diagnosis)

   
   
# main
if(__name__=="__main__"):
   main()