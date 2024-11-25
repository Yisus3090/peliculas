import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/styles.css";
import Card from "../components/cards/Cards";

function InfiniteScroll() {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false);
  const X_API_KEY = 'eab77e65d7372189aef6b3d908d383f8';

  const fetchMovies = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular`,  
        {
          params: {
            api_key: X_API_KEY,
            page: page,
          },
        }
      );


      const newMovies = response.data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,

        image: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://via.placeholder.com/200x300",  
        liked: false,
      }));

      setMovieList((prevMovies) => [...prevMovies, ...newMovies]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setLoading(false);
  };


  useEffect(() => {
    fetchMovies();
  }, []);

 
  const handleScroll = (e) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.target;
    if (scrollLeft + clientWidth >= scrollWidth - 10 && !loading) {
      fetchMovies(); 
    }
  };

  return (
    <div className="app">
      <h1 className="title">Películas Más Recientes</h1>
      <div className="carousel" onScroll={handleScroll}>
        {movieList.map((movie) => (
          <Card
            key={movie.id}
            image={movie.image}
            title={movie.title}
            liked={movie.liked}
            onLikeToggle={() =>
              setMovieList((prev) =>
                prev.map((m) =>
                  m.id === movie.id ? { ...m, liked: !m.liked } : m
                )
              )
            }
          />
        ))}
        {loading && <div className="loading">Cargando...</div>}
      </div>
    </div>
  );
}

export default InfiniteScroll;
