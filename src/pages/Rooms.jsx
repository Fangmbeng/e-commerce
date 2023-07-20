import React from 'react'
import Articles from './Articles'
import video3 from '../shopping video/video3.mp4'

export default function Rooms(props) {
  return (
      <div className="main">
      <video src={video3} autoPlay loop muted/>
      <div >
      <div className="content1">
        <>
        <h1 className='text-center'> <em>Check our latest products</em></h1>
        <Articles flashMessage={props.flashMessage} value={props.value} loggedIn={props.loggedIn}/>
        </>
    </div>
    </div>
    </div>
  )
}