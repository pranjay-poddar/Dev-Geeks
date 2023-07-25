FROM python:3.7 
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
EXPOSE $PORT
CMD guincorn --workers=4 --bind 0.0.0.0:$PORT app:app
```