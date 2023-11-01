
export const MovieCard = ({movieInfo, involucrados}) => {

  const { peliculaID, nombre, resena, fecha, poster } = movieInfo;
  const {  } = involucrados;


  return (
    <div className='card'>
      <div className='card__poster'>
        <img src={poster} alt="nombre" />
      </div>
      <div className='card__info'>
        <p><span className='card__title'>Nombre: </span> <a href={`/movies/${peliculaID}`}>{nombre}</a></p>
        <p><span className='card__title'>Reseña: </span>{resena}</p>
        <p><span className='card__title'>Fecha: </span>{fecha}</p>
        <p><span className='card__title'>Actores: </span></p>
      </div>
    </div>
  )
}
