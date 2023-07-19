import React from 'react'
import styles from '../styles'
import Button from './Button'
import { earnNotif1, earnNotif2, earnPhone } from '../assets'

const EarnCrypto = () => (
    <div className={`${styles.flexCenter} py-20 lg:py-32 flex-col md:flex-row-reverse justify-between`}>
        <div className='text-center md:w-1/2'>
            <div className='text-theme mb-4 text-sm tracking-wide font-semibold md:text-base lg:text-lg md:text-start md:ml-6'>
                CRYPTO EARN
            </div>
            <div className='mb-8 text-5xl text-[#F4F4F4] font-semibold md:text-4xl lg:text-[64px] leading-tight lg:leading-[4.5rem]  tracking-tight'>
                Get the most out of your assets, safely
            </div>
            <div className='mb-16 md:mb-8 lg:mb-16 text-para text-base md:text-sm lg:text-xl'>
                Choose from 21+ cryptocurrencies and stablecoins.
            </div>
            <div className='inline-block mb-20'>
                <Button text="Calculate Rewards" />
            </div>
        </div>
        <div className='relative md:mr-28'>
            <div>
                <img src={earnPhone} alt="Earn Crypto" className='h-[500px] md:h-auto'/>
            </div>
            <div>
                <img src={earnNotif1} alt="earnNotif1" className='absolute top-[3.5%] left-[40%] w-[300px] overflow-clip' />
            </div>
                <img src={earnNotif2} alt="earnNotif2" className='absolute top-[20%] left-[45%] w-[300px] md:top-[20%] lg:top-[17%] overflow-clip' />
        </div>
    </div>
)

export default EarnCrypto
