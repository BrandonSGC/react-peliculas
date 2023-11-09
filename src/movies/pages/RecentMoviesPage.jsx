import { useState } from "react";
import { MoviesList } from "../components/MoviesList";
import { searchMovies } from "../helpers";
import { Link } from "react-router-dom";

export const RecentMoviesPage = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const [showBox, setShowBox] = useState(false);

  const handleInput = (evt) => {
    setSearchMovie(evt.target.value.trim());
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  const handleGetMovies = async () => {
    const movies = await searchMovies(searchMovie);
    setShowBox(true);
    setMovies(movies);
  };

  return (
    <main>
      <div className="container">
        <h1 className="text-center">Top 5 películas más recientes</h1>
        <form onSubmit={handleSubmit} className="search">
          <input
            onChange={handleInput}
            className="search__input"
            type="text"
            placeholder="Buscar..."
          />
          <button onClick={handleGetMovies} className="search__button">
            Buscar
          </button>
        </form>

        <div className={`search__box ${showBox ? "show" : ""}`}>
          <ul className="search__list">
            {movies.map((movie) => (
              <li key={movie.peliculaID} className="search__item">
                <Link
                  className="search__link"
                  to={`/movies/${movie.peliculaID}`}
                >
                  {movie.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <MoviesList />
      </div>
    </main>
  );
};
