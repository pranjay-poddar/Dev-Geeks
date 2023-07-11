# **Automated Image Categorization and Object Recognition**
The Image Classification project is a Python-based machine learning project that demonstrates the classification of images into predefined categories using deep learning techniques. The project utilizes a convolutional neural network (CNN) to learn features from input images and make predictions on unseen data.


## Prerequisites
Before running the script, ensure you have the following dependencies installed:

- Python 3.x
- TensorFlow library
- Keras library

## Usage 
1. Prepare your image: Ensure you have an image file that you want to classify. Supported image formats include JPEG, PNG, and BMP.

2. Update the image path: In the script, locate the image_path variable and replace "image.jpg" with the path to your image file.

3. Run the script: Execute the script using the following command: `python image_classification.py`

4. View the predictions: The script will display the top 3 predictions for the image, along with their respective labels and confidence scores.

## Model 

The project uses the pre-trained MobileNetV2 model, which is a popular CNN architecture for image classification. The model is loaded with pre-trained weights from the ImageNet dataset, which enables it to classify images into a wide range of categories.

