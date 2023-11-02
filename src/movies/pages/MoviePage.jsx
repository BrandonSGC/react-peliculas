import { useParams } from "react-router-dom";
import { getMovieInfoById } from "../helpers";
import { useEffect, useState } from "react";

export const MoviePage = () => {
  const [movie, setMovie] = useState({
    peliculaID: "",
    nombre: "",
    fecha: "",
    poster: "",
    resena: "",
    calificaciones: {},
    involucrados: [],
    comentarios: [],
  });
  // Destructuring of the move info.
  const {
    nombre,
    fecha,
    poster,
    resena,
    calificaciones: { calificacion, nombre_experto },
    involucrados,
    comentarios,
  } = movie;

  // Get id from the url params...
  const { id } = useParams();

  useEffect(() => {
    const getMovieInfo = async () => {
      const data = await getMovieInfoById(id);
      setMovie(data);
    };
    getMovieInfo();
  }, []);

  // NOTA: Hay que validar si tienen involucrados, comentarios,
  // calificaciones, etc... Porque sino se cae la aplicacion.

  return (
    <div className="container">
      <div className="moviePage__display">
        <div className="moviePage__poster">
          <img src={poster} alt={nombre} />
        </div>

        <div className="moviePage__info">
          <h2>{nombre}</h2>
          <p>
            <span>Reseña:</span> {resena}
          </p>
          <p>
            <span>Fecha:</span> {fecha}
          </p>
          <p>
            <span>Calificacion: </span>{calificacion}, calificada por el experto "<span>{nombre_experto}</span>"
          </p>

          <section className="involved">
            <h3>Involucrados:</h3>
            <ul className="involved__list">
              {involucrados.map((involucrado) => (
                <li 
                  key={involucrado.involucradoID}
                  className="involved__person"
                >
                  <span>{involucrado.rol}:</span> {involucrado.nombre}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      
      <h3 className="text-center">Comentarios:</h3>
      
    </div>
  );
};
