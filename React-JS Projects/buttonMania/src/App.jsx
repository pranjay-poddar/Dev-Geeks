import React from 'react'
import './App.css'
import Nav from './components/Nav/Nav'
import AllButton from './components/Buttons/AllButton'

const App = () => {
  return (
    <div>
    <div className="gradient">
      {/* <div className='side-shape'></div> */}
    </div>
    <div className='container'>
      <div className='sub-container'>
        <Nav />
        <AllButton />
      </div>
    </div>
    </div>
  )
}

export default App
