# quora-question-pairs-detector
A NLP project to find weather given 2 questions are same are not semantically speaking.

Dataset Link - https://www.kaggle.com/c/quora-question-pairs
Download the datasetfrom above kaggle link .

## The following steps have been taken: 

Step 1: Data Cleaning - looking for null/ duplicate values, removing unnecessary columns, etc.

Step 2: Exploratory Data Analysis - Comparing the realtion of price with each of the other aspects like RAM, weight, Company, Type etc and making 
correlation matrix. 

Step 3: Feature Engineering - Extracting multiple columns from a single column, by taking only the necessary information. 

Step 4: Training and testing model - Training and testing the data by splitting the majority section of data in training and the rest for testing. 

Step 5: Calculating the MAE & R2Score of various models that have been used 


## The list of the models used - 

1) Linear regression
2) Ridge Regression
3) Lasso Regression
4) KNN 
5) Decision Tree
6) Random Forest 
7) Gradient Boost 
8) XgBoost 

## Dependencies

The following dependencies are required to run the project:

-streamlit==1.24.1
-scikit-learn==1.2.1
-xgboost==1.7.6
-pandas==1.5.3
-numpy==1.25.0

To install the required dependencies, you can use the following command:

```shell
pip install logistic regression xgboost numpy pandas scikit-learn streamlit
```

## Usage
Clone the repository:
```shell
git clone https://github.com/your-username/quora-question-pairs-detector.git
```
Navigate to the project directory:
```shell
cd quora-question-pairs-detector
```
Install the dependencies:
```shell
pip install -r requirements.txt
```
Run the Streamlit app:
```shell
streamlit run app.py
```

Open your browser and go to http://localhost:8501/ to access the quora-question-pairs-detector app.  


