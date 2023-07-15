import numpy as np
import pickle
import streamlit as st
from streamlit_option_menu import option_menu

diabetes_model=pickle.load(open('E:/DataScience/Machine Learning Model - Deployment/diabetes_model.sav','rb'))

heart_disease_model=pickle.load(open('E:/DataScience/Machine Learning Model - Deployment/heart_model.sav','rb'))

breast_cancer_model=pickle.load(open('E:/DataScience/Machine Learning Model - Deployment/breast_cancer_model.sav','rb'))


with st.sidebar:
    selected=option_menu('Multiple Disease Prediction System',
                         ['Diabetes Prediction',
                          'Heart Disease Prediction',
                          'Breast Cancer Prediction'],
                          icons=['box','activity','bag-plus'],
                          default_index=0)

# DIABETES
if(selected=='Diabetes Prediction'):
    st.title("DIABETES PREDICTION")
    
    col1,col2,col3=st.columns(3)
    with col1:
        Pregnancies=st.text_input("Pregnancies")
    with col2:
        Glucose=st.text_input("Glucose")
    with col3:
        BloodPressure=st.text_input("BloodPressure")
    with col1:
        SkinThickness=st.text_input("SkinThickness")
    with col2:
        Insulin=st.text_input("Insulin")
    with col3:
        BMI=st.text_input("BMI")
    with col1:
        DiabetesPedigreeFunction=st.text_input("DiabetesPedigreeFunction")
    with col2:
        Age=st.text_input("Age")

    # define outcome
    diabetes_diagnosis=''

    # button
    if(st.button("Predict Diabetes")):
      diabetes_prediction=diabetes_model.predict([[Pregnancies,Glucose,BloodPressure,SkinThickness,Insulin,BMI,DiabetesPedigreeFunction,Age]])
    
      if(diabetes_prediction[0]==1):
          diabetes_diagnosis="The person is diabetic"
      else:
          diabetes_diagnosis="The person is NOT diabetic"

    # success
    st.success(diabetes_diagnosis)



# HEART DISEASE
if(selected=='Heart Disease Prediction'):
    st.title("HEART DISEASE PREDICTION")
    col1,col2,col3=st.columns(3)
    with col1:
        age=st.text_input('age')
    with col2:
        sex=st.text_input('sex')
    with col3:
        cp=st.text_input('cp')
    with col1:
        trestbps=st.text_input('trestbps')
    with col2:
        chol=st.text_input('chol')
    with col3:
        fbs=st.text_input('fbs')
    with col1:
        restecg=st.text_input('restecg')
    with col2:
        thalach=st.text_input('thalach')
    with col3:
        exang=st.text_input('exang')
    with col1:
        oldpeak=st.text_input('oldpeak')
    with col2:
        slope=st.text_input('slope')
    with col3:
        ca=st.text_input('ca')
    with col1:
        thal=st.text_input('thal')
 
    # prediction
    heart_disease_diagnosis=" "
 
    #button
    if(st.button('Predict Heart Disease')):
       heart_disease_prediction=heart_disease_model.predict([[int(age),int(sex),int(cp),int(trestbps),int(chol),int(fbs),int(restecg),int(thalach),int(exang),int(oldpeak),int(slope),int(ca),int(thal)]])
       if(heart_disease_prediction==1):
           heart_disease_diagnosis="Heart Disease detected"
       else:
           heart_disease_diagnosis="Heart Disease NOT detected"
           
 
    st.success(heart_disease_diagnosis)



# BREAST CANCER
if(selected=='Breast Cancer Prediction'):
    st.title("BREAST CANCER PREDICTION")
    col1,col2,col3=st.columns(3)
    
    with col1:
        radius_mean=st.text_input("radius_mean")
    with col2:
        texture_mean=st.text_input("texture_mean")
    with col3:
        perimeter_mean=st.text_input("perimeter_mean")
    with col1:
        area_mean=st.text_input("area_mean")
    with col2:
        smoothness_mean=st.text_input("smoothness_mean")
    with col3:
        compactness_mean=st.text_input("compactness_mean")
    with col1:
        concavity_mean=st.text_input("concavity_mean")
    with col2:
        concave_points_mean=st.text_input("concave points_mean")  ##### here
    with col3:
        symmetry_mean=st.text_input("symmetry_mean")
    with col1:
        fractal_dimension_mean=st.text_input("fractal_dimension_mean")
    with col2:
        radius_se=st.text_input("radius_se")
    with col3:
        texture_se=st.text_input("texture_se")
    with col1:
        perimeter_se=st.text_input("perimeter_se")
    with col2:
        area_se=st.text_input("area_se")
    with col3:
        smoothness_se=st.text_input("smoothness_se")
    with col1:
        compactness_se=st.text_input("compactness_se")
    with col2:
        concavity_se=st.text_input("concavity_se")
    with col3:
        concave_points_se=st.text_input("concave points_se")  ## here
    with col1:
        symmetry_se=st.text_input("symmetry_se")
    with col2:
        fractal_dimension_se=st.text_input("fractal_dimension_se")
    with col3:
        radius_worst=st.text_input("radius_worst")
    with col1:
        texture_worst=st.text_input("texture_worst")
    with col2:
        perimeter_worst=st.text_input("perimeter_worst")
    with col3:
        area_worst=st.text_input("area_worst")
    with col1:
        smoothness_worst=st.text_input("smoothness_worst")
    with col2:
        compactness_worst=st.text_input("compactness_worst")
    with col3:
        concavity_worst=st.text_input("concavity_worst")
    with col1:
        concave_points_worst=st.text_input("concave points_worst")  #### here
    with col2:
        symmetry_worst=st.text_input("symmetry_worst")
    with col3:
        fractal_dimension_worst=st.text_input("fractal_dimension_worst")


    # diagnosis
    breast_cancer_diagnosis=''
 
    # make button
    if(st.button('Type of Breast Cancer')):
       breast_cancer_prediction=breast_cancer_model.predict([[float(radius_mean),float(texture_mean),float(perimeter_mean),float(area_mean),float(smoothness_mean),float(compactness_mean),float(concavity_mean),float(concave_points_mean),float(symmetry_mean),float(fractal_dimension_mean),float(radius_se),float(texture_se),float(perimeter_se),float(area_se),float(smoothness_se),float(compactness_se),float(concavity_se),float(concave_points_se),float(symmetry_se),float(fractal_dimension_se),float(radius_worst),float(texture_worst),float(perimeter_worst),float(area_worst),float(smoothness_worst),float(compactness_worst),float(concavity_worst),float(concave_points_worst),float(symmetry_worst),float(fractal_dimension_worst)]])
       if(breast_cancer_prediction[0]=='B'):
           breast_cancer_diagnosis="Bengin - Normal"
       else:
           breast_cancer_diagnosis="Malignant - Cancerous !"
    
    st.success(breast_cancer_diagnosis)