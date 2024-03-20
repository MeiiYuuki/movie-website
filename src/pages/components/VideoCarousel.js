import React from 'react';
import { Carousel } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import 'bootstrap/dist/css/bootstrap.min.css';

export const VideoCarousel = ({vidArray}) => {
    return (
        <div className='carousel-video'>
            <Carousel>
                {
                    vidArray.map((vid) =>{
                        return(
                            <Carousel.Item key={vid.id}>
                                <ReactPlayer 
                                    url={`https://www.youtube.com/watch?v=${vid.key}`}
                                    pip={true}
                                    controls={true}
                                />
                                <Carousel.Caption>
                                    <h3>{vid.name}</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
        </div>
    );
}

export default VideoCarousel;
