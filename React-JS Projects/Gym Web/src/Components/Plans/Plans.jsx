import React from 'react'
import './Plans.css'
import {plansData} from '../../data/plansData.js'
import whitetick from '../../assets/whiteTick.png'
const Plans = () => {
  return (
    <div className='plans-container' >
        <div className="programs-header" style={{gap:'2rem'}} >
            <span className='stroke-text'>READY TO START</span>
            <span>YOUR JOURNEY</span>
            <span className='stroke-text'>NOW WITH US</span>
        </div>
        <div className="plans" id='Plans'>
            {plansData.map((plan,i)=>(
                <div className="plan" key={i}>
                    {plan.icon}
                    <span>{plan.name}</span>
                    <span>₹ {plan.price}</span>
                    <div className="features">
                        {plan.features.map((feature,i)=>(
                            <div className="feature">
                                <img src={whitetick} alt="" />
                                <span key={i}>{feature}</span>
                            </div>
                        ))}
                    </div>
                    <div>
                        <span>See More Benefits</span>
                    </div>
                    <button className="btn">Join Now</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Plans
