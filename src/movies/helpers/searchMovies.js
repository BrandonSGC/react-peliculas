
export const searchMovies = async (movie) => {
  try {
    const url = `http://localhost:3000/allmovies/${movie}`;
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
