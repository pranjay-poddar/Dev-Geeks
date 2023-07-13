import numpy as np
import pickle
import streamlit as st
from sklearn.preprocessing import StandardScaler



# loading the saved model
loaded_model = pickle.load(open('trained_model.sav', 'rb'))

scaler=StandardScaler()

# creating a function for prediction
def parkinsonPredict(input_data):

    input_data_as_numpy_array = np.array(input_data)

    input_data_reshape = input_data_as_numpy_array.reshape(1, -1)

    scaler.fit(input_data_reshape)

    std_data = scaler.transform(input_data_reshape)


    prediction = loaded_model.predict(std_data)


    if (prediction[0] == 0):
        return "The Person does not have Parkinson's Disease"

    else:
        return  "The Person has Parkinson's Disease"

def main():
    st.title("Parkinson's Disease Detector")

    # Display a form for users to input data

    st.write(" ")
    st.write("<h3>Enter some biomedical voice measurements to predict whether or not a person has Parkinson's Disease.</h3>", unsafe_allow_html=True)

    st.write(" ")

    fo = st.number_input("Average vocal fundamental frequency(Hz):", value=0.00)
    fhi = st.number_input("Maximum vocal fundamental frequency(Hz):", value=0.00)
    flo = st.number_input("Minimum vocal fundamental frequency:", value=0.000)

    st.write(" ")

    st.write("<h4>Enter some measures of variation in fundamental frequency</h4>", unsafe_allow_html=True)

    st.write(" ")

    jitter_percent = st.number_input("Multi-Dimensional Voice Program Jitter(%):", value=0.0000)
    jitter_abs = st.number_input("Multi-Dimensional Voice Program Jitter(Abs):", value=0.0000)
    rap = st.number_input("Multi-Dimensional Voice Program Relative Amplitude Perturbation:", value=0.0000)
    ppq = st.number_input("Multi-Dimensional Voice Program five-point Period Perturbation Quotient:", value=0.0000)
    jitter_ddp = st.number_input("Average absolute difference of differences between jitter cycles:", value=0.0000)

    st.write(" ")

    st.write("<h4>Enter some measures of variation in amplitude</h4>", unsafe_allow_html=True)

    st.write(" ")

    shimmer = st.number_input("Multi-Dimensional Voice Program Shimmer:", value=0.0000)
    shimmer_db = st.number_input("Multi-Dimensional Voice Program Shimmer(dB):", value=0.000)
    apq3 = st.number_input("Three-point Amplitude Perturbation Quotient:", value=0.0000)
    apq5 = st.number_input("Five-point Amplitude Perturbation Quotient:", value=0.0000)
    apq=st.number_input("Amount of Aphomorphine: ",value=0.0000)
    dda = st.number_input("MDVP 11-point Amplitude Perturbation Quotient:", value=0.0000)

    st.write(" ")

    st.write("<h4>Enter the measures of ratio of noise to tonal components in the voice</h4>", unsafe_allow_html=True)

    st.write(" ")

    nhr = st.number_input("Noise-to-harmonics ratio:", value=0.0000)
    hnr = st.number_input("Harmonics-to-noise ratio:", value=0.000)

    st.write(" ")

    st.write("<h4>Enter the nonlinear dynamical complexity measures</h4>", unsafe_allow_html=True)

    st.write(" ")


    rpde = st.number_input("Recurrence Period Density Entropy measure:", value=0.0000)
    d2 = st.number_input("Correlation Dimension:", value=0.0000)

    st.write(" ")

    dfa = st.number_input("Signal fractal scaling exponent of Detrended Fluctuation Analysis:", value=0.0000)

    st.write(" ")

    st.write("<h4>Enter the nonlinear measures of fundamental frequency variation</h4>", unsafe_allow_html=True)

    st.write(" ")

    spread1 = st.number_input("Two nonlinear measures of fundamental:", value=0.0000)
    spread2 = st.number_input("Frequency variation:", value=0.0000)
    ppe = st.number_input("Pitch Period Entropy:", value=0.0000)

    # Make a prediction based on user input
    input_data = [fo, fhi, flo, jitter_percent, jitter_abs, rap, ppq, jitter_ddp, shimmer, shimmer_db, apq3, apq5, apq,dda, nhr, hnr,
         rpde, dfa, spread1, spread2, d2, ppe]
    if st.button("Predict"):
        prediction = parkinsonPredict(input_data)
        st.write(prediction)

if __name__=='__main__':
    main()