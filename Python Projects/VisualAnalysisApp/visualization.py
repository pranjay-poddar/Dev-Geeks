import streamlit as st
import numpy as np
import pandas as pd
import plotly.express as px
st.title("Hello")
st.sidebar.header("Data Visualization Settings")
st.subheader("Here's Your Dataset -")
uploaded_file=st.sidebar.file_uploader(label="Upload your CSV file", type=['csv'])
df=pd.DataFrame([1,2,3])
if uploaded_file is not None:
    df=pd.read_csv(uploaded_file)
    st.write(df)
selectchart=st.sidebar.selectbox(
    label="Select the Chart Type",
    options=['None','Line Plots','Scatter Plots','Histogram Plots','Bar Plots','Box Plots','Violin Plots']
)
lst=df.columns
if selectchart=='Line Plots':
    st.sidebar.subheader("Line Plots Features")
    selectx=st.sidebar.selectbox('X axis',options=lst)
    selecty=st.sidebar.selectbox('Y axis',options=lst)
    variation=st.sidebar.selectbox('Enter Feature for Color Variation',options=lst)
    plot1=px.line(df,x=selectx,y=selecty,color=variation)
    st.plotly_chart(plot1)
elif selectchart=='Scatter Plots':
    st.sidebar.subheader("Scatter Plot Features")
    selectx=st.sidebar.selectbox('X axis',options=lst)
    selecty=st.sidebar.selectbox('Y axis',options=lst)
    variation=st.sidebar.selectbox('Enter Feature for Color Variation',options=lst)
    plot2=px.scatter(df,x=selectx,y=selecty,color=variation)
    st.plotly_chart(plot2)
elif selectchart=='Histogram Plots':
    st.sidebar.subheader("Histogram Plot Features")
    selectx=st.sidebar.selectbox('X axis',options=lst)
    selecty=st.sidebar.selectbox('Y axis',options=lst)
    variation=st.sidebar.selectbox('Enter Feature for Color Variation',options=lst)
    plot3=px.histogram(df,x=selectx,y=selecty,color=variation)
    st.plotly_chart(plot3)
elif selectchart=='Bar Plots':
    st.sidebar.subheader("Bar Plot Features")
    selectx=st.sidebar.selectbox('X axis',options=lst)
    selecty=st.sidebar.selectbox('Y axis',options=lst)
    variation=st.sidebar.selectbox('Enter Feature for Color Variation',options=lst)
    plot4=px.bar(df,x=selectx,y=selecty,color=variation)
    st.plotly_chart(plot4)
elif selectchart=='Box Plots':
    st.sidebar.subheader("Box Plot Features")
    selectx=st.sidebar.selectbox('X axis',options=lst)
    selecty=st.sidebar.selectbox('Y axis',options=lst)
    variation=st.sidebar.selectbox('Enter Feature for Color Variation',options=lst)
    plot5=px.box(df,x=selectx,y=selecty,color=variation)
    st.plotly_chart(plot5)
elif selectchart=='Violin Plots':
    st.sidebar.subheader("Box Plot Features")
    selectx=st.sidebar.selectbox('X axis',options=lst)
    selecty=st.sidebar.selectbox('Y axis',options=lst)
    variation=st.sidebar.selectbox('Enter Feature for Color Variation',options=lst)
    plot6=px.violin(df,x=selectx,y=selecty,color=variation)
    st.plotly_chart(plot6)