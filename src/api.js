import axios from "axios";

export const getMovieList = async () => {
    const movie = await axios.get(`${process.env.REACT_APP_BASEURL}/movie/top_rated?api_key=${process.env.REACT_APP_APIKEY}`)
    return movie.data.results
}

export const moviePage = async (page) => {
    const movie = await axios.get(`${process.env.REACT_APP_BASEURL}/movie/top_rated?page=${page}&api_key=${process.env.REACT_APP_APIKEY}`)
    return movie.data
}

export const searchMoviePage = async (keyword, page) => {
    const movie = await axios.get(`${process.env.REACT_APP_BASEURL}/search/movie?query=${keyword}&page=${page}&api_key=${process.env.REACT_APP_APIKEY}`)
    return movie.data
}

export const getMovieDetail = async (id) =>{
    const movieDetail = await axios.get(`${process.env.REACT_APP_BASEURL}/movie/${id}?api_key=${process.env.REACT_APP_APIKEY}`)
    return movieDetail.data
}

export const getMovieVideo = async (id) =>{
    const movieVid = await axios.get(`${process.env.REACT_APP_BASEURL}/movie/${id}/videos?api_key=${process.env.REACT_APP_APIKEY}`)
    return movieVid.data.results
}

export const getReviewMovie = async(id) =>{
    const review = await axios.get(`${process.env.REACT_APP_BASEURL}/movie/${id}/reviews?api_key=${process.env.REACT_APP_APIKEY}`)
    return review.data.results
}