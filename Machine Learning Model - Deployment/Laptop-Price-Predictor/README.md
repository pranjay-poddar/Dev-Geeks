# Laptop-Price-Predictor

This project aims to predict the price of laptops using machine learning techniques, specifically the XGBoost algorithm. The model is trained on a dataset containing various features of laptop, such as the model, ram, sdd, touchscreen, processor, and other relevant factors.

## Dataset

The dataset used for this project consists of a collection of all the laptops, each with associated features and the corresponding price. The dataset is preprocessed to handle missing values, categorical variables, and feature scaling, ensuring the data is suitable for training the XGBoost model.  

Dataset link: In the dataset folder(laptop_data.csv)
## XGBoost Algorithm

XGBoost is an optimized gradient boosting algorithm that has gained popularity in machine learning competitions and has become a popular choice for predictive modeling tasks. It is known for its efficiency, accuracy, and flexibility. XGBoost combines multiple weak prediction models (decision trees) to create a strong ensemble model.

## Dependencies

The following dependencies are required to run the project:

-streamlit==1.24.1
-scikit-learn==1.2.1
-xgboost==1.7.6
-pandas==1.5.3
-numpy==1.25.0

To install the required dependencies, you can use the following command:

```shell
pip install xgboost numpy pandas scikit-learn streamlit
```

## Usage
Clone the repository:
```shell
git clone https://github.com/your-username/laptop-price-predictor.git
```
Navigate to the project directory:
```shell
cd laptop-price-predictor
```
Install the dependencies:
```shell
pip install -r requirements.txt
```
Run the Streamlit app:
```shell
streamlit run app.py
```

Open your browser and go to http://localhost:8501/ to access the car price prediction app.  

Or you can use the deployed project using the link: https://laptop-price-predictor--eh7dddyzs0h.streamlit.app/

## Disclaimer
The laptop price predictions provided by this project are based on a machine learning model Accuracy of 89.9% and may not always accurately reflect the real market prices. The predictions should be used for reference purposes only, and actual laptop prices can vary due to various factors.