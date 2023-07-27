# IPL-Win-Probability-Predictor

This project aims to predict the winning of ipl teams using machine learning techniques, specifically the logistic regression algorithm. The model is trained on a dataset containing various features of ipl matches dataset, such as the batting team, bowling team, city, runs_left, balls_left, and other relevant factors.

## Dataset

The dataset used for this project consists of a collection of all the ipl matches, each with associated features and win rate. The dataset is preprocessed to handle missing values, categorical variables, and feature scaling, ensuring the data is suitable for training the logistic regression linear-model.  

Dataset link: In the dataset folder(deliveries.csv) , (matches.csv)
## Algorithm

logistic-Regression:- the logistic model (or logit model) is a statistical model that models the probability of an event taking place by having the log-odds for the event be a linear combination of one or more independent variables.

Utilising machine learning algorithms such as Random Forest Classifier (RFC), Logistic Regression, and we have suggested a model for predicting the results of the IPL matches. The accuracy of the Random Forest algorithm, which is 88.10%,

## Dependencies

The following dependencies are required to run the project:

-streamlit==1.24.1
-scikit-learn==1.2.1
-xgboost==1.7.6
-pandas==1.5.3
-numpy==1.25.0

To install the required dependencies, you can use the following command:

```shell
pip install logistic regression numpy pandas scikit-learn streamlit
```

## Usage
Clone the repository:
```shell
git clone https://github.com/your-username/IPL-Win-Probability-prediction.git
```
Navigate to the project directory:
```shell
cd IPL-Win-Probability-prediction
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

Or you can use the deployed project using the link: https://ipl-win-probability-prediction-h8vb99du63h-kanishkasah.streamlit.app/

## Disclaimer
The model provided by this project are based on a machine learning model Accuracy of 80.6% and may not always accurately reflect the real win probability. The predictions should be used for reference purposes only.