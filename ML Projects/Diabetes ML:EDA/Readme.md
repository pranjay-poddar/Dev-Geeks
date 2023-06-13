# ML Diabetes Project

This project focuses on predicting diabetes using machine learning techniques and performing exploratory data analysis (EDA).

## Dataset

The dataset used in this project is [Diabetes Dataset] on Kaggle. The target variable is whether a patient has diabetes or not.

## Exploratory Data Analysis (EDA)

To better understand the dataset, we performed exploratory data analysis. Some of the key steps and insights from the EDA process include:

- Data preprocessing: Cleaning the data, handling missing values, and removing duplicates.
- Feature analysis: Analyzing the distribution of features, identifying outliers, and checking for correlations.
- Visualization: Creating various plots, such as histograms, scatter plots, and box plots, to visualize the data and identify patterns.

## Classifier Models

We utilized five different classifier models to predict diabetes based on the given dataset. The models used are:

```
1. Logistic Regression:
2. Gradient Bossting Classifier:
3. Random Forest Classifier: 
4. XGBoost Classifier: 
5. Decision Tree Classifier: 
```

For each model, we performed the following steps:

1. **Data preprocessing**: Scaling features, splitting the dataset into training and testing sets.
2. **Feature engineering**: Exploring additional features or transforming existing ones to improve model performance.
3. **Model training**: Fitting the model on the training data.
4. **Model evaluation**: Evaluating the model's performance using metrics such as accuracy, precision, recall, and F1-score.
5. **Results and comparison**: Comparing the performance of all six models and identifying the most effective one for diabetes prediction.
6. **Hyperparameter tuning**: Fine-tuning the parameters of the best-performing model to optimize its performance.

## Results

After evaluating the models, we found that **XGBoost Classifier** achieved the highest accuracy of **90.9%** . It outperformed the other models in terms of precision, recall, and F1-score as well.

## Conclusion

In this project, we successfully built and evaluated six different classifier models to predict diabetes. The best-performing model can be used as a reliable tool for early diabetes detection. The EDA process helped us gain valuable insights into the dataset and understand the relationships between features.

## Future Work

Potential areas for future work on this project include:

- Ensemble methods: Exploring ensemble methods, such as bagging or boosting, to further enhance the predictive capabilities.


