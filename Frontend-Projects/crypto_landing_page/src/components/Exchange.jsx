import React from 'react'
import { grayBg } from '../assets'
import styles from '../styles'
import { laptop, phone } from '../assets'
import Button from './Button'

const Exchange = () => (
  <div className='relative overflow-hidden'>
    <div>
      <img src={grayBg} alt="background" className='absolute z-0 object-fill min-h-[600px]' />
    </div>
    <div className={`${styles.paddingX} relative`}>
      <div className='mb-40'>
        <div className={`z-[9999] py-20 md:py-14 lg:py-20 flex flex-col items-start md:items-center md:text-center`}>
          <p className='text-theme mb-4 text-sm font-bold'>CRYPTO.COM EXCHANGE</p>
          <h1 className='text-[32px] font-semibold lg:text-[42px] leading-tight'>Trade with confidence on the world's fastest <br className='hidden md:block' /> and most secure crypto exchange</h1>
        </div>

        <div className='hidden md:flex justify-center items-center'>
          <div className={`${styles.flexCenter} flex-col`}>
            <p className='text-theme mb-4 font-semibold'>DESKTOP</p>
            <Button text="Go To Crypto.com Exchange" color="black" />
          </div>
        </div>
      </div>

      <div className={`${styles.flexCenter}`}>
        <img src={laptop} alt="laptop" className='w-2/3 object-contain max-w-[200px] md:max-w-[350px] lg:max-w-[500px]' />
        <img src={phone} alt="phone" className='w-1/3 object-contain max-w-[100px] md:max-w-[180px] lg:max-w-[270px]' />
      </div>
    </div>
  </div>
)

export default Exchange
