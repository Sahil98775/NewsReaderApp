const API_KEY = "pub_3ea2be56dd914033a14f4d585eed8381";
const BASE_URL = "https://newsdata.io/api/1/latest";

//newsdata.io/api/1/latest?apikey=pub_3ea2be56dd914033a14f4d585eed8381
// &country=in&language=en,hi,pa&category=breaking&prioritydomain=low&image=1

const getBreaking = async (CountrySelect: string) => {
  try {
    const latest = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&country=${CountrySelect}&language=en,hi,pa&category=breaking&prioritydomain=low&image=1`
    );
    if (!latest.ok) throw new Error("API returned " + latest.status);
    const data = await latest.json();
    return data?.results || [];
  } catch (error) {
    console.log("Error fetching latest news:", error);
    return [];
  }
};

export default getBreaking;
