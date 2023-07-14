import React from 'react'
import img1 from '../shopping_images/img1.jpg'
import img2 from '../shopping_images/img2.jpg'
import img3 from '../shopping_images/img3.jpg'
import img4 from '../shopping_images/img4.jpg'
import img5 from '../shopping_images/img5.jpg'
import img6 from '../shopping_images/img6.jpg'
import img7 from '../shopping_images/img7.jpg'

import './Background_slider.css'

function BackgroundSlider() {
  return (
    <div className='body_slider'>
    <div className='slider'>
        <span style={{"--i":1}}><img src={img1} alt="" /></span>
        <span style={{"--i":2}}><img src={img2} alt="" /></span>
        <span style={{"--i":3}}><img src={img3} alt="" /></span>
        <span style={{"--i":4}}><img src={img4} alt="" /></span>
        <span style={{"--i":5}}><img src={img5} alt="" /></span>
        <span style={{"--i":6}}><img src={img6} alt="" /></span>
        <span style={{"--i":7}}><img src={img7} alt="" /></span>
    </div>
    </div>
  )
}

export default BackgroundSlider