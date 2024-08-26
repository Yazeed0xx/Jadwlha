import React from 'react'
import Landing from '@/components/Landing'
import Navbar from '@/components/Navbar'
import Card from '@/components/Card'
import Animation from '@/components/Animation'
import Footer from '@/components/Footer'

function home() {
  return (
    <div>
      <Navbar/>
<Landing/> 
<Animation/>
<Card/>  
<Footer/>
  
    </div>
  )
}

export default home