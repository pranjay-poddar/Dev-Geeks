# Iris Flower Classification 

This repository contains the code and resources for training a machine learning model to classify Iris flowers into different species. The Iris flower dataset is a popular and well-known dataset in the machine learning community, often used for classification tasks.

## Dataset

The dataset used for this project is the Iris dataset, which consists of 150 samples of Iris flowers, each with four features: sepal length, sepal width, petal length, and petal width. The flowers belong to three different species: Setosa, Versicolor, and Virginica. The dataset is commonly used to demonstrate classification algorithms and techniques.

## Model

The machine learning model used for this project is a Support Vector Classifier (SVC). SVC is a powerful classification algorithm that finds the optimal hyperplane to separate different classes by maximizing the margin between the classes. It is effective for both linearly separable and non-linearly separable datasets.

The model is trained on the Iris dataset, where the features (sepal length, sepal width, petal length, and petal width) are used to predict the species of the flower. The dataset is split into training and testing sets to evaluate the model's performance.

## Code

The code for this project is organized as follows:

- `Iris_Flower_Classification.ipynb`: This Jupyter Notebook contains the code for data preprocessing, model training, and evaluation. It uses Python and popular machine learning libraries such as scikit-learn and pandas.

- `iris.csv`: This CSV file contains the Iris dataset used for training and testing the model. It includes the features (sepal length, sepal width, petal length, and petal width) and the corresponding species labels.

## Usage

To use this code and train the Iris flower classification model, follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies.
3. Open the `iris_classification.ipynb` notebook using Jupyter or any compatible environment.
4. Follow the instructions provided in the notebook to preprocess the data, train the SVC model, and evaluate its performance.
5. Experiment with different hyperparameters of the SVC model (e.g., kernel, C, gamma) to see how they affect the model's accuracy.

## Resources

- [Iris flower dataset on UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/datasets/iris)
- [scikit-learn documentation](https://scikit-learn.org/stable/documentation.html)
