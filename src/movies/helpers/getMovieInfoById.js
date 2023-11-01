
export const getMovieInfoById = async (id) => {
  const url = `http://localhost:3000/movies/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}