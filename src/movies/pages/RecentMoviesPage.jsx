import { MoviesList } from "../components/MoviesList";

export const RecentMoviesPage = () => {

  return (
    <main>
      <div className="container">
        <h1 className="text-center">Top 5 películas más recientes</h1>
        <form className="search">
          <input className="search__input" type="text" placeholder="Buscar..."/>
          <button className="search__button">Buscar</button>
        </form>
        
        <MoviesList />
      </div>
    </main>
  );
};
