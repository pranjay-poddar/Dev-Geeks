import React from 'react'
import styles from '../styles'
import { appStoreWhiteBtn, blueTick, googleBlackBtn, qrCode } from '../assets'


const Hero = () => (
  <div className="flex flex-col pt-[120px] pb-20 lg:pt-[184px] lg:pb-32 md:items-center md:text-center">
    <h1 className='text-[48px] text-secondary font-semibold mb-6 leading-tight lg:text-7xl lg:mb-10'>The World's Leading <br className='hidden md:block' /> Cryptocurrency Platform</h1>

    <div className="text-para text-base font-normal md:ml-10 lg:text-xl mb-10 md:mb-12">
      <div className="flex leading-relaxed">
        <img src={blueTick} alt="verified" className='w-3 object-contain mr-2'/>
        <p>Trusted by more than <span className='text-theme'>80M users</span>  world-wide</p>
      </div>
      <div className="flex leading-relaxed">
        <img src={blueTick} alt="verified" className='w-3 object-contain mr-2'/>
        <p>Leader in <span className='text-theme'>regulatory compliance</span> and <span className='text-theme'>security certifications</span></p>
      </div>
      <div className="flex leading-relaxed">
        <img src={blueTick} alt="verified" className='w-3 object-contain mr-2'/>
        <p>The industry's most comprehensive <span className='text-theme'>insurance coverage</span> and <span className='text-theme'>verified proof of reserves</span></p>
      </div>
    </div>

    <div className={`${styles.flexCenter}`}>
      <img src={appStoreWhiteBtn} alt="appStore" className='w-[139px] mr-2 border-[1px] border-white rounded-md cursor-pointer ' />
      <img src={googleBlackBtn} alt="playStore" className='w-[139px] border-[1px] border-white rounded-md cursor-pointer h-[47px]' />
      <img src={qrCode} alt="QR" className='hidden md:flex w-20 ml-6 object-contain' />
    </div>
  </div>
)

export default Hero
