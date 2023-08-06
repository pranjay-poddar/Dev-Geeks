import streamlit as st
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder

data = pd.read_csv("heart .csv")

X = data.drop('target', axis=1)
y = data['target']

categorical_features = ['sex']
categorical_transformer = Pipeline(steps=[
    ('onehot', OneHotEncoder(drop='first'))
])

preprocessor = ColumnTransformer(
    transformers=[
        ('cat', categorical_transformer, categorical_features)
    ],
    remainder='passthrough'
)

pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', DecisionTreeClassifier())
])

pipeline.fit(X, y)

def predict_target(age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal):
    input_data = pd.DataFrame({
        'age': [age],
        'sex': [sex],
        'cp': [cp],
        'trestbps': [trestbps],
        'chol': [chol],
        'fbs': [fbs],
        'restecg': [restecg],
        'thalach': [thalach],
        'exang': [exang],
        'oldpeak': [oldpeak],
        'slope': [slope],
        'ca': [ca],
        'thal': [thal]
    })
    prediction = pipeline.predict(input_data)
    return prediction[0]

def main():
    st.title('Heart Attack Risk Prediction App')

    age = st.slider('Age', min_value=20, max_value=100, value=40)
    sex = st.radio('Sex', ['male', 'female'])
    cp = st.slider('Chest Pain Type (cp)', min_value=0, max_value=3, value=1)
    trestbps = st.slider('Resting Blood Pressure (trestbps)', min_value=90, max_value=200, value=120)
    chol = st.slider('Serum Cholesterol (chol)', min_value=100, max_value=600, value=200)
    fbs = st.checkbox('Fasting Blood Sugar > 120 mg/dl (fbs)')
    restecg = st.selectbox('Resting Electrocardiographic Results (restecg)', [0, 1, 2])
    thalach = st.slider('Maximum Heart Rate Achieved (thalach)', min_value=50, max_value=250, value=150)
    exang = st.checkbox('Exercise Induced Angina (exang)')
    oldpeak = st.slider('ST Depression Induced by Exercise Relative to Rest (oldpeak)', min_value=0.0, max_value=6.0, value=2.0)
    slope = st.selectbox('Slope of the ST Segment (slope)', [0, 1, 2])
    ca = st.slider('Number of Major Vessels Colored by Fluoroscopy (ca)', min_value=0, max_value=4, value=0)
    thal = st.selectbox('Thalassemia (thal)', [0, 1, 2, 3])

    sex_encoded = 1 if sex == 'male' else 0

    if st.button('Predict'):
        prediction = predict_target(age, sex_encoded, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal)
        if prediction == 0:
            st.write('At a risk of heart attack')
        else:
            st.write('no risk')

if __name__ == '__main__':
    main()
