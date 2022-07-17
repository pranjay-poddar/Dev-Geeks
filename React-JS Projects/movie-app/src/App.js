import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = "http://www.omdbapi.com?apikey=b2186af3";

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // search movie by title function
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        console.log(data.Search);
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('superman');
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input
                    type="text"
                    placeholder='Enter movie name'
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value)}}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm) }
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {
                                movies.map(
                                    (movie) =>(<MovieCard movie={movie} />)
                                )
                            }
                        </div>
                    ) : (
                        <div className="empty">
                            <h3>No movies found</h3>
                        </div>
                    )
            }

        </div>
    );
}

export default App;
