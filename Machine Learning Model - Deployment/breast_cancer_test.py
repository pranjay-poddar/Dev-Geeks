import numpy as np
import pickle

# loading saved model
loaded_model=pickle.load(open('E:/DataScience/Machine Learning Model - Deployment/breast_cancer_model.sav','rb'))

input_data=(15.75,20.25,102.6,761.3,0.1025,0.1204,0.1147,0.06462,0.1935,0.06303,0.3473,0.9209,2.244,32.19,0.004766,0.02374,0.02384,0.008637,0.01772,0.003131,19.56,30.29,125.9,1088,0.1552,0.448,0.3976,0.1479,0.3993,0.1064)
input_np=np.asarray(input_data)
input=input_np.reshape(1,-1)
inputPred=loaded_model.predict(input)
if(inputPred[0]=='B'):
  print("Bengin - Normal")
elif(inputPred[0]=='M'):
  print("Malignant - Cancerous")