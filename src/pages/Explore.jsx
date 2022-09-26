import React from 'react'
import {Link} from 'react-router-dom'
import Slider from '../components/Slider'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import saleCategoryImage from "../assets/jpg/sellCategoryImage.jpg"

import Offers from './Offers'
import Search from '../components/Search'

function Explore() {
  return (
    <div className='explore'>
      
      <header>
        <p className="pageHeader">Explore</p>
      </header>

      <main>

       <Slider/>
 
        <p className="exploreCategoryHeading">Categories</p>
        <Search/>
        <div className="exploreCategories">
          <Offers/>
        </div>
      </main>
    </div>
  )
}

export default Explore