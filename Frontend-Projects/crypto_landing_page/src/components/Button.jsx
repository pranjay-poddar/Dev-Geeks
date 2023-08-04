import React from 'react'
import { rightArrow } from '../assets'
import styles from '../styles'

const Button = ({text, color}) => (
  <div className={`${styles.flexCenter} border-[1px] border-${color} py-4 px-8 rounded-[5px] cursor-pointer overflow-hidden`}>
    <div className={`text-${color} text-2xl font-semibold`}>{text}</div>
    <div className='w-6 ml-3 mt-1'>
      <img src={rightArrow} alt="goTo"/>
    </div>
  </div>
)
export default Button

Button.defaultProps = {
  color: 'white',
}
