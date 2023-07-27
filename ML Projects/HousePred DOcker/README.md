# HousePrice_pred-Docker
This particular repo contains an ML model which predicts houses prices and is deployed using Docker and Github Actions

#### Software and Tools Requirements

1. [Github Account](https://github.com)
2. [Heroku Account](https://heroku.com)
3. [VS Code IDE](https://code.visualstudio.com/)
4. [GitCLI](https://git-scm.com/book/en/v2/Getting-Started-The-Command-Line)


Create a new enviroment for the project

```
conda create -p venv python==3.7 -y
```

### Deploy in Heroku Server

In main.yaml file change with your Heroku Details

```
email: ${{ secrets.HEROKU_EMAIL }}
heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
heroku_app_name: ${{ secrets.HEROKU_APP_NAME }}
```

### Run in local server

Install requirements.txt 

```
!pip install -r requirements.txt
```
Run app.py

```
python app.py
```
