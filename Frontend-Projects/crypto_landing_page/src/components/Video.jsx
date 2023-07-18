import React from 'react'
import { bgVideo } from '../assets'
import styles from '../styles'
import Button from './Button'

const Video = () => (
  <div className={`h-[643px] md:h-[682px] lg:h-[1074px] box-border ${styles.flexCenter} relative`}>
    <div className={`z-[60] ${styles.flexCenter} flex-col p-6 text-center`}>
      <div className='text-theme text-base mb-4  md:text-lg font-bold leading-relaxed'>
      CRYPTO.COM VISA CARD
      </div>
      <div className='text-[#F4F4F4] text-[42px] font-semibold leading-tight md:text-5xl lg:text-[64px] mb-5 lg:mb-8'>
      The only card you need
      </div>
      <div className='mb-16 text-base text-[#F4F4F4] lg:text-xl'>
      Enjoy up to 5% back on all spending with your sleek, pure metal card. <br /> No annual fees. Top-up with fiat or crypto.
      </div>
      <div>
        <Button text="Choose Your Card" />
      </div>
    </div>
    <video autoPlay muted loop className='h-full w-full object-fill absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 brightness-50 z-50'>
      <source src={bgVideo} type="video/mp4" />
    </video>

  </div>
)


export default Video
