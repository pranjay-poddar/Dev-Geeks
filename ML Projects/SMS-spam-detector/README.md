# SMS-spam-detector

This project aims to detect or classify the emails as spam or not-spam using machine learning techniques, specifically the Naive-Bayes algorithm. The model is trained on a dataset containing emails and another column of ham and spam, such as the model, 2 extra column which is handled in Data cleaning.

## Dataset

The dataset used for this project consists of a collection of all the emails/sms, each with associated tagret variable . The dataset is preprocessed to handle missing values, categorical variables, and feature scaling,tokenization, stemming, EDA,etc ensuring the data is suitable for training the naive bayes model.  

Dataset link: In the dataset folder(spam.csv)
## Multinomial Naive Bayes Algorithm

Multinomial Naive Bayes (MNB) is a popular machine learning algorithm for text classification problems in Natural Language Processing (NLP). It is particularly useful for problems that involve text data with discrete features such as word frequency counts. MNB works on the principle of Bayes theorem and assumes that the features are conditionally independent given the class variable.

## Dependencies

The following dependencies are required to run the project:

-streamlit==1.24.1
-scikit-learn==1.2.1
-pandas==1.5.3
-numpy==1.25.0
-nltk

To install the required dependencies, you can use the following command:

```shell
pip install nltk numpy pandas scikit-learn streamlit
```

## Usage
Clone the repository:
```shell
git clone https://github.com/your-username/laptop-price-predictor.git
```
Navigate to the project directory:
```shell
cd SMS-spam-detector
```
Install the dependencies:
```shell
pip install -r requirements.txt
```
Run the Streamlit app:
```shell
streamlit run app.py
```

Open your browser and go to http://localhost:8501/ to access the sms-spam-classifier app.  

