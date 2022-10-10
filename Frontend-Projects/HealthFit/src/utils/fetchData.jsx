export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
}

export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
  },
}

export const fetchData = async (url, options) => {
  try {
    const res = await fetch(url, options)
    const data = await res.json()

    return data
  } catch (error) {
    console.log(error.message)
  }
}
