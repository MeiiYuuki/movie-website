import { useEffect, useState } from "react";
import "../App.css";
import { moviePage, searchMoviePage } from "../api.js";
import { Star } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import Pagination from "./components/Pagination.js";
import NotFound from "./not-found.js";
import Loading from "./loading.js";

const Home = () => {
  const [popularMovie, setPopularMovie] = useState([]);
  const [searchMovieList, setSearchMovieList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [isSearch, setSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const pages = await moviePage(page);
    setTotalPage(pages?.total_pages);
    setPopularMovie(pages?.results);
  };

  const fetchSearchData = async () => {
    const pages = await searchMoviePage(keyword, page);
    setTotalPage(pages?.total_pages);
    setSearchMovieList(pages?.results);
  };

  useEffect(() => {
    fetchData();
    if (isSearch) {
      fetchSearchData();
    }
    setTimeout(() => setLoading(false), 500);
  }, [page]);

  const PopularMovieList = () => {
    return popularMovie.map((movie, i) => {
      return (
        <Link className="movie-wrapper" key={i} to={`/movie/${movie.id}`}>
          <img
            className="movie-img"
            src={`${process.env.REACT_APP_BASEIMGURL}${movie.poster_path}`}
            alt=""
          />
          <div className="movie-header">
            <div className="movie-title">{movie.title}</div>
            <div className="movie-rating">
              {movie.vote_average}
            </div>
          </div>
          {/* <div className="movie-date">Release: {movie.release_date}</div> */}
        </Link>
      );
    });
  };

  const SearchMovieList = () => {
    if (!searchMovieList.length) {
      return <NotFound />;
    } else {
      return searchMovieList?.map((movie, i) => {
        return (
          <Link className="movie-wrapper" key={i} to={`/movie/${movie.id}`}>
            <div className="movie-title">{movie.title}</div>
            <img
              className="movie-img"
              src={`${process.env.REACT_APP_BASEIMGURL}${movie.poster_path}`}
              alt=""
            />
            <div className="movie-date">Release: {movie.release_date}</div>
            <div className="movie-rating">
              <Star size={32} weight="fill" /> {movie.vote_average}
            </div>
          </Link>
        );
      });
    }
  };

  const search = async (keyword) => {
    // memberikan validasi jika hasil search hanya ada whitespace saja maka jangan tembak API
    // keyword.replace(/\s/g, '').length

    if (keyword.length > 3 && keyword.replace(/\s/g, '').length) {
      setKeyword(keyword);
      setSearch(true);
      setPage(1);
      const query = await searchMoviePage(keyword, page);
      setTotalPage(query?.total_pages);
      setSearchMovieList(query?.results);
    } else if (!keyword.length) {
      setPage(1);
      fetchData();
      setSearch(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>MOVIE WEB</h1>
        <input
          placeholder="Search film..."
          className="movie-input"
          onChange={({ target }) => search(target.value)}
        />
        {!isSearch ? (
          <h3>TOP RATING MOVIES</h3>
        ) : (
          <div className="search-title">
            {!searchMovieList.length ? (
              <></>
            ) : (
              <>
                <h3>SEARCH OF</h3>
                <h3 style={{ fontStyle: "italic" }}>"{keyword}"</h3>
              </>
            )}
          </div>
        )}
        <div className="movie-container">
          {!isSearch ? (
            <>
              <PopularMovieList />
              {!popularMovie.length ? (
                <></>
              ) : (
                <Pagination
                  page={page}
                  totalPage={totalPage}
                  setPage={setPage}
                />
              )}
            </>
          ) : (
            <SearchMovieList />
          )}
          {!searchMovieList.length ? (
            <></>
          ) : (
            <Pagination page={page} totalPage={totalPage} setPage={setPage} />
          )}
          <></>
        </div>
      </header>
    </div>
  );
};

export default Home;
