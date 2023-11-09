import { useParams } from "react-router-dom";
import { getMovieInfoById, createComment, deleteComment, getUserInfoByUsername } from "../helpers";
import { useContext, useEffect, useState } from "react";
import { MovieDisplay } from "../components";
import { UserContext } from "../../context/UserContext";

export const MoviePage = () => {

  const { user } = useContext( UserContext );
  const [userInfo, setUserInfo] = useState({});
  const { usuarioID } = userInfo;

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
  
  const [comment, setComment] = useState({});

  useEffect(() => {
    const getMovieInfo = async () => {
      const data = await getMovieInfoById(id);
      setMovie(data);
    };
    const getUserInfo = async () => {
      const userInfo = await getUserInfoByUsername(user);
      setUserInfo(userInfo);
    }
    getMovieInfo();
    getUserInfo();
  }, [id]);

  const handleInput = (evt) => {
    const newComment = {
      peliculaID: id,
      usuarioID: usuarioID,
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
      usuarioID: usuarioID, 
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

    if (usuarioID === parseInt(idUsuario)) {
      await deleteComment(idComentario);
      const updatedMovie = await getMovieInfoById(id);
      setMovie(updatedMovie);
    } else {
      alert('Solo puedes eliminar tus comentarios')
    }
  }

  return (
    <div className="container">
      <MovieDisplay movie={movie} />

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

            {usuarioID === comentario.usuarioID && (
              <img
                className="comments__delete"
                src="/assets/icons/delete .svg"
                alt="delete"
                onClick={handleDeleteComment}
              />
            )}
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
