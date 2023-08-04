# Bangalore House Price Prediction Project
A prediction model that predicts Bangalore house rate to help people to know about the prices of house in various places without the need of contacting different agents for the same and deployed it using streamlit web app.

Data was collected from [Kaggle](https://www.kaggle.com/amitabhajoy/bengaluru-house-price-data)

This project aims to predicts the prices based on given input by using machine learning techniques, specifically linear regression. The model is trained on a dataset containing various features of bangalore house dataset, such as 'BHK','Bathroom','location','total sqft','price' and other relevant factors.

## Dataset

The dataset used for this project consists of a collection of Bangalore house data based on location and price, each with associated features. The dataset is preprocessed to handle missing values, categorical variables, and feature scaling, ensuring the data is suitable for training the prediction model.  

Dataset link: In the dataset folder("Bengaluru_House_Data.csv")

## Algorithm
- Performed One hot encoding to represent the categorical values in binary form since machine learning algorithms cannot operate on label data directly.
-  I also split the data into train and tests sets with a test size of 20%.
Model Used:- 
1. Multiple Linear Regression - r^2 value of **0.86**
---
## Prediction:
Built a function to predict the house price with location, number of Square foot area, Bathroom, and BHK.

The prices mentioned are in Lakhs(Indian Currency)


## Dependencies

The following dependencies are required to run the project:

-streamlit==1.24.1
-scikit-learn==1.2.1
-pandas==1.5.3
-numpy==1.25.1
-requests==2.31.0


To install the required dependencies, you can use the following command:

```shell
pip install RandomForestClassifier linear_regression numpy pandas scikit-learn streamlit
```

## Usage
Clone the repository:
```shell
git clone https://github.com/your-username/Bangalore-House-Price-Prediction.git
```
Navigate to the project directory:
```shell
cd Bangalore-House-Price-Prediction
```
Install the dependencies:
```shell
pip install -r requirements.txt
```
Run the Streamlit app:
```shell
streamlit run app.py
```

Open your browser and go to http://localhost:8501/ to access the Bangalore-House-Price-Prediction webpage.


## Disclaimer
The Bangalore-House-Price-Prediction provided by this project are based on a ml model and may not always accurately reflect the real price secenerios. The predictions should be used for reference purposes only, and dataset of house-Price from kaggle can vary due to various factors.