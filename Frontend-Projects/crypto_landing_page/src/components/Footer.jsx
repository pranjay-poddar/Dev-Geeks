import React, { useState } from 'react'
import styles from '../styles'
import { footerAccordion, socialLinks, companyImages } from '../constants'
import { downArrow } from '../assets'

const Footer = () => {


  return (
    <div className={`${styles.flexCenter} bg-[#0B1426] w-full`}>
      <div className={`${styles.boxWidth} flex flex-col justify-between ${styles.paddingX} pt-20 pb-12 lg:pt-32`}>

        {footerAccordion.map((elem) => {
          const [toggle, setToggle] = useState(false)
          return (
            <div className='mb-8 md:hidden'>
              <div key={elem.id} className="text-[#EAEEF4] flex justify-between cursor-pointer font-medium" onClick={() => setToggle(prevState => !prevState)}>
                <h1> {elem.title}</h1>
                <img src={downArrow} alt="goTo" className='w-4 object-contain' />
              </div>
              <div>
                {toggle && elem.content.map((content, index) => (
                  <p className={ `text-white text-xs font-medium pb-4 ${ index === 0? 'pt-3' : 'pt-0' } cursor-pointer` }>{content}</p>
                ))}
              </div>
            </div>
          )
        })}
        <div className={`hidden md:flex justify-start items-start flex-wrap`}>
        {
          footerAccordion.map((elem) => (
            <div key={elem.id} className={`flex flex-col text-white mx-5 mb-8`}>
              <h1 className='text-[17px] mb-4 cursor-pointer'>{elem.title}</h1>
              {elem.content.map((content) => (
                <p className='text-xs mb-2 cursor-pointer'>{content}</p>
              ))}
            </div>
          ))
        }
        </div>

        <div className='flex mt-12 justify-center md:justify-between '>

        <div className={`${styles.flexCenter} flex-wrap max-w-[400px]`}>
          {socialLinks.map((Icon) => (
            <img src={Icon.icon} alt="" className='w-5 mx-5 mb-6' />
          ))}
        </div>

        <div className={`${styles.flexCenter} flex-wrap hidden md:flex max-w-[400px]`}>
          {companyImages.map((comp) => (
            <img src={comp.logo} alt="Our partner" className='w-12 mx-5 mb-6 ' />
          ))}
        </div>
        </div>

        <div className='text-[#A0A9BE] text-xs mt-16 md:mt-24 lg:mt-28 font-normal'>
          <p className='pt-4'>
          The purpose of this website is solely to display information regarding the products and services available on the Crypto.com App. It is not intended to offer access to any of such products and services. You may obtain access to such products and services on the Crypto.com App.
          </p>
          <p className='pt-4'>
          Please note that the availability of the products and services on the Crypto.com App is subject to jurisdictional limitations. Crypto.com may not offer certain products, features and/or services on the Crypto.com App in certain jurisdictions due to potential or actual regulatory restrictions.
          </p>
          <div className='h-[1px] my-4 bg-[#F4F4F4] opacity-20'></div>
          <p className='mt-4'>
          Copyright © 2018 - 2023  Crypto.com. All rights reserved.
          </p>
          <p className='mt-2'>Privacy Notice | Status</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
