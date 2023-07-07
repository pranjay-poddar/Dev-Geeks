import React from 'react'
import PropTypes from 'prop-types'

export default function Navbar(props) {
  return (
    <div>
        
<nav className=" border-gray-200 bg-gray-950 ">
  
  <div className="max-w-screen-xl flex flex-wrap items-center  mx-20 p-4">
  
      <span className="mt-6 self-center text-5xl  font-semibold whitespace-nowrap dark:text-white font-mono">{props.title}</span>
      {props.searchBar?<input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
    :""}
    </div>
    
     
        
       

</nav>

    </div>
  )
}
Navbar.defaultProps={
    title:"Your Title Here",
    searchBar: true
}


Navbar.PropTypes={
    title:PropTypes.string,
    searchBar:PropTypes.bool.isRequired
}