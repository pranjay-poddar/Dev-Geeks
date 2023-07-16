import React from 'react'
import { buyAndSell } from '../assets'

const Phone = () => {
  return (
    <div className='relative'>
      <div className='w-full h-full top-0 left-0 absolute flex'>
        <div className='w-[542px] h-[542px] blueGradient md:w-[712px] md:h-[712px] lg:w-[1050px] lg:h-[1050px]'>

        </div>
      </div>
      <div className='perspect box-border'>
        <div className='origin-[50%_0px]'>
          <img src={buyAndSell} alt="Crypto.com" className='w-[220px] max-w-full mx-auto object-contain md:w-[300px] lg:w-[470px]' />
        </div>
      </div>
    </div>
  )
}

export default Phone
