# Restaurant Recommendation System

This repository contains a restaurant recommendation system model based on the Zomato Bangalore dataset. The system utilizes various techniques and algorithms to provide personalized restaurant recommendations to users. Below is an overview of the different components and functionalities of the system.

## Data

The restaurant recommendation system utilizes the Zomato Bangalore dataset as the primary data source. The dataset includes information on cuisines, 
areas, timings, home delivery, dine-in options, reviews, and average cost.

## Dependencies

The following libraries and tools are required to run the recommendation system:
- NumPy
- pandas
- seaborn
- matplotlib

Make sure these dependencies are installed before running the system.

## Exploratory Data Analysis

The system performs exploratory data analysis (EDA) on the dataset. This includes generating a correlation matrix to identify relationships between 
different variables and creating histograms to visualize the distribution of data.

## Restaurant Wise Average Cost

The system provides insights into the average cost of restaurants. It analyzes the dataset to determine the average cost of each restaurant and 
presents this information to users.

## Cuisines Famous in Different Localities

The system identifies the cuisines that are popular in different localities. By analyzing the dataset, it identifies the most common cuisines in each locality and provides this information to users.

## General Review

Users can access general reviews of restaurants through the recommendation system. It utilizes the review data available in the dataset to provide an 
overview of the restaurants' overall quality and user experiences.

## Popularity-Based Recommendation Systems

The system incorporates a popularity-based recommendation algorithm. This algorithm recommends popular restaurants based on their overall trend and 
popularity among users.

## Content-Based Recommendation Systems

The recommendation system includes a content-based filtering algorithm. This algorithm generates recommendations based on a description of the restaurant 
and a profile of the user's preferences. It is suitable when there is known data on the restaurant but limited information on the user.

## TF-IDF Vectorizer

The system utilizes the TF-IDF (Term Frequency-Inverse Document Frequency) vectorizer. This technique measures the originality of words by comparing the 
frequency of a word in a document with the number of documents the word appears in. It is used to process textual data and enhance the recommendation system's accuracy.
