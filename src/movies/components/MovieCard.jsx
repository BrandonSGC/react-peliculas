import React from 'react'

export const MovieCard = ({movieInfo, involucrados}) => {

  const { nombre, resena, fecha, poster } = movieInfo;
  const {  } = involucrados;


  return (
    <div className='card'>
      <div className='card__poster'>
        <img src={poster} alt="nombre" />
      </div>
      <div className='card__info'>
        <p><span>Nombre: </span>{nombre}</p>
        <p><span>Reseña: </span>{resena}</p>
        <p><span>Fecha: </span>{fecha}</p>
        <p><span>Actores: </span></p>
      </div>
    </div>
  )
}
