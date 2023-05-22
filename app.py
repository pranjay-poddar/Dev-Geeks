import streamlit as st
import pickle
import pandas as pd
import requests
original_title = '<p style="color:White; font-size: 80px;">CinePicks</p>'
st.markdown(original_title, unsafe_allow_html=True)
st.markdown(
    f"""
         <style>
         .stApp {{
             background: url("https://wallup.net/wp-content/uploads/2018/03/20/414708-Iron_Man-Iron_Man_2-Iron_Man_3-iron_man__mark_XLIII-The_Avengers.jpg");
         }}
         </style>
         """,
    unsafe_allow_html=True
)
def fetch_poster(movie_id):
    url='https://api.themoviedb.org/3/movie/{}?api_key=4e9dfb203bf90ff6a4fc33522c802f3b'.format(movie_id)
    data=requests.get(url)
    data=data.json()
    poster_path=data['poster_path']
    full_path="https://image.tmdb.org/t/p/w500/" + poster_path
    return full_path


similarity=pickle.load(open('similarity.pkl','rb'))
def recommend(movie):
    movie_index = movies[movies['title'] == movie].index[0]
    distances = similarity[movie_index]
    movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]
    recommended_movies=[]
    recommended_movie_posters = []

    for i in movies_list:
        movie_id=movies.iloc[i[0]].movie_id
        # Fetch poster from API
        recommended_movies.append(movies.iloc[i[0]].title)
        recommended_movie_posters.append(fetch_poster(movie_id))
    return recommended_movies,recommended_movie_posters



movies_dict=pickle.load(open('movies_dict.pkl','rb'))
movies=pd.DataFrame(movies_dict)
selected_movie_name=st.selectbox('Recently Watched',movies['title'].values)
if st.button('Show Recommendations'):
    recommended_movie_names, recommended_movie_posters = recommend(selected_movie_name)
    col1, col2, col3, col4, col5 = st.columns(5)
    with col1:
        st.text(recommended_movie_names[0])
        st.image(recommended_movie_posters[0])
    with col2:
        st.text(recommended_movie_names[1])
        st.image(recommended_movie_posters[1])

    with col3:
        st.text(recommended_movie_names[2])
        st.image(recommended_movie_posters[2])
    with col4:
        st.text(recommended_movie_names[3])
        st.image(recommended_movie_posters[3])
    with col5:
        st.text(recommended_movie_names[4])
        st.image(recommended_movie_posters[4])