# olympics-data-analysis-web-app
A Streamlit web application for the analysis of olympics dataset. So I build a website using StreamLit python library to visualize the 120 Years of Olympics history.

This project aims , building an Olympics Data Analysis Web Application using Streamlit. For development, I will be using Python and Pandas. For plotting, I will be using Seaborn and Plotly libraries.Variables include Name, Sex, Age, Height, Weight of the athlete, his team name, sport, event and the year, season, city of the olympics he/she took part in. In addition, the data captures the medal won (if any) by the athlete. 
## Dataset

Dataset Link: https://www.kaggle.com/heesoo37/120-years-of-olympic-history-athletes-and-results


## Algorithm

preprocessing-helper: Library container generic helper functionality for preprocessing in machine learning projects.

Helper functions simplify complex analysis tasks and make the code modular and reusable. In the Olympic data analysis project, you can create helper functions to perform common tasks and computations efficiently.


## These 4 step analysis are done in this project:

-Medal tally (No. of total medals, No. of Gold Medals, No. of Silver Medals and No. of Bronze Medals) over the years of different countries.

-Overall analysis like how many sports are played, how many countries are participated, how many cities hosted and so on. And there is a graph on participating nations over the years, graph on events over the years, graph on number of athletes participated over the years, heatmap on number of events and top 15 successful athletes on different sports.

-Then did country wise analysis like graph many medals won through the years, heatmap on how many medals won through out the years in different sports and top 15 athletes of the countries.

-And last, athletes wise analysis like distribution of winning Gold, Silver and Bronze Medals on the basis of athletes' age, distribution of age with respect to sports of Gold Medalist as well as height vs weight graph of different sports.

## Dependencies

The following dependencies are required to run the project:

streamlit
plotly
seaborn
matplotlib
scipy

To install the required dependencies, you can use the following command:

```shell
pip install numpy pandas scikit-learn streamlit
```

## Usage
Clone the repository:
```shell
git clone https://github.com/your-username/Olympics-data-analysis.git
```
Navigate to the project directory:
```shell
cd Olympics-data-analysis
```
Install the dependencies:
```shell
pip install -r requirements.txt
```
Run the Streamlit app:
```shell
streamlit run app.py
```

Open your browser and go to http://localhost:8501/ to access the olympics-data-analysis-web app.

