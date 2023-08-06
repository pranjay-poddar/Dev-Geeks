# Book Recommender System Project

This project aims to Building a collaborative filtering book recommendation system involves using user-item interaction data (e.g., user ratings) to identify similar users and recommend books based on the preferences of those similar users. Here's a step-by-step guide to creating a user-based collaborative filtering book recommendation system using Python:
## Dataset

The dataset used for this project consists of a collection of Books are identified by their respective ISBN. Invalid ISBNs have already been removed from the dataset. Moreover, some content-based information is given (Book-Title, Book-Author, Year-Of-Publication, Publisher), obtained from Amazon Web Services. 

The dataset is preprocessed to handle missing values, categorical variables, and feature scaling, ensuring the data is suitable for training the recommendation model.  

Dataset link: https://www.kaggle.com/datasets/arashnic/book-recommendation-dataset
## Algorithm

Collaborative filtering is a popular technique used in recommendation systems to make personalized recommendations to users based on the preferences of similar users. Collaborative filtering methods rely on user-item interactions or user-item ratings to identify patterns and recommend items that similar users have shown interest in.

There are two main types of collaborative filtering approaches:

1.User-Based Collaborative Filtering:

Identify users who have similar item preferences to the target user.
Recommend items that similar users have liked or rated highly.

2.Item-Based Collaborative Filtering:

Identify items that are similar to the ones the target user has liked or rated highly.
Recommend similar items to the target user.

->Similarity Calculation:

Calculate similarity between users based on their interactions or ratings.
Common similarity metrics include cosine similarity, Pearson correlation, or Jaccard similarity.

## Dependencies

The following dependencies are required to run the project:

-streamlit
-scikit-learn
flask
numpy
pandas
gunicorn


To install the required dependencies, you can use the following command:

```shell
pip install requirements
```

## Usage
Clone the repository:
```shell
git clone https://github.com/your-username/book-recommender-system.git
```
Navigate to the project directory:
```shell
cd book-recommender-system
```
Install the dependencies:
```shell
pip install -r requirements.txt
```
Run the Streamlit app:
```shell
streamlit run app.py
```

Open your browser and go to http://localhost:8501/ to access the book-recommender-system app.



## Disclaimer
The book-recommender-system provided by this project are based on a ml model and may not always accurately reflect the real book secenerios. The predictions should be used for reference purposes only.