import axios from "axios";

export const getMovieList = async () => {
    const movie = await axios.get(`${process.env.REACT_APP_BASEURL}/discover/movie?api_key=${process.env.REACT_APP_APIKEY}`)
    return movie.data.results
}

export const moviePage = async (page) => {
    const movie = await axios.get(`${process.env.REACT_APP_BASEURL}/discover/movie?page=${page}&api_key=${process.env.REACT_APP_APIKEY}`)
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

export const getGenreMovieList = async() =>{
    const genre = await axios.get(`${process.env.REACT_APP_BASEURL}/genre/movie/list?api_key=${process.env.REACT_APP_APIKEY}`)
    return genre.data.genres
}

export const getMovieByGenreList= async (arrayId, page) => {
    const movie = await axios.get(`${process.env.REACT_APP_BASEURL}/discover/movie?page=${page}&with_genres=${arrayId}&api_key=${process.env.REACT_APP_APIKEY}`)
    return movie.data
}