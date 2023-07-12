import React from 'react'
import { Link } from 'react-router-dom'
import video9 from '../shopping video/video9.mp4'
import './Home.css'

export default function Home(props) {
  return (
    <div className="main">
      <div className='overlay'></div>
      <video src={video9} autoPlay loop muted/>
      <div className="content">
      {props.loggedIn || props.value ? (
          <>
          <Link className='text-white'  style={{fontSize:'xx-large'}} to='/rooms'>Access Inventory</Link>
          </>
      ) : (
          <>
          <Link className='text-white'  style={{fontSize:'xx-large'}} to='/login'>Login to Shop</Link>
          </>
      )}
      </div>     
    </div>
  )
}