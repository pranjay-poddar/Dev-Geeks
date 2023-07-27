import React from 'react'
import styles from './styles'

import { Navbar, Hero, Phone, BuyCrypto, Video, EarnCrypto, Exchange, DeFi, Vision, Footer, } from "./components/index"

const App = () => (
  <div className='bg-primary w-full overflow-hidden'>
    <div className={`${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}
    ${styles.paddingX}`}>
        <Navbar />
        <Hero />
      </div>
    </div>
    <div className={`${styles.flexCenter} flex-col`}>
      <div className={`${styles.boxWidth} ${styles.paddingX}`}>
        <Phone />
        <BuyCrypto />
      </div>
    </div>
    <div>
      <Video />
    </div>
    <div className={`${styles.flexCenter}`}>
    <div className={`${styles.boxWidth}  ${styles.paddingX}`}>
      <EarnCrypto />
      </div>
    </div>
    <div>
      <Exchange />
    </div>
    <div className={`${styles.flexCenter} flex-col`}>
      <DeFi />
      <Vision />
      <Footer />
    </div>
  </div>


)


export default App
