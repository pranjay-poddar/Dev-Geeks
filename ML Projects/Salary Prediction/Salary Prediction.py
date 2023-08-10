#!/usr/bin/env python
# coding: utf-8

# # Salary Prediction

# Given a dataset which captures gross salary from 2013 to 2014 and includes only those employees who were employed on june 2013. Predict the salary for employees.

# In[1]:


import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

get_ipython().run_line_magic('matplotlib', 'inline')


# In[2]:


df = pd.read_csv('trainfile.csv')


# In[3]:


df.head()


# In[4]:


df.info()


# In[5]:


df.describe()


# ## Data Preprocessing

# In[6]:


df.isnull().sum()


# In[7]:


salary = df.copy()


# In[8]:


salary.columns


# In[9]:


salary.columns = salary.columns.str.strip()


# In[10]:


salary.columns


# In[11]:


salary = salary.dropna(subset=['HireDate'])


# In[12]:


salary = salary.drop('GrossPay', axis=1)


# In[13]:


salary.isnull().sum()


# In[14]:


salary.info()


# In[15]:


salary.head()


# In[16]:


salary['AnnualSalary'] = salary['AnnualSalary'].apply(lambda x: float(str(x)[1:]))


# In[17]:


salary.head()


# In[18]:


salary['Day'] = pd.DatetimeIndex(salary['HireDate']).day


# In[19]:


salary['Month'] = pd.DatetimeIndex(salary['HireDate']).month


# In[20]:


salary['Year'] = pd.DatetimeIndex(salary['HireDate']).year


# In[21]:


salary.head()


# In[22]:


salary.JobTitle.value_counts()


# In[23]:


salary.AgencyID.value_counts()


# In[24]:


salary.Agency.value_counts()


# In[25]:


salary.HireDate.value_counts()


# In[26]:


salary.AnnualSalary.value_counts()


# In[27]:


salary.AnnualSalary.plot.box()


# In[28]:


salary.AnnualSalary.describe()


# In[29]:


salary = salary[salary['AnnualSalary']<140000]


# In[30]:


salary.AnnualSalary.plot.box()


# ## Exploratory Data Analysis

# In[31]:


sns.histplot(salary.AnnualSalary)
plt.title('Annual Salary Distrbution')


# In[32]:


salary.groupby(['JobTitle']).count()


# **Top 10 jobs for being hired?**

# In[33]:


plt.figure(figsize = (10, 5))
salary.JobTitle.value_counts().sort_values(ascending=False).head(10).plot.bar()
plt.title('Top 10 Jobs')
plt.xlabel('Jobs')
plt.ylabel('Number of employees')
plt.show()


# **Top 10 Jobs that fetch highest salary?**

# In[34]:


plt.figure(figsize=(10, 5))
salary.groupby(['JobTitle'])['AnnualSalary'].mean().sort_values(ascending=False).head(10).plot.bar()
plt.title('Top 10 Jobs with highest Salary')
plt.xlabel('Jobs')
plt.ylabel('Salary')
plt.show()


# **How many jobs pay higher than the overall average salary?**

# In[35]:


mean_sal = salary.AnnualSalary.mean()


# In[36]:


x = salary.groupby(['JobTitle'])['AnnualSalary'].mean().reset_index()


# In[37]:


x[x['AnnualSalary'] > mean_sal]['JobTitle'].count()


# In[38]:


salary.shape


# In[39]:


salary['Agency'] = salary['Agency'].apply(lambda x : str(x).strip().replace("  "," "))


# **Top 10 agencies that have hired higher number of employees?**

# In[40]:


plt.figure(figsize = (10, 5))
salary.AgencyID.value_counts().sort_values(ascending=False).head(10).plot.bar()
plt.title('Top 10 agencies with more hiring')
plt.xlabel('Agencies')
plt.ylabel('Hired Employees')
plt.show()


# **Which AgencyId has higher number of people working?**

# In[41]:


plt.figure(figsize = (10, 5))
salary.AgencyID.value_counts().sort_values(ascending=False).head(10).plot.bar()
plt.title('AgencyId & number of employees')
plt.xlabel('AgencyId')
plt.ylabel('Number of employees')
plt.show()


# **Pattern between Year & Salary?**

# In[42]:


plt.figure(figsize = (10, 5))
sns.lineplot(x = salary['Year'], y = salary['AnnualSalary'])


# **Latest Trend in Salary?**

# In[43]:


plt.figure(figsize = (10, 5))
salary.groupby(['Year'])['AnnualSalary'].mean().tail(10).plot.bar()


# **Months have any impact on Salary?**

# In[44]:


plt.figure(figsize = (10, 5))
salary.groupby(['Month'])['AnnualSalary'].mean().plot.bar()


# **Months with more hiring?**

# In[45]:


plt.figure(figsize = (10, 5))
salary.Month.value_counts().plot.bar()


# ### Multivariate Analysis

# In[46]:


sns.pairplot(salary)


# In[47]:


sns.heatmap(salary.corr(), annot=True)


# # Feature Engineering

# **Average annual salary of a job**

# In[48]:


mean_sal = salary.groupby('JobTitle')['AnnualSalary'].mean()


# In[49]:


mean_sal


# In[50]:


salary['Mean Salary'] = salary.JobTitle.map(mean_sal)


# In[51]:


salary.head()


# **Average annual salary of an AgencyID**

# In[52]:


mean_agency_id = salary.groupby('AgencyID')['AnnualSalary'].mean()


# In[53]:


mean_agency_id


# In[54]:


salary['Mean AgencyID'] = salary.AgencyID.map(mean_agency_id)


# In[55]:


salary.head()


# **Average annual salary of an Agency**

# In[56]:


mean_agency = salary.groupby('Agency')['AnnualSalary'].mean()


# In[57]:


mean_agency


# In[58]:


salary['Mean Agency'] = salary.Agency.map(mean_agency)


# In[59]:


salary.head()


# In[60]:


salary.drop(['Name', 'JobTitle', 'AgencyID', 'Agency', 'HireDate'], axis=1, inplace=True)


# In[61]:


salary.head()


# # Modeling

# In[62]:


from sklearn.model_selection import train_test_split


# In[63]:


features = salary.drop('AnnualSalary', axis=1)
target = salary['AnnualSalary']


# ## Feature Scaling

# In[64]:


from sklearn.preprocessing import StandardScaler


# In[65]:


scaler = StandardScaler()


# In[66]:


scaled = scaler.fit_transform(features)

# scaler.fit(features)
# scaler.transform(features)


# In[67]:


scaled_features = pd.DataFrame(scaled, columns=salary.columns[1:])
scaled_features.head()


# ## Train Test Split

# In[68]:


X_train, X_test, Y_train, Y_test = train_test_split(scaled_features, target, test_size = 0.3, random_state = 101)


# In[69]:


X_train.head()


# In[70]:


Y_train.head()


# ## Creating the Model

# ### Linear Regression

# In[71]:


from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score


# In[72]:


linear = LinearRegression()


# In[73]:


linear.fit(X_train, Y_train)


# In[74]:


predictions = linear.predict(X_test)


# In[75]:


print(r2_score(Y_test, predictions))


# **r2_score():**
# _It is the amount of the variation in the output dependent attribute which is predictable from the input independent variable(s). It is used to check how well-observed results are reproduced by the model, depending on the ratio of total deviation of results described by the model._

# In[76]:


linear.coef_


# In[77]:


linear.intercept_


# In[ ]:




