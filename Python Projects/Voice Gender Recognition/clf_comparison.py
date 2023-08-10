"""Compare different classifiers."""
import warnings

from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier

from data_process import *

warnings.filterwarnings("ignore")

clf_names = ('Nearest Neighbors', 'SVM', 'Decision Tree', 'Random Forest', 'Neural Net')  # classifier names
clfs = (KNeighborsClassifier(n_neighbors=100, weights='distance'), SVC(), DecisionTreeClassifier(),
        RandomForestClassifier(), MLPClassifier())  # classifier objects


def train_clf(x_train, y_train, clf):
    """
    Train classifier.
    :param x_train: Training inputs.
    :param y_train: Training outputs.
    :param clf: Untrained classifier object.
    :return: Trained classifier object.
    """
    clf.fit(x_train, y_train)  # train classifier

    return clf


def run():
    """
    main.
    :return: None
    """
    voice_data = read()  # read data
    x_train, x_test, y_train, y_test = preprocess(voice_data)  # preprocess data

    for clf_name, clf in zip(clf_names, clfs):  # for all classifiers
        clf = train_clf(x_train, y_train, clf)  # train classifier
        print()
        print(clf_name)
        get_accuracy(x_train, x_test, y_train, y_test, clf)  # print results


if __name__ == '__main__':
    run()
