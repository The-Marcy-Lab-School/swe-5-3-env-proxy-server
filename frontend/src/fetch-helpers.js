const API_KEY = 'How can I include this without exposing it to the public?';

export const getTrendingGifs = async () => {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=3`);

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
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=3&q=${searchTerm}`);

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
