# House Price Prediction using Linear Regression

This project aims to predict house prices based on various features using linear regression.

## Dataset

The dataset used for this project can be found on Kaggle under the name "House Price Prediction-Python" It contains a comprehensive set of features describing various aspects of residential houses, such as the number of bedrooms, overall condition, and size of the property. The dataset also provides the corresponding sale prices for each house. The dataset can be downloaded from the following link: [Kaggle Dataset](https://www.kaggle.com/code/sociopath00/house-price-prediction-python/input)

## Dependencies

To run this project, the following dependencies are required:

- Python 3.6 or above
- NumPy
- Pandas
- Matplotlib
- Scikit-learn

You can install the required packages using pip:

```
pip install numpy pandas matplotlib scikit-learn
```

## Usage

1. Download the dataset from the provided Kaggle link and save it in the project directory.

2. Run the `house_price_prediction.ipynb` file, which contains the code for data preprocessing, model training, and evaluation.

3. The script will load the dataset, split it into training and testing sets, preprocess the data, train a linear regression model, and evaluate its performance.

4. After the model training is completed, it will predict house prices for the testing set and display the evaluation metrics such as mean absolute error, mean squared error, and R-squared score.

## Regression Evaluation Metrics

Here are three common evaluation metrics for regression problems:
Mean Absolute Error (MAE) is the mean of the absolute value of the errors:
![alt text](https://render.githubusercontent.com/render/math?math=%5Cfrac%201n%5Csum_%7Bi%3D1%7D%5En%7Cy_i-%5Chat%7By%7D_i%7C&mode=display)

Mean Squared Error (MSE) is the mean of the squared errors:
![alt text](https://render.githubusercontent.com/render/math?math=%5Cfrac%201n%5Csum_%7Bi%3D1%7D%5En%28y_i-%5Chat%7By%7D_i%29%5E2&mode=display)

Root Mean Squared Error (RMSE) is the square root of the mean of the squared errors:
![alt text](https://render.githubusercontent.com/render/math?math=%5Csqrt%7B%5Cfrac%201n%5Csum_%7Bi%3D1%7D%5En%28y_i-%5Chat%7By%7D_i%29%5E2%7D&mode=display)

Comparing these metrics:

- MAE is the easiest to understand because it’s the average error.
- MSE is more popular than MAE because MSE “punishes” larger errors, which tends to be useful in the real world.
- RMSE is even more popular than MSE because RMSE is interpretable in the “y” units.

## Results

The results of the house price prediction are displayed after the model training and evaluation. These results include the evaluation metrics and can be used to assess the accuracy and performance of the linear regression model.

## License

The dataset used in this project is subject to the licensing terms provided by Kaggle. Please refer to the dataset's license for more details.

## Contributing

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

---
