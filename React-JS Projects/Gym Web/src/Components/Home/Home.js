import React from 'react'
import Sign from '../Sign/Sign'
import Hero from '../Hero/Hero'
import Program from '../Programs/Program'
import Reason from '../Reasons/Reason'
import Plans from '../Plans/Plans'
import Testimonials from '../Testimonials/Testimonials'
import Join from '../Join/Join'
import Footer from '../Footer/Footer'
const Home =()=> {
  return (
    <div>
        <span style={{color: 'white'}}>
            <Sign/>
            <Hero/>
            <Program/>
            <Reason/>
            <Plans/>
            <Testimonials/>
            <Join/>
            <Footer/>
          </span>
    </div>
  )
}

export default Home