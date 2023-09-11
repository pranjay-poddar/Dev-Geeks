import React from 'react'
import ButtonCard from '../ButtonCard/ButtonCard'
import './AllButton.css'
import { neumorphicGreyBtn } from '../../assets'

const AllButton = () => {
  return (
    <main className='btn-container'>
      <ButtonCard 
        btnImg={ neumorphicGreyBtn } 
        imgAlt="neumorphic grey button"
        codepenLink="https://codepen.io/Palak-Goyal/pen/dygEaVp"
        zipFileName='trial-button'
        authorName="Palak Goyal"
        githubLink="https://github.com/palakkgoyal"
      />
      <ButtonCard 
        btnImg={ neumorphicGreyBtn } 
        imgAlt="neumorphic grey button"
        codepenLink="https://codepen.io/Palak-Goyal/pen/dygEaVp"
        zipFileName='trial-button'
        authorName="Palak Goyal"
        githubLink="https://github.com/palakkgoyal"
      />
      <ButtonCard 
        btnImg={ neumorphicGreyBtn } 
        imgAlt="neumorphic grey button"
        codepenLink="https://codepen.io/Palak-Goyal/pen/dygEaVp"
        zipFileName='trial-button'
        authorName="Palak Goyal"
        githubLink="https://github.com/palakkgoyal"
      />
      <ButtonCard 
        btnImg={ neumorphicGreyBtn } 
        imgAlt="neumorphic grey button"
        codepenLink="https://codepen.io/Palak-Goyal/pen/dygEaVp"
        zipFileName='trial-button'
        authorName="Palak Goyal"
        githubLink="https://github.com/palakkgoyal"
      />
    </main>
  )
}

export default AllButton
