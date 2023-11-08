import { useParams } from "react-router-dom";
import { getMovieInfoById, createComment } from "../helpers";
import { useEffect, useState } from "react";

export const MoviePage = () => {
  // Get id from the url params...
  const { id } = useParams();
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
  
  const [comment, setComment] = useState({});
  
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

  useEffect(() => {
    const getMovieInfo = async () => {
      const data = await getMovieInfoById(id);
      setMovie(data);
    };
    getMovieInfo();
  }, [id]);


  const handleInput = (evt) => {
    const newComment = {
      peliculaID: id,
      usuarioID: 1,
      contenido: evt.target.value,
      comentarioPadreID: null,
      fecha: new Date().toISOString().split('T')[0]
    };
    setComment(newComment);

    // Control textarea height dynamically.
    evt.target.style.height = 'auto';
    evt.target.style.height = `${evt.target.scrollHeight}px`;
  }

  // NOTA: Hay que validar si tienen involucrados, comentarios,
  // calificaciones, etc... Porque sino se cae la aplicacion.

  const sendComment = async () => {
    if (comment.contenido.trim().length === 0) return;
    await createComment(comment);
    const updatedMovie = await getMovieInfoById(id);
    setMovie(updatedMovie);
    setComment({contenido: ''});
  };
  

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

      {/*Esta misma página permitirá que el usuario
      pueda agregar un nuevo comentario o
      bien, responder un comentario existente, así
      como eliminar un comentario suyo previo.*/}
      <h3 className="text-center">Comentarios:</h3>
      <ul className="comments">
        {comentarios.map((comentario) => {
          console.log(comentario.comentarioID);
          return (
          <li key={comentario.comentarioID} className="comments__box" id={comentario.comentarioID}>
            <p className="comments__comment">{comentario.contenido}</p>
            <button className="comments__reply">Responder</button>
          </li>
        )})}
      </ul>


      <div className="commentBox">
        <textarea
          className="commentInput"
          name="commentBox"
          id="commentBox"
          placeholder="Escribe aquí tu comentario aquí..."
          value={comment.contenido}
          onChange={handleInput}
        ></textarea>
        <img onClick={sendComment} className="commentIcon" src="/assets/icons/send.svg" alt="send" />
      </div>
    </div>
  );
};
