import React, { useEffect, useState } from "react";
import { getMovieDetail, getMovieVideo, getReviewMovie } from "../../../api";
import { Link, useParams } from "react-router-dom";
import { Star, X, YoutubeLogo } from "@phosphor-icons/react";
import Loading from "../../loading";
import ReactModal from "react-modal";
import VideoCarousel from "../../components/VideoCarousel";
import moment from "moment/moment";

const Page = () => {
  const id = useParams();
  const [movieDetail, setMovieDetail] = useState([]);
  const [movieReview, setReview] = useState([]);
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overlay, setOverlay] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false)

  const customStyles = {
    overlay:{
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const getMovie = async () => {
    const movie = await getMovieDetail(id.id);
    setMovieDetail(movie);
  };
  const getVideo = async () => {
    // var tempVidArray = []
    const vid = await getMovieVideo(id.id);
    // console.log('vid', vid)
    setVideo(vid)
    // setVideo(vid[0].key);
  };
  const getMovieReview = async () => {
    const review = await getReviewMovie(id.id);
    setReview(review);
  };

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

  const showVideo = () => {
    console.log("clicked");
    setIsOpen(true)
    setOverlay(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  }

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
      {overlay ? (
        <div className="modals">
          <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <div className="modal-content">
              <X size={24} className="close-btn" onClick={closeModal}/>
              <VideoCarousel vidArray={video}/>
            </div>
          </ReactModal>
        </div>
      ) : (
        <></>
      )}
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
            Release Date : {moment(movieDetail.release_date).format("DD MMMM YYYY")}
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
          <div
            className="movie-detail-rating"
            style={changeColor(movieDetail.vote_average)}
          >
            <Star size={32} weight="fill" /> {movieDetail.vote_average}
          </div>
          <div className="movie-video" onClick={showVideo}>
            <YoutubeLogo className="youtube-logo" size={50} weight="fill" />
            Watch Video
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
                  <div className="reviewer-name">
                    {reviews.author} ({reviews.author_details.username}){" "}
                  </div>
                  <div
                    className="reviewer-rating"
                    style={changeColor(reviews.author_details.rating)}
                  >
                    {reviews.author_details.rating}
                  </div>
                </div>
                <div className="reviewer-comment">{reviews.content}</div>
                {/* {
                   reviews.content.split(".").length > 1 ?
                   <input className="expand-btn" type="checkbox"/> :
                  <></>
                } */}
                <input className="expand-btn" type="checkbox" />
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
