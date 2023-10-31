import React, { useEffect, useState } from "react";

import { getTop5RecentMovies } from "../helpers";
import { MovieCard } from "./MovieCard";

export const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await getTop5RecentMovies();
      setMovies(data);
    };
    getMovies();
  }, []);

  return (
    <>
      <div className="display">
        {movies.map((movie) => (
          <MovieCard
            key={movie.movieInfo.peliculaID}
            movieInfo={movie.movieInfo}
            involucrados={movie.involucrados}
          />
        ))}
      </div>
    </>
  );
};
