# Parkinson's Disease Detector

This is a Parkinson's Disease Detector application that uses machine learning to predict whether or not a person has Parkinson's Disease based on biomedical voice measurements. The application is built using Python and Streamlit.

## About the Project

Parkinson's disease is a neurodegenerative disorder that affects a person's ability to control their movements. One of the symptoms of Parkinson's disease is changes in a person's voice, such as changes in pitch, loudness, and rhythm. This project aims to build a machine learning model that can predict whether or not a person has Parkinson's disease based on their biomedical voice measurements.

The machine learning model is trained on a dataset that contains biomedical voice measurements from people with and without Parkinson's disease. The dataset used for training the model can be found [here](https://github.com/dhrupad17/Parkinsons-Disease-Detector/blob/main/Parkinsson%20disease.csv). The model is trained using Support Vector Machines (SVM) algorithm. The trained model is saved as a .sav file.

The application is built using Streamlit, a Python library for building web applications. The user can input some biomedical voice measurements into the application, and the application will predict whether or not the person has Parkinson's disease.

### Model
The model used for this project is a Support Vector Machine (SVM) classifier. The SVM was trained on the Parkinsons Dataset using scikit-learn's SVC class, and achieved an accuracy of 92% on the test set.

### Dataset
The dataset used for this project is the [Parkinsons Dataset](https://github.com/dhrupad17/Parkinsons-Disease-Detector/blob/main/Parkinsson%20disease.csv), which was taken from the UCI Machine Learning Repository. It contains biomedical voice measurements from 195 patients, of which 147 have Parkinson's Disease. The dataset has 24 columns, including the status of the patient (0 for healthy, 1 for Parkinson's Disease).

## Website OverView:-

![Screenshot (508)](https://github.com/pranjay-poddar/Dev-Geeks/assets/91726340/71c7a16d-a4b6-4b50-bc3d-1a1cb81a39ba)
