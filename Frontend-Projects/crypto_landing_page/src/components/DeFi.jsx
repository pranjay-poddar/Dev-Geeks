import React from 'react'
import styles from '../styles'
import { deFiText } from '../constants'
import Button from './Button'
import { deFiPhone } from '../assets'

const DeFi = () => {
  return (
    <div className={`${styles.flexCenter} bg-[#F4F4F4] w-full`}>
      <div className={` ${styles.boxWidth} ${styles.flexCenter} flex-col justify-between md:flex-row ${styles.paddingX} justify-self-start py-20 `}>
      <div className={`${styles.flexStart} flex-col`}>
        <h4 className='text-theme font-semibold text-sm mb-2 lg:text-lg'>CRYPTO.COM DEFI</h4>
        <h2 className='text-[42px] mb-8 font-semibold lg:text-[64px]'>DeFi Made Simple</h2>
        <div>
          {deFiText.map((text) => (
            <h5 key={text.id} className={`${ text.id != deFiText.length? 'mb-4' : 'mb-16' } text-[#7D7D7D] text-[17px] font-semibold lg:text-2xl`}><span className='text-black'>{text.title}</span> {text.points}</h5>
          ))}
        </div>
        <Button text="Go to Crypto.com DeFi" color="black" />
      </div>
      <div>
        <img src={deFiPhone} alt="deFi" className='pt-12 pl-7 md:pl-[70px] md:pt-5 md:w-[350px] lg:w-auto' />
      </div>
      </div>
    </div>
  )
}

export default DeFi
