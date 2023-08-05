import React from 'react'
import Header from '../Header/Header'
import './Hero.css'
import hero_image from '../../assets/hero_image.png'
import hero_image_back from '../../assets/hero_image_back.png'
import Heart from '../../assets/heart.png'
import calories from '../../assets/calories.png'
import { motion } from 'framer-motion'
import NumberCounter from 'number-counter'
import { useEffect } from 'react'
const Hero = () => {
    const transition = { type: 'spring', duration: 3 }
    const mobile = window.innerWidth<=768 ? true:false;
    return (
        <div className='hero' id='Home' >
            <div className="hero-left">
                <Header />
                <div className="ad">
                    <motion.div
                        initial={{ left: mobile ? '155px':'225px' }}
                        whileInView={{ left: '8px' }}
                        transition={{ ...transition, type: 'tween' }}
                    >
                    </motion.div>
                    <span>The Best Fitness Club in Town</span>
                </div>
                <div className='hero-text'>
                    <div>
                        <span className='stroke-text'>Shape </span>
                        <span>Your</span>
                    </div>
                    <div>
                        <span>
                            Ideal Body
                        </span>
                    </div>
                    <div className="span">
                        <span>
                            We will help you to shape and build your ideal body and live up your life to fullest
                        </span>
                    </div>
                </div>
                <div className="figures">
                    <div>
                        <span><NumberCounter end={145} start={88} delay='7s' preFix='+' /> </span>
                        <span>Expert Coach</span>
                    </div>
                    <div>
                        <span><NumberCounter end={987} start={888} delay='4s' preFix='+' /></span>
                        <span>Members Joined</span>
                    </div>
                    <div>
                        <span><NumberCounter end={55} start={0} delay='4s' preFix='+' /></span>
                        <span>Fitness Programs</span>
                    </div>
                </div>
                <div className="hero-buttons">
                    <button className="btn">Get Started</button>
                    <button className="btn">Learn More</button>
                </div>
            </div>
            <div className="hero-right">
                <button className="btn">Join Now</button>
                <motion.div initial={{ right: '-1rem' }}
                    whileInView={{ right: '4rem' }}
                    transition={transition} className="heart-rate">
                    <img src={Heart} alt="Heart" />
                    <span>Heart Rate </span><span>116 bpm</span>
                </motion.div>
                <img src={hero_image} alt="" className='hero-image' />
                <motion.img 
                transition={transition}
                initial={{right:'11rem'}}
                whileInView={{right:'20rem'}}
                src={hero_image_back} alt="" className='hero-image-back' />
                <motion.div 
                initial={{right:'37rem'}}
                whileInView={{right:'28rem'}}
                transition={transition}
                className="calories">
                    <img src={calories} alt="" />
                    <span>Calories Burned</span><span> 220 kcal</span>
                </motion.div>
            </div>
        </div>
    )
}

export default Hero

