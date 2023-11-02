import React, { useEffect, useState } from "react";

import { getTop5RecentMovies } from "../helpers";
import { MovieCard } from "./MovieCard";
import { Spinner } from "../../components/Spinner";

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
      {
        (movies.length === 0) && <Spinner />
      }
      <div className="moviesList__display">
        {movies.map((movie) => (
          <MovieCard
            key={movie.peliculaID}
            movie={movie}
          />
        ))}
      </div>
    </>
  );
};
