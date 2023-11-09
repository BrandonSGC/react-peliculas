
export const getUserInfoByUsername = async (username) => {
  try {
    const url = `http://localhost:3000/users/${username}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}