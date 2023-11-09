export const deleteComment = async (id) => {
  const url = `http://localhost:3000/movies/comments/${id}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('¡Eliminado exitosamente!', data);
  } catch (error) {
    console.error('¡Error al eliminar!', error);
  }
};
