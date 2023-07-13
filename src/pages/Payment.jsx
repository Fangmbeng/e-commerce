import React from 'react'
import video8 from '../shopping video/video8.mp4'
import {BiLogoPaypal} from 'react-icons/bi'
import {FaCcVisa, FaCcMastercard} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Payments() {
  return (
    <div className="main">
      <div className='overlay1'></div>
      <video src={video8} autoPlay loop muted/>
      <div className="content">
      <div class="container text-center">
      <h1 className='text-center text-white'><strong>Choose Payment Method</strong></h1>
        <div class="container w-25 bg-white opacity-75 inline">
            <a href="https://www.paypal.com/us/home"><h1 class="row text-primary-dark w-10rem" ><BiLogoPaypal/></h1><h6><em>Pay with paypal</em></h6></a>
            <Link to="/error"><h1 class="row w-10rem" ><FaCcVisa/><FaCcMastercard/></h1><h6>Pay with credit/debit card</h6></Link>
        </div>
        </div>
    </div>
    </div>
  )
}

export default Payments