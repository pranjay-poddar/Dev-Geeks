import numpy as np
import pickle

# Loading saved model
loaded_model=pickle.load(open("E:/DataScience/Machine Learning Model - Deployment/diabetes_model.sav",'rb'))

input_data=(8,99,84,0,0,35.4,0.388,50)
input_np=np.array(input_data)
input=input_np.reshape(1,-1)

inputPreds=loaded_model.predict(input)

if(inputPreds[0]==1):
  print("Person is Diabetic")
else:
  print("Person is NOT Diabetic")
