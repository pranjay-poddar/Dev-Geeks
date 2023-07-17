import React from 'react'
import styles from '../styles'

const BuyCrypto = () => (
  <div className={`py-20 lg:py-32 ${styles.flexCenter} flex-col justify-center text-center `}>
    <div>
      <h4 className='text-base lg:text-lg text-theme font-bold mb-2 tracking-wider lg:mb-4'>SECURELY BUY, SELL, STORE, SEND and TRACK</h4>
    </div>
    <div className='mb-6'>
      <h1 className='text-5xl font-semibold leading-tight text-secondary lg:text-7xl'>Buy crypto at true cost</h1>
    </div>
    <div className='mx-auto'>
      <p className='text-secondary text-base lg:text-xl'>Buy and sell 250+ cryptocurrencies with 20+ fiat currencies <br className='hidden md:block' /> using bank transfers or your credit/debit card.</p>
    </div>
  </div>
)

export default BuyCrypto
