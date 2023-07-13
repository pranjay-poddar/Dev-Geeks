# Clean vs Messy

The "Clean vs Messy" classification task aims to distinguish between images that depict clean and organized environments versus those that represent messy
and cluttered spaces. By training a neural network on a dataset of labeled images, the model can learn to recognize visual patterns and features indicative
of cleanliness or messiness.

## Steps followed:

### 1. Importing the required libraries:
TensorFlow and its Keras module for building and training neural networks.
Matplotlib for visualizing images and plots.
IPython.display for displaying HTML content.
### 2. Defining constants:
BATCH_SIZE represents the number of images to be processed in each batch during training.
IMAGE_SIZE defines the desired size for input images.
CHANNELS specifies the number of color channels in the images (RGB has 3 channels).
EPOCHS represents the number of training epochs (iterations).
### 3. Loading the dataset:
tf.keras.preprocessing.image_dataset_from_directory() is used to load images from a directory.
The function takes parameters such as directory path, seed for shuffling, image size, and batch size.
The dataset is stored in the dataset variable.
### 4. Retrieving class names:
The class_names variable is assigned the class names extracted from the dataset.
### 5. Displaying sample images:
The code displays a grid of 12 images from the dataset along with their corresponding labels.
This is done using Matplotlib's plt.imshow() and plt.title() functions.
### 6. Partitioning the dataset:
The dataset is split into training, validation, and test sets using the get_dataset_partitions_tf() function.
The function takes the dataset and the desired split percentages as parameters.
The training set is assigned to train_ds, the validation set to val_ds, and the test set to test_ds.
### 7. Preparing the datasets for training:
The training, validation, and test datasets are cached, shuffled, and prefetched to optimize data loading.
tf. data. Dataset methods like cache(), shuffle(), and prefetch() are used.
### 8. Data augmentation:
Data augmentation is performed to increase the dataset's diversity and improve model generalization.
The data_augmentation sequence applies random flips and rotations to the images.
### 9. Model architecture:
The model is built using the Sequential API of Keras.
It consists of a series of convolutional (Conv2D) and max-pooling (MaxPooling2D) layers.
The convolutional layers extract features from the input images.
The final layers are a flattened layer, a dense layer with ReLU activation, and a dense layer with softmax activation for multi-class classification.
### 10. Model compilation:
The model is compiled with the Adam optimizer, sparse categorical cross-entropy loss, and accuracy metric.
### 11. Model training:
The fit() function is called to train the model on the training data.
Parameters include the training data, batch size, validation data, verbosity, and the number of epochs.
The training history is stored in the history variable.
### 12. Model evaluation:
The evaluate() function is used to evaluate the model's performance on the test dataset.
The evaluation results (loss and accuracy) are stored in the scores variable.
### 13. Predicting single images:
A function predict() is defined to predict the class of a single image.
It takes the model and an image as input, preprocesses the image, and returns the predicted class and confidence.
### 14. Visualizing predictions:
The code selects a batch of images from the test dataset and visualizes their actual and predicted classes using the predict() function.
### 15. Saving the model:
The trained model is saved to a directory using the save() function.
### 16. Installing Gradio:
Gradio is installed using the pip install command.
### 17. Creating a Gradio interface:
A Gradio interface is created to allow interactive image classification using the trained model.
The predict_image() function is defined to preprocess and predict the class probabilities for an input image.
The interface specifies an input image and a label as outputs, and it launches the interface when executed.
