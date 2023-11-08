
export const MovieDisplay = ({movie}) => {

  const {
    nombre,
    fecha,
    poster,
    resena,
    calificaciones: { calificacion, nombre_experto },
    involucrados,
  } = movie;


  return (
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
            <span>Calificacion: </span>
            {calificacion}, calificada por el experto{" "}
            <span>{nombre_experto}</span>
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
  )
}
