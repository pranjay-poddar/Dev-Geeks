import React from 'react'
import styles from '../styles'
import { wallet } from '../assets'
import Button from './Button'

const Vision = () => (
  <div className={`${styles.flexCenter} w-full`}>
    <div className={`${styles.boxWidth} flex flex-col justify-between ${styles.paddingX} py-20 lg:py-32`}>
      <h4 className='text-theme font-bold mb-4 text-sm lg:text-lg self-center'>
        OUR VISION
      </h4>
      <div className='text-[#F4F4F4] text-[42px] md:max-w-[400px] text-center lg:text-[64px] lg:max-w-[700px] font-bold self-center'>
        Cryptocurrency in Every Wallet™
      </div>
      <img src={wallet} alt="Vision" className='max-w-[320px] md:max-w-[480px] lg:max-w-[580px] self-center' />

      <div className='flex justify-between pb-16'>
        <div className='w-1/2 p-4 text-center'>
          <h5 className='text-[17px] text-[#F4F4F4] mb-2 font-semibold lg:text-2xl lg:mb-4'>
            Founded in
          </h5>
          <h2 className='text-theme text-[42px] font-semibold md:text-[34px] lg:text-[64px]'>
            2016
          </h2>
        </div>
        <div className='w-1/2 p-4 text-center'>
          <h5 className='text-[17px] text-[#F4F4F4] mb-2 font-semibold lg:text-2xl lg:mb-4'>
            Users
          </h5>
          <h2 className='text-theme text-[42px] font-semibold md:text-[34px] lg:text-[64px]'>
            80M
          </h2>
        </div>
      </div>
      <div className='inline-block max-w-[250px] self-center'>
        <Button text="About Us" />
      </div>
    </div>
  </div>
)

export default Vision
