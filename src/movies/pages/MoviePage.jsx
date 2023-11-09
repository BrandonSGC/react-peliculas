import { useParams } from "react-router-dom";
import { getMovieInfoById, createComment, deleteComment } from "../helpers";
import { useEffect, useState } from "react";
import { MovieDisplay } from "../components";

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
  const { comentarios } = movie;
  
  //console.log(comentarios);

  const [comment, setComment] = useState({});

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
      fecha: new Date().toISOString().split("T")[0],
    };
    setComment(newComment);

    evt.target.style.height = "auto";
    evt.target.style.height = `${evt.target.scrollHeight}px`;
  };

  // NOTA: Hay que validar si tienen involucrados, comentarios,
  // calificaciones, etc... Porque sino se cae la aplicacion.
  const handleCreateComment = async () => {
    if (comment.contenido.trim().length === 0) return;
    
    await createComment(comment);
    const updatedMovie = await getMovieInfoById(id);
    setMovie(updatedMovie);
    setComment({ contenido: "" });
  };

  const handleReplyComment = async (evt) => {
    const idComentarioPadre = parseInt(evt.target.parentElement.parentElement.getAttribute('idc'));

    const newReply = {
      peliculaID: id,
      usuarioID: 1, 
      contenido: comment.contenido, 
      comentarioPadreID: idComentarioPadre,
      fecha: new Date().toISOString().split("T")[0],
    };
    
    console.log(newReply);
    await createComment(comment);
    const updatedMovie = await getMovieInfoById(id);
    setMovie(updatedMovie);
    setComment({ contenido: "" });
  }

  const handleDeleteComment  = async (evt) => {
    const idUsuario = evt.target.parentElement.id;
    const idComentario = evt.target.parentElement.getAttribute('idc');

    if (1 === parseInt(idUsuario)) {
      await deleteComment(idComentario);
      const updatedMovie = await getMovieInfoById(id);
      setMovie(updatedMovie);
    } else {
      console.log(`No se puede eliminar...`);
    }
  }

  return (
    <div className="container">
      <MovieDisplay movie={movie} />

      {/*Esta misma página permitirá que el 
      usuario pueda: 
      1. Agregar un nuevo comentario ✅
      2. Responder un comentario existente 
      3. Eliminar un comentario suyo previo ✅ */}

      <h3 className="text-center">Comentarios:</h3>
      <ul className="comments">
        {comentarios.map((comentario) => (
          <li
            key={comentario.comentarioID}
            className="comments__box"
            id={comentario.usuarioID}
            idc={comentario.comentarioID}
          >
            <div>
              <p className="comments__comment">{comentario.contenido}</p>
              <button onClick={handleReplyComment} className="comments__reply">Responder</button>
            </div>

            <img
              className="comments__delete"
              src="/assets/icons/delete .svg"
              alt="delete"
              onClick={handleDeleteComment}
            />
          </li>
        ))}
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
        <img
          onClick={handleCreateComment}
          className="commentIcon"
          src="/assets/icons/send.svg"
          alt="send"
        />
      </div>
    </div>
  );
};
