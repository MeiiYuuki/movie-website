import React, { useEffect, useState } from "react";
import { getMovieDetail, getMovieVideo, getReviewMovie } from "../../../api";
import { Link, useParams } from "react-router-dom";
import { Star } from "@phosphor-icons/react";
import Loading from "../../loading";
import VideoPlayer from "../../components/VideoPlayer";

const Page = () => {
  const id = useParams();
  const [movieDetail, setMovieDetail] = useState([]);
  const [movieReview, setReview] = useState([]);
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMovie = async () => {
    const movie = await getMovieDetail(id.id);
    setMovieDetail(movie);
  };
  const getVideo = async () => {
    // var tempVidArray = []
    const vid = await getMovieVideo(id.id);
    // vid?.map((video) =>{
    //     tempVidArray.push(video.key)
    // })
    // setVideo(tempVidArray)
    setVideo(vid[0].key);
  };
  const getMovieReview = async () => {
    const review = await getReviewMovie(id.id);
    setReview(review);
  };

  useEffect(() => {
    getMovie();
    getVideo();
    getMovieReview();
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
          <div>
            <VideoPlayer youtubeId={video} />
          </div>
        </div>
      </div>
      <h3>Review</h3>
      <div className="movie-review">
        {movieReview?.map((reviews, index) => {
          return (
            <div className="review-container" key={index}>
              <div className="reviewer">
                <div className="reviewer-header">
                    <div className="reviewer-name">{reviews.author}</div>
                    <div className="reviewer-rating">{reviews.author_details.rating}</div>
                </div>
                <div className="reviewer-comment">{reviews.content}</div>
                {/* {
                   reviews.content.split(".").length > 1 ?
                   <input className="expand-btn" type="checkbox"/> :
                  <></>
                } */}
                <input className="expand-btn" type="checkbox"/>
              </div>
            </div>
          );
        })}
        <div></div>
      </div>
    </div>
  );
};

export default Page;
