import streamlit as st
import requests
import os

YOUR_API_KEY = os.environ['API-KEY']
st. set_page_config(layout="wide")
movie_name = st.text_input ("Type the Title of the movie and press ⎆")

if movie_name:
    try:
        movie_data = requests.get(f'https://www.omdbapi.com/?apikey={YOUR_API_KEY}&t={movie_name}')
        movie_data = movie_data.json()
        image_part,data_part = st.columns([1,2])
        with image_part:
            st.image(movie_data["Poster"])
        with data_part:
            st.subheader(movie_data["Title"])
            st.caption(f"Genre: {movie_data['Genre']} • Released: {movie_data['Released']}")
            st.text(f"Actors: {movie_data['Actors']}")
            st.write(movie_data['Plot'])
            st.text(f"Rating: {movie_data['imdbRating']}")
            st.text(f"Awards: {movie_data['Awards']}")
            st.progress(float(movie_data['imdbRating'])/10)
    except:
        st.error("No movie found")