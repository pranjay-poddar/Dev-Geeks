# Car-Price-Prediction

This project aims to predict the price of cars using machine learning techniques, specifically the XGBoost algorithm. The model is trained on a dataset containing various features of cars, such as the make, model, year, mileage, fuel type, and other relevant factors.

## Dataset

The dataset used for this project consists of a collection of car listings, each with associated features and the corresponding price. The dataset is preprocessed to handle missing values, categorical variables, and feature scaling, ensuring the data is suitable for training the XGBoost model.  

Dataset link: https://www.kaggle.com/datasets/nehalbirla/vehicle-dataset-from-cardekho?select=car+data.csv  

## XGBoost Algorithm

XGBoost is an optimized gradient boosting algorithm that has gained popularity in machine learning competitions and has become a popular choice for predictive modeling tasks. It is known for its efficiency, accuracy, and flexibility. XGBoost combines multiple weak prediction models (decision trees) to create a strong ensemble model.

## Dependencies

The following dependencies are required to run the project:

- Python 3.x
- XGBoost
- NumPy
- Pandas
- Scikit-learn
- Streamlit

To install the required dependencies, you can use the following command:

```shell
pip install xgboost numpy pandas scikit-learn streamlit
```

## Usage
Clone the repository:
```shell
git clone https://github.com/your-username/car-price-prediction.git
```
Navigate to the project directory:
```shell
cd car-price-prediction
```
Install the dependencies:
```shell
pip install -r requirements.txt
```
Run the Streamlit app:
```shell
streamlit run app.py
```

Open your browser and go to http://localhost:8501 to access the car price prediction app.  

Or you can use the deployed project using the link: https://car-price-prediction-model.streamlit.app/  

## Disclaimer
The car price predictions provided by this project are based on a machine learning model and may not always accurately reflect the real market prices. The predictions should be used for reference purposes only, and actual car prices can vary due to various factors.
