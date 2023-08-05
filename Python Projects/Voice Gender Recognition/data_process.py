"""Contains functions for data processing"""
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder


def read(filename='voice.csv'):
    """
    Read data from file.

    :param filename:  Name of file containing data.
    :return: data.
    """
    data = None
    try:
        data = pd.read_csv(filename)  # read data from csv file
        print('\nReading data...')
    except FileNotFoundError:
        print('\nFile not found!')  # print error if file is absent

    return data


def scale(data):
    """
    Scale the data between -1 and 1.

    :param data: The data to be scaled.
    :return: Scaled data.
    """
    return (data - data.mean()) / (data.max() - data.min())


def preprocess(data):
    """
    Preprocess data.

    :param data: Data to be preprocessed.
    :return: x_train, y_train, x_test, y_test
    """
    print('\nPreprocessing data...')

    x = data.iloc[:, :-1]  # get inputs from data
    x = scale(x)  # scale inputs

    y = data.iloc[:, -1]  # get outputs
    y = LabelEncoder().fit_transform(y)  # encode label (female -> 0, male -> 1)

    # split into training and testing data with randomized order and return
    return train_test_split(x, y, train_size=.75, random_state=1)


def visualize(data, style='ggplot', graph_type='line'):
    """
    Visualize data.

    :param data: Data to visualize. (pandas dataframe)
    :param style: matplotlib style. def = 'ggplot'
    :param graph_type: Graph type ('line' or 'area'). def = 'line'
    :return: None
    """
    try:
        plt.style.use(style)
    except OSError:
        print('\nInvalid style!\nUsing ggplot\n')
        plt.style.use('ggplot')
    if graph_type == 'line':
        data.plot()
    elif graph_type == 'area':
        data.plot.area(stacked=False)
    else:
        print('\nInvalid type!\nUsing line')
        data.plot()
    plt.show()


def get_accuracy(x_train, x_test, y_train, y_test, clf):
    """
    Calculate and print training and testing accuracy.
    :param x_train: Training inputs.
    :param y_train: Training Outputs.
    :param x_test: Testing inputs.
    :param y_test: Testing outputs.
    :param clf: Trained classifier object.
    :return: None
    """
    print('\nTraining Results:')
    correct = 0
    for index in range(len(y_train)):
        temp=x_train.iloc[index,:]
        temp=np.array(temp).reshape((1,-1))
        predicted = clf.predict(temp)
        actual = y_train[index]
        if actual == predicted:
            correct += 1
    print('Accuracy = %.1f%%' % (correct / len(y_train) * 100))

    tp = tn = fp = fn = 0
    for index in range(len(y_test)):
        temp1=x_test.iloc[index,:]
        temp1=np.array(temp1).reshape((1,-1))
        predicted = clf.predict(temp1)
        actual = y_test[index]
        if actual == predicted == 0:
            tn += 1
        elif actual == predicted == 1:
            tp += 1
        elif actual == 0 != predicted:
            fp += 1
        else:
            fn += 1
    # print(tp, fp, tn, fn)
    accuracy = (tp + tn) / (tp + tn + fp + fn)
    precision = tp / (tp + fp)
    recall = tp / (tp + fn)
    specificity = tn / (tn + fp)
    print('\nTesting Results:')
    print('Accuracy  = %.1f%%' % (accuracy * 100))
    print('Precision   = %.1f%%' % (precision * 100))
    print('Recall      = %.1f%%' % (recall * 100))
    print('Specificity = %.1f%%' % (specificity * 100))
