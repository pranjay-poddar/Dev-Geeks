# Iris Flower Classification Machine Learning

This repository contains the code and resources for training a machine learning model to classify Iris flowers into different species. The Iris flower dataset is a popular and well-known dataset in the machine learning community, often used for classification tasks.The Iris flower data set is a specific set of information compiled by Ronald Fisher, a biologist, in the 1930s. It describes particular biological characteristics of various types of Iris flowers, specifically, the length and width of both pedals and the sepals, which are part of the flower’s reproductive system.
![image](https://github.com/Enhancer18/Dev-Geeks/assets/102911149/3a44175f-59ac-457d-91d9-fead2eb2b36a)

## Dataset

The dataset used for this project is the Iris dataset, which consists of 150 samples of Iris flowers, each with four features: sepal length, sepal width, petal length, and petal width. The flowers belong to three different species: Setosa, Versicolor, and Virginica. The dataset is commonly used to demonstrate classification algorithms and techniques.

## Model

The machine learning model used for this project is a **Support Vector Machine (SVM)** classifier. SVM is a powerful algorithm that creates a hyperplane to separate different classes by maximizing the margin between the nearest data points of different classes.

The model is trained on the Iris dataset, where the features (sepal length, sepal width, petal length, and petal width) are used to predict the species of the flower. The dataset is split into training and testing sets to evaluate the model's performance.

## Code

The code for this project is organized as follows:

- `iris_Flower_classification.ipynb`: This Jupyter Notebook contains the code for data preprocessing, model training (using SVC), and evaluation. It uses Python and popular machine learning libraries such as scikit-learn and pandas.

- `iris.csv`: This CSV file contains the Iris dataset used for training and testing the model. It includes the features (sepal length, sepal width, petal length, and petal width) and the corresponding species labels.

![image](https://github.com/Enhancer18/Dev-Geeks/assets/102911149/9fa705ec-b51b-4e7e-a7b3-7f0f21e48953)

## Usage

To use this code and train the Iris flower classification model using SVC, follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies.
3. Open the `iris_flower_classification.ipynb` notebook using Jupyter or any compatible environment.
4. Follow the instructions provided in the notebook to preprocess the data, train the SVC model, and evaluate its performance.
5. Experiment with different hyperparameters of the SVC model (e.g., kernel, C, gamma) to see how they affect the model's accuracy.

Feel free to modify the code, explore different machine learning algorithms, or apply additional techniques to enhance the model's performance.

## Resources

- [Iris flower dataset](https://www.kaggle.com/datasets/uciml/iris)
