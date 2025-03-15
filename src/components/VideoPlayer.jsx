import React, { useRef, useState, useEffect } from "react";
import { Box, Slider, IconButton, Tooltip, Button } from "@mui/material";
import { PlayArrow, Pause, VolumeUp, Fullscreen, Replay10, Forward10, SlowMotionVideo, PictureInPicture, ClosedCaption, Loop, UploadFile, ScreenRotation, Speed } from "@mui/icons-material";
import Screenfull from "screenfull";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState("https://www.w3schools.com/html/mov_bbb.mp4");
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [showControls, setShowControls] = useState(false);
  let hideControlsTimeout;

  useEffect(() => {
    videoRef.current.textTracks[0].mode = captionsEnabled ? "showing" : "hidden";
    videoRef.current.playbackRate = speed;
    videoRef.current.volume = volume / 100;
    videoRef.current.controls = false; // Ensure default controls are disabled
  }, [captionsEnabled, speed, volume]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoSrc(URL.createObjectURL(file));
    }
  };

  const togglePlay = () => {
    if (playing) videoRef.current.pause();
    else videoRef.current.play();
    setPlaying(!playing);
  };

  const handleFullScreenClick = () => {
    if (Screenfull.isEnabled) {
      Screenfull.request(videoRef.current);
    }
  };

  const handleControlsVisibility = () => {
    setShowControls(true);
    clearTimeout(hideControlsTimeout);
    hideControlsTimeout = setTimeout(() => setShowControls(false), 1000);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" bgcolor="#000" p={2} height="100vh" width="100vw" overflow="hidden">
      <input
        type="file"
        accept="video/*"
        style={{ display: "none" }}
        id="file-input"
        onChange={handleFileChange}
      />
      <label htmlFor="file-input">
        <Button variant="contained" color="primary" component="span" startIcon={<UploadFile />}>Choose Video</Button>
      </label>
      <Box 
        width="100%" 
        height="80vh" 
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        position="relative"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onClick={() => {
          togglePlay();
          handleControlsVisibility();
        }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          loop={loop}
          style={{ width: "100%", height: "100%", objectFit: "contain", filter: `brightness(${brightness})`, transform: rotate ? "rotate(90deg)" : "none" }}
          controls={false} // Ensure default controls are hidden
        >
          <track src="captions.vtt" kind="subtitles" srcLang="en" label="English" />
        </video>
        {showControls && (
          <Box display="flex" alignItems="center" gap={1} bgcolor="rgba(0, 0, 0, 0.6)" p={2} borderRadius={2} flexWrap="wrap" justifyContent="center" width="100%" position="absolute" bottom="10px">
            <IconButton onClick={togglePlay} color="primary">{playing ? <Pause /> : <PlayArrow />}</IconButton>
            <IconButton onClick={() => videoRef.current.currentTime -= 10} color="primary"><Replay10 /></IconButton>
            <IconButton onClick={() => videoRef.current.currentTime += 10} color="primary"><Forward10 /></IconButton>
            <IconButton onClick={() => setLoop(!loop)} color="primary"><Loop /></IconButton>
            <IconButton onClick={handleFullScreenClick} color="primary"><Fullscreen /></IconButton>
            <IconButton onClick={() => document.pictureInPictureEnabled && videoRef.current.requestPictureInPicture()} color="primary"><PictureInPicture /></IconButton>
            <IconButton onClick={() => setCaptionsEnabled(!captionsEnabled)} color="primary"><ClosedCaption /></IconButton>
            <Tooltip title="Rotate">
              <IconButton onClick={() => setRotate(!rotate)} color="primary"><ScreenRotation /></IconButton>
            </Tooltip>
            <Tooltip title="Speed">
              <Slider value={speed} min={0.5} max={2} step={0.1} onChange={(e, val) => setSpeed(val)} sx={{ width: 100 }} />
            </Tooltip>
            <Tooltip title="Volume">
              <Slider value={volume} min={0} max={100} onChange={(e, val) => setVolume(val)} sx={{ width: 100 }} />
            </Tooltip>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default VideoPlayer;
