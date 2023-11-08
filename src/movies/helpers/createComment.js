export const createComment = async (comment) => {
  try {
    const url = `http://localhost:3000/movies/comments`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    });
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
}
