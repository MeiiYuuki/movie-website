import { X, YoutubeLogo } from "@phosphor-icons/react";
import YouTube from "@u-wave/react-youtube";
import { useState } from "react";

const VideoPlayer = ({ youtubeId }) => {
    const [isOpen, setIsOpen] = useState(true)
    const option = {
        width: "400",
        height: "250",
        playerVars:{
            autoplay: 1
        }
    }
    
    const handleClick = () =>{
        setIsOpen((prev) => !prev)
    }

    const Player = () =>{
        return (
            <div className="movie-videoPlayer">
                <div onClick={handleClick}><X size={24} className="close-btn"/></div>
                <YouTube video={youtubeId} 
                onReady={(event) => event.target.pauseVideo()}
                opts={option}
                />
            </div>
        );
    }

    return isOpen ? <Player/> : 
    <div onClick={handleClick}>
        <YoutubeLogo className="youtube-logo" size={50} weight="fill" />
    </div>
        
}

export default VideoPlayer;
