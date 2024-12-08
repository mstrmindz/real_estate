import axios from "axios";

// Use the environment variables directly
export const baseUrl = "https://bayut.p.rapidapi.com";
export const fetchApi = async (url) => {
  // Ensure the environment variable is being passed properly
  const { data } = await axios.get(url, {
    headers: {
      "x-rapidapi-host": "bayut.p.rapidapi.com",
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    },
  });

  return data;
};
