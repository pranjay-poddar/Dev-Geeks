import numpy as np
import pickle
import streamlit as st

# loading saved model
loaded_model=pickle.load(open('E:/DataScience/Machine Learning Model - Deployment/breast_cancer_model.sav','rb'))

def breastCancerDetection(input_data):
    input_np=np.asarray(input_data)
    input=input_np.reshape(1,-1)
    inputPred=loaded_model.predict(input)
    if(inputPred[0]=='B'):
      return "Bengin - Normal"
    elif(inputPred[0]=='M'):
      return "Malignant - Cancerous"


def main():
   # give title
   st.title("BREAST CANCER DETECTION")

   # take input

   # "radius_mean","texture_mean","perimeter_mean","area_mean","smoothness_mean","compactness_mean","concavity_mean","concave points_mean","symmetry_mean",
   # "fractal_dimension_mean","radius_se","texture_se","perimeter_se","area_se","smoothness_se","compactness_se","concavity_se","concave points_se","symmetry_se",
   # "fractal_dimension_se","radius_worst","texture_worst","perimeter_worst","area_worst","smoothness_worst","compactness_worst","concavity_worst","concave points_worst",
   # "symmetry_worst","fractal_dimension_worst"

   radius_mean=st.text_input("radius_mean")
   texture_mean=st.text_input("texture_mean")
   perimeter_mean=st.text_input("perimeter_mean")
   area_mean=st.text_input("area_mean")
   smoothness_mean=st.text_input("smoothness_mean")
   compactness_mean=st.text_input("compactness_mean")
   concavity_mean=st.text_input("concavity_mean")
   concave_points_mean=st.text_input("concave points_mean")  ##### here
   symmetry_mean=st.text_input("symmetry_mean")
   fractal_dimension_mean=st.text_input("fractal_dimension_mean")
   radius_se=st.text_input("radius_se")
   texture_se=st.text_input("texture_se")
   perimeter_se=st.text_input("perimeter_se")
   area_se=st.text_input("area_se")
   smoothness_se=st.text_input("smoothness_se")
   compactness_se=st.text_input("compactness_se")
   concavity_se=st.text_input("concavity_se")
   concave_points_se=st.text_input("concave points_se")  ## here
   symmetry_se=st.text_input("symmetry_se")
   fractal_dimension_se=st.text_input("fractal_dimension_se")
   radius_worst=st.text_input("radius_worst")
   texture_worst=st.text_input("texture_worst")
   perimeter_worst=st.text_input("perimeter_worst")
   area_worst=st.text_input("area_worst")
   smoothness_worst=st.text_input("smoothness_worst")
   compactness_worst=st.text_input("compactness_worst")
   concavity_worst=st.text_input("concavity_worst")
   concave_points_worst=st.text_input("concave points_worst")  #### here
   symmetry_worst=st.text_input("symmetry_worst")
   fractal_dimension_worst=st.text_input("fractal_dimension_worst")

   # diagnosis
   diagnosis=''

   # make button
   if(st.button('Type of Breast Cancer')):
      diagnosis=breastCancerDetection([[float(radius_mean),float(texture_mean),float(perimeter_mean),float(area_mean),float(smoothness_mean),float(compactness_mean),float(concavity_mean),float(concave_points_mean),float(symmetry_mean),float(fractal_dimension_mean),float(radius_se),float(texture_se),float(perimeter_se),float(area_se),float(smoothness_se),float(compactness_se),float(concavity_se),float(concave_points_se),float(symmetry_se),float(fractal_dimension_se),float(radius_worst),float(texture_worst),float(perimeter_worst),float(area_worst),float(smoothness_worst),float(compactness_worst),float(concavity_worst),float(concave_points_worst),float(symmetry_worst),float(fractal_dimension_worst)]])
   
   st.success(diagnosis)



if(__name__=="__main__"):
   main()


# float()