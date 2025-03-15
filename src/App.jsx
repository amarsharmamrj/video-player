import { useState } from 'react'
import './App.css'

import VideoPlayer from "./components/VideoPlayer"

// https://www.w3schools.com/html/mov_bbb.mp4
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement


function App() {

  return (
    <>
      <div>
        <VideoPlayer />
      </div>
    </>
  )
}

export default App
