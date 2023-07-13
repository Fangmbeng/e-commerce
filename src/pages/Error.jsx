import React from 'react'
import video8 from '../shopping video/video8.mp4'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className="main">
    <div className='overlay1'></div>
    <video src={video8} autoPlay loop muted/>
    <div className="content">
      <h1 className='text-white'><strong>Error 404</strong></h1>
      <h6 className='text-white'><em>We currently working on this. Please try another method of payment</em></h6>
      <Link href="/payments"><button className='btn btn-dark opacity-75'>Try other Mehods</button></Link>
    </div>
    </div>
  )
}

export default Error