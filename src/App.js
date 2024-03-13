import { useEffect, useState } from "react";
import "./App.css";
import { getMovieList, searchMovie } from "./api";
import { Star } from "@phosphor-icons/react";

const App = () => {
  const [popularMovie, setPopularMovie] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovie(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovie.map((movie, i) => {
      return (
        <div className="movie-wrapper" key={i}>
          <div className="movie-title">{movie.title}</div>
          <img className="movie-img" src={`${process.env.REACT_APP_BASEIMGURL}${movie.poster_path}`} alt=""/>
          <div className="movie-date">Release: {movie.release_date}</div>
          <div className="movie-rating"><Star size={32} weight="fill" /> {movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = async(keyword) => {
    if(keyword.length > 3){
      const query = await searchMovie(keyword)
      setPopularMovie(query.data.results)
    } else if(!keyword.length){
      getMovieList().then((result) => {
        setPopularMovie(result);
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MOVIE WEB</h1>
        <input
          placeholder="Search film..."
          className="movie-input"
          onChange={({ target }) => search(target.value)}
        />
        <div className="movie-container">
          <PopularMovieList/>
        </div>
      </header>
    </div>
  );
};

export default App;
