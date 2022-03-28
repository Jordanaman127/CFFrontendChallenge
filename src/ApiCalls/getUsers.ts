export const getUsers = async (page: number = 1) => {
  return fetch(`https://randomuser.me/api/?page=${page}&results=20&seed=abc`)
    .then((response) => response.json())
    .then((data) => data);
};
