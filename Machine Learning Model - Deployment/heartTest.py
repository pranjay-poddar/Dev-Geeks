import numpy as np
import pickle

# Loading saved model
loaded_model_heart=pickle.load(open('E:/DataScience/Machine Learning Model - Deployment/heart_model.sav','rb'))

input_data=(60,1,0,130,253,0,1,144,1,1.4,2,1,3)
input_np=np.asarray(input_data)
input=input_np.reshape(1,-1)
inputPred=loaded_model_heart.predict(input)

if(inputPred==1):
  print("Heart Disease Detected")
else:
  print("Heart Disease NOT Detected")