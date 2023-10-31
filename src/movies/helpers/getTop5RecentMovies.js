export const getTop5RecentMovies = async () => {
  const url = `http://localhost:3000/movies`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}