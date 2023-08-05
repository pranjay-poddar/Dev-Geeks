"""Train and validate neural net"""
import pickle
import warnings

from sklearn.neural_network import MLPClassifier

from data_process import *

warnings.filterwarnings("ignore")


def train_neural_net(x_train, y_train):
    """
    Train and save neural net.
    :param x_train: Training inputs.
    :param y_train: Training outputs.
    :return: Trained neural_net
    """
    print('\nTraining neural net...')
    neural_net = MLPClassifier()
    # (hidden_layer_sizes=(40, 40), activation='identity', solver='sgd',
    #                        learning_rate='adaptive', max_iter=2000, verbose=True)
    neural_net.fit(x_train, y_train)  # train neural net

    # print(neural_net.coefs_)

    print('\nSaving trained neural net to file...')
    pickle.dump(neural_net, open('trained_neural_net', 'wb'))

    visualize(pd.Series(neural_net.loss_curve_), graph_type='area')  # plot loss curve

    return neural_net


def run():
    """
    main.
    :return: None
    """
    voice_data = read()  # read data

    x_train, x_test, y_train, y_test = preprocess(voice_data)  # preprocess data

    trained_neural_net = train_neural_net(x_train, y_train)  # train neural net

    print('\nCalculating accuracy...\n')
    get_accuracy(x_train, x_test, y_train, y_test, trained_neural_net)  # print results


if __name__ == '__main__':
    run()
