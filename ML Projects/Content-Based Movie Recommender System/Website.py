#INSTALL STREAMLIT
#INSTALL REQUESTS
import requests
import streamlit as st
import pickle
import pandas as pd

st.set_page_config(
    page_title="PROJECT",
    page_icon="😎",
)
tab1, tab2= st.tabs(["Top-Rated Movies", "Movie Recommend System"])

with tab1:
   st.header("List of Top-Rated Movies")
   trendmovies_dict = pickle.load(open('q_movies.pkl', 'rb'))
   trendmovies = pd.DataFrame(trendmovies_dict)
   if st.button("Top Rated Movies"):
       trendmovie_list = trendmovies['title'].values
       st.write(trendmovie_list[0:15])

with tab2:
   st.header("Movie Recommend System")
   def fetch_poster(movie_id):
       url = "https://api.themoviedb.org/3/movie/{}?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US".format(
           movie_id)
       data = requests.get(url)
       data = data.json()
       poster_path = data['poster_path']
       full_path = "https://image.tmdb.org/t/p/w500/" + poster_path
       return full_path


   def recommend(movie):
       movie_index = movies[movies['title'] == movie].index[0]
       distances = similarity[movie_index]
       movie_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]
       recommend_movies = []
       recommend_movies_posters = []
       for i in movie_list:
           movie_id = movies.iloc[i[0]].movie_id
           # fetch poster from api
           recommend_movies.append(movies.iloc[i[0]].title)
           recommend_movies_posters.append(fetch_poster(movie_id))
       return recommend_movies, recommend_movies_posters

   movies_dict = pickle.load(open('movies_dict.pkl', 'rb'))
   movies = pd.DataFrame(movies_dict)
   similarity = pickle.load(open('similarity.pkl', 'rb'))

   movie_list = movies['title'].values
   selected_movie = st.selectbox("Type or select a movie from the dropdown ",movie_list
   )
   if st.button('Show Recommendation'):
       recommended_movie_names, recommended_movie_posters = recommend(selected_movie)
       col0, col1, col2, col3, col4 = st.columns(5)
       with col0:
           st.text(recommended_movie_names[0])
           st.image(recommended_movie_posters[0])
       with col1:
           st.text(recommended_movie_names[1])
           st.image(recommended_movie_posters[1])

       with col2:
           st.text(recommended_movie_names[2])
           st.image(recommended_movie_posters[2])
       with col3:
           st.text(recommended_movie_names[3])
           st.image(recommended_movie_posters[3])
       with col4:
           st.text(recommended_movie_names[4])
           st.image(recommended_movie_posters[4])

