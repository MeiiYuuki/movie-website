import axios from "axios";

export const getMovieList = async () => {
    const movie = await axios.get(`${process.env.REACT_APP_BASEURL}/movie/popular?page=1&api_key=${process.env.REACT_APP_APIKEY}`)
    return movie.data.results
}

export const searchMovie = async (keyword) => {
    const search = await axios.get(`${process.env.REACT_APP_BASEURL}/search/movie?query=${keyword}&page=1&api_key=${process.env.REACT_APP_APIKEY}`)
    return search
}