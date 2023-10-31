import React, { useEffect, useState } from "react";

import { getTop5RecentMovies } from '../helpers'
import { MovieCard } from "./MovieCard";

export const MoviesList = () => {
  
  const [movies, setMovies] = useState([]);

  useEffect( () => {
    const getMovies = async () => {
      const data = await getTop5RecentMovies();
      setMovies(data);
    }
    getMovies();
  }, []);

  console.log(movies);

  return (
    <>
      <main>
        <div className="container">
          <h1 className="text-center">Top 5 películas más recientes</h1>
          <form action="">
            <input type="text" />
            <button>Buscar</button>
          </form>

          <div className="display">
            {/* Aqui imprimimos las peliculas (MovieCard)*/}
            {
              movies.map( movie => (
                <MovieCard key={movie.movieInfo.peliculaID}
                  movieInfo={movie.movieInfo} 
                  involucrados={movie.involucrados}
                />
              ))
            }

          </div>
        </div>
      </main>
    </>
  );
};
