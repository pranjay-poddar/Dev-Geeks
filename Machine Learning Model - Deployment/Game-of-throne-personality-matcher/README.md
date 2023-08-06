# Game-of-thrones-personality-matcher
A t-sne implementation on Game-Of-Thrones dataset 

This project aims to find Similar Game of Thrones Character using Machine Learning and Visualizing High Dimensional Data.

## Dataset

Download the dataset from dataset file link(dataset are in csv and json format i.e. script-bag-of-words.json)

## PCA and t-SNE Algorithm

The main goal of PCA is to reduce the number of features (dimensions) in a dataset while retaining as much relevant information as possible. This is particularly useful in cases where datasets have a large number of features, making visualization and analysis challenging.

-> t-SNE stands for t-distributed Stochastic Neighbor Embedding. It is a machine learning technique used for dimensionality reduction and data visualization, particularly in cases where visualizing high-dimensional data is challenging. t-SNE is known for its ability to preserve the local structure and relationships between data points in the lower-dimensional space.

Unlike PCA, which focuses on preserving global variance, t-SNE is more effective at capturing the local relationships and clusters within the data. It is particularly useful when dealing with nonlinear data distributions.

## Dependencies

The following dependencies are required to run the project:

-streamlit
-scikit-learn
-t-sne
-PCA
-pandas
-numpy

To install the required dependencies, you can use the following command:

```shell
pip install PCA numpy pandas scikit-learn streamlit
```

## Usage
Clone the repository:
```shell
git clone https://github.com/your-username/Game-of-throne-personality-matcher.git
```
Navigate to the project directory:
```shell
cd Game-of-throne-personality-matcher
```
Install the dependencies:
```shell
pip install -r requirements.txt
```
Run the Streamlit app:
```shell
streamlit run app.py
```

Open your browser and go to http://localhost:8501/ to GOT Personality matcher.  

Or you can use the deployed project using the streamlit link.

