import { useEffect, useState } from "react";
import "../App.css";
import {
  getGenreMovieList,
  getMovieByGenreList,
  moviePage,
  searchMoviePage,
} from "../api.js";
import { Link } from "react-router-dom";
import Pagination from "./components/Pagination.js";
import NotFound from "./not-found.js";
import Loading from "./loading.js";

const Home = () => {
  const [popularMovie, setPopularMovie] = useState([]);
  const [genreMovie, setGenreMovie] = useState([]);
  const [filteredMovie, setFilteredMovie] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [searchMovieList, setSearchMovieList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [isFiltered, setFiltered] = useState(false);
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

  const fetchGenreList = async () => {
    const genreList = await getGenreMovieList();
    setGenreMovie(genreList);
  };

  const fetchGenreData = async (genres) =>{
    const newMovieList = await getMovieByGenreList(genres, page);
    // console.log("newMovieList", newMovieList);
    setTotalPage(newMovieList.total_pages);
    setFilteredMovie(newMovieList.results);
    setFiltered(true)
  }

  function handleOnClick(id) {
    setPage(1)
    let genres = [...selectedGenre];
    if (selectedGenre?.length == 0) {
      genres.push(id);
    } else {
      if (selectedGenre.includes(id)) {
        genres.map((genreId, index) => {
          if (genreId == id) {
            genres.splice(index, 1);
          }
        });
      } else {
        genres.push(id);
      }
    }
    setSelectedGenre(genres);
    // console.log("genres", genres);
    fetchGenreData(genres)
  }

  const changeColor = (vote) => {
    if (vote >= 7) {
      return {
        color: "#66FF99",
      };
    } else if (vote >= 4 && vote < 7) {
      return {
        color: "#FFC300",
      };
    } else if (vote < 4) {
      return {
        color: "#C70039",
      };
    }
  };

  const isClicked = (id) => {
    if (selectedGenre.find((genreId) => genreId == id)) {
      return {
        backgroundColor: "#eee",
        color: "black",
      };
    } else {
      return {
        backgroundColor: "#373b69",
        color: "#eee",
      };
    }
  };

  useEffect(() => {
    fetchGenreList();
    fetchData();
    if (isSearch) {
      fetchSearchData();
    }
    if(isFiltered){
      fetchGenreData(selectedGenre)
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
            <div
              className="movie-rating"
              style={changeColor(movie.vote_average)}
            >
              {movie.vote_average}
            </div>
          </div>
          {/* <div className="movie-date">Release: {movie.release_date}</div> */}
        </Link>
      );
    });
  };

  const FilteredMovieList = () => {
    return filteredMovie.map((movie, i) => {
      return (
        <Link className="movie-wrapper" key={i} to={`/movie/${movie.id}`}>
          <img
            className="movie-img"
            src={`${process.env.REACT_APP_BASEIMGURL}${movie.poster_path}`}
            alt=""
          />
          <div className="movie-header">
            <div className="movie-title">{movie.title}</div>
            <div
              className="movie-rating"
              style={changeColor(movie.vote_average)}
            >
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
            <img
              className="movie-img"
              src={`${process.env.REACT_APP_BASEIMGURL}${movie.poster_path}`}
              alt=""
            />
            <div className="movie-header">
              <div className="movie-title">{movie.title}</div>
              <div
                className="movie-rating"
                style={changeColor(movie.vote_average)}
              >
                {movie.vote_average}
              </div>
            </div>
            {/* <div className="movie-date">Release: {movie.release_date}</div> */}
          </Link>
        );
      });
    }
  };

  const GenreList = () => {
    return genreMovie?.map((genre, idx) => {
      return (
        <div
          className="genre-tags-wrapper"
          key={idx}
          onClick={() => handleOnClick(genre.id)}
          style={isClicked(genre.id)}
        >
          {genre.name}
        </div>
      );
    });
  };

  const search = async (keyword) => {
    // memberikan validasi jika hasil search hanya ada whitespace saja maka jangan tembak API
    // keyword.replace(/\s/g, '').length

    if (keyword.length > 3 && keyword.replace(/\s/g, "").length) {
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
          <div className="genre-container">
            <GenreList />
          </div>
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
        {!isSearch ? (
          <>
            {isFiltered ? (
              <>
                <div className="movie-container">
                  <FilteredMovieList />
                </div>
                {!filteredMovie.length ? (
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
              <>
                <div className="movie-container">
                  <PopularMovieList />
                </div>
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
            )}
          </>
        ) : (
          <>
            <div className="movie-container">
              <SearchMovieList />
            </div>
            {!searchMovieList.length ? (
              <></>
            ) : (
              <Pagination page={page} totalPage={totalPage} setPage={setPage} />
            )}
          </>
        )}
        <></>
      </header>
    </div>
  );
};

export default Home;
