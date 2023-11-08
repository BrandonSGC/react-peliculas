import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const { peliculaID, nombre, resena, fecha, poster, involucrados } = movie;

  // Returns an array of actors filtered in order of importance.
  const actors = involucrados
    .filter((involucrado) => involucrado.rol === "Actor")
    .slice(0, 3);


  return (
    <div className="card">
      <div className="card__poster">
        <img src={poster} alt="nombre" />
      </div>
      <div className="card__info">
        <p>
          <span className="card__title">Nombre: </span>
          <Link to={`/movies/${peliculaID}`}>{nombre}</Link>
        </p>
        <p>
          <span className="card__title">Reseña: </span>
          {resena}
        </p>
        <p>
          <span className="card__title">Fecha: </span>
          {fecha}
        </p>
        <p>
          <span className="card__title">Actores: </span>
          {actors.map((actor, index) => (
            <span key={index}>
              {actor.nombre}
              {index !== actors.length - 1 && ", "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};
