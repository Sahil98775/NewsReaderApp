const API_KEY = "pub_3ea2be56dd914033a14f4d585eed8381";
const BASE_URL = "https://newsdata.io/api/1/latest";

const fetchNews = async (country: string, category?: string | null) => {
  try {
    let url = `${BASE_URL}?apikey=${API_KEY}&country=${country}&image=1&language=en,hi,pa`;

    if (category) {
      url += `&category=${category}`;
    }
    const data = await fetch(url);
    const response = await data.json();
    return response.results;
  } catch (error) {
    console.log("Error fetching news by category:", error);
    return [];
  }
};

export default fetchNews;
