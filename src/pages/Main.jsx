import React from 'react'
import About from '../components/About'
import Banner from '../components/Banner'
import Navbar from '../components/Navbar'
import Body from './Body'

function Main() {
  return (
    <div>
        <Navbar/>
        <Banner/>
        <About/>
        <Body/>
    </div>
  )
}

export default Main