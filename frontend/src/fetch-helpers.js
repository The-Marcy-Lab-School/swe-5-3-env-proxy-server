const API_KEY = 'How can I include this without exposing it to the public?';

export const getTrendingGifs = async () => {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/trending?limit=3&rating=g&api_key=${API_KEY}`);

    if (!response.ok) {
      throw new Error(`Fetch failed with status - ${response.status}, ${response.statusText}`);
    }

    const responseData = await response.json();

    return { data: responseData, error: null };
  } catch (error) {
    console.warn(error);
    return { data: null, error };
  }
};

export const getGifsBySearch = async (searchTerm) => {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?limit=3&rating=g&api_key=${API_KEY}&q=${searchTerm}`);

    if (!response.ok) {
      throw new Error(`Fetch failed with status - ${response.status}, ${response.statusText}`);
    }

    const responseData = await response.json();

    return { data: responseData, error: null };
  } catch (error) {
    console.warn(error);
    return { data: null, error };
  }
};
