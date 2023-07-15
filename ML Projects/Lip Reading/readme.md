The model in the link you provided is a deep learning model that can be used to recognize words from video. It is based on the LipNet architecture, which was first proposed in the paper "LipNet: A Unified Text-to-Speech Recognition Model" by Amodei et al. (2016).

The model is trained on a dataset of videos of people speaking. The videos are first converted to frames, and then each frame is processed by a convolutional neural network (CNN). The output of the CNN is then fed into a recurrent neural network (RNN), which is used to predict the next word in the sequence.

The model has been shown to be able to recognize words with a high degree of accuracy. In the paper, the model was able to achieve a word error rate (WER) of 20.5% on the LibriSpeech dataset. This is a significant improvement over previous models, which typically had WERs of 30% or higher.

The model is still under development, but it has the potential to be a powerful tool for a variety of applications, such as speech recognition, sign language recognition, and video surveillance.

Here are some of the steps that have been done in the model:

The first step is to extract the frames from the video. This can be done using a variety of methods, such as OpenCV or ffmpeg.
Once the frames have been extracted, they need to be pre-processed. This typically involves resizing the frames to a fixed size and converting them to grayscale.
The pre-processed frames are then fed into the CNN. The CNN extracts features from the frames that are relevant to the task of speech recognition.
The output of the CNN is then fed into the RNN. The RNN uses the features extracted by the CNN to predict the next word in the sequence.
The model is trained on a dataset of videos of people speaking. The dataset typically includes audio recordings of the people speaking, which can be used to help the model learn the relationship between the visual and audio features of speech.
Once the model is trained, it can be used to recognize words from new videos. This can be done by feeding the new videos into the model and predicting the next word in the sequence.
