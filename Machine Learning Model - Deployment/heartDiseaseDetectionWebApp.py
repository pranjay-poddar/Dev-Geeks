import numpy as np
import pickle
import streamlit as st

# Loading saved model
loaded_model_heart=pickle.load(open('E:/DataScience/Machine Learning Model - Deployment/heart_model.sav','rb'))

def heartDiseasePrediction(input_data):
    # input_data=(60,1,0,130,253,0,1,144,1,1.4,2,1,3)
    input_np=np.asarray(input_data)
    input=input_np.reshape(1,-1)
    inputPred=loaded_model_heart.predict(input)
    
    if(inputPred==1):
      return "Heart Disease Detected"
    else:
      return "Heart Disease NOT Detected"
    

def main():
   # giving a title
   st.title("HEART DISEASE PREDICTION")

   # taking input
   # age,sex,cp,trestbps,chol,fbs,restecg,thalach,exang,oldpeak,slope,ca,thal
   age=st.text_input('age')
   sex=st.text_input('sex')
   cp=st.text_input('cp')
   trestbps=st.text_input('trestbps')
   chol=st.text_input('chol')
   fbs=st.text_input('fbs')
   restecg=st.text_input('restecg')
   thalach=st.text_input('thalach')
   exang=st.text_input('exang')
   oldpeak=st.text_input('oldpeak')
   slope=st.text_input('slope')
   ca=st.text_input('ca')
   thal=st.text_input('thal')

   # prediction
   prediction=" "

   #button
   if(st.button('Predict Heart Disease')):
      prediction=heartDiseasePrediction([[int(age),int(sex),int(cp),int(trestbps),int(chol),int(fbs),int(restecg),int(thalach),int(exang),int(oldpeak),int(slope),int(ca),int(thal)]])

   st.success(prediction)



if __name__=='__main__':
   main()