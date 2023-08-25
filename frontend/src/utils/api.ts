export const BASE_URL = "http://localhost:3001";

const checkResponse = (res: any) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

export const getGames = () => {
  return fetch(`${BASE_URL}/games`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};
export const getPlayers = () => {
  return fetch(`${BASE_URL}/players`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};
