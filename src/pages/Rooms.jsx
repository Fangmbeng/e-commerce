import React from 'react'
import Articles from './Articles'
import video3 from '../shopping video/video3.mp4'

export default function Rooms(props) {
  return (
      <div className="main">
      <div className='overlay'></div>
      <video src={video3} autoPlay loop muted/>
      <div className="content">
        <>
        <Articles value={props.value} loggedIn={props.loggedIn}/>
        </>
    </div>
    </div>
  )
}