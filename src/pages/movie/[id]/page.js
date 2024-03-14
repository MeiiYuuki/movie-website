import React, { useEffect, useState } from "react";
import { getMovieDetail } from "../../../api";
import { Link, useParams } from "react-router-dom";
import { Star } from "@phosphor-icons/react";
import Loading from "../../loading";

const Page = () => {
  const id = useParams();
  const [movieDetail, setMovieDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMovie = async () => {
    const movie = await getMovieDetail(id.id);
    setMovieDetail(movie);
  };

  useEffect(() => {
    getMovie();
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-backBtn">
        <Link className="back-btn" to={`/`}>
          Back
        </Link>
      </div>
      <div className="movie-detail-wrapper">
        <img
          className="movie-detail-img"
          src={`${process.env.REACT_APP_BASEIMGURL}${movieDetail.poster_path}`}
          alt=""
        />
        <div className="movie-detail-component">
          <h2>{movieDetail.title}</h2>
          <p className="movie-detail-overview">{movieDetail.overview}</p>
          <div className="movie-detail-date">
            Release Date : {movieDetail.release_date}
          </div>
          <div className="movie-detail-production">
            Production By :
            <div className="production-name-wrapper">
              {movieDetail?.production_companies?.map((production, index) => {
                return (
                  <div className="production-name" key={index}>
                    {production.name}{" "}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="movie-detail-rating">
            <Star size={32} weight="fill" /> {movieDetail.vote_average}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
