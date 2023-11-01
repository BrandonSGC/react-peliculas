import { useParams } from 'react-router-dom';
import { getMovieInfoById } from '../helpers';
import { useEffect, useState } from 'react';

export const MoviePage = () => {
  const [movie, setMovie] = useState({
    peliculaID: '',
    nombre: '',
    fecha: '',
    poster: '',
    resena: ''
  });

  // Get id from the url params...
  const { id } = useParams();

  useEffect( () => {
    const getMovieInfo = async () => {
      const data = await getMovieInfoById(id);
      const objData = {
        peliculaID: data.movieInfo.peliculaID,
        nombre: data.movieInfo.nombre,
        fecha: data.movieInfo.fecha,
        poster: data.movieInfo.poster,
        resena: data.movieInfo.resena
      }
      setMovie(objData);
    }

    getMovieInfo();
  }, []);

  return (
    <div className='container'>
      <div className="moviePage__display">
        <div>
          <img src={movie.poster} alt={movie.nombre} />
        </div>
        <div>
          <h2>{movie.nombre}</h2>
          <p>{movie.resena}</p>
          <p>{movie.fecha}</p>
          <p><span>Calificacion: </span>...</p>
        </div>
      </div>

      <section>
        <h2>Comentarios:</h2>
      </section>

      <section>
        <h2>Involucrados:</h2>
      </section>

      <section>
        <h2>Calificaciones:</h2>
      </section>
    </div>
  )
}
