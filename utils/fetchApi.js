import axios from "axios";

export const baseUrl = "realty-in-ca1.p.rapidapi.com";

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "x-rapidapi-key": "b120e87163msh50a8f852ce5b4e2p1c44dfjsn9cc581729f51",
      "x-rapidapi-host": "realty-in-ca1.p.rapidapi.com",
    },
  });

  return data;
};
