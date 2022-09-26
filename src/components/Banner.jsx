import React, { useState } from 'react'
import "../css/Banner.css"
import img from "../assets/jpg/logo.jpeg"



import {useNavigate} from "react-router-dom"

function Banner() {
  const navigate = useNavigate();
  const [showSearch, setShowSearh] = useState(false)

  return (
    <div className='banner'  >
      
        <div className="banner__info">

      
        
        <img src={img} alt='logo' style={{height:40,width:40,position:'relative',top:-100,left:-30}}/>
      
        <button className='btn btn-danger' style={{height:40,width:90,position:'relative',top:-119,left:1040}} onClick={()=>navigate('/sign-in')}>Sign In</button>
        <h1 >Get out and stretch your imagination</h1>
        <h5>
          Plan a different kind of getaway to uncover the hidden gems near you.
        </h5>
        <button class="btn" onClick={()=>navigate('/explore')} variant='outlined'>Explore Nearby</button>
        
    </div>

    </div>
  )
}

export default Banner