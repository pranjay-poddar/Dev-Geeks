import React from 'react'


export default function card(props) {
  return (
   <>
   <nav>
    <ul>
      <div >
    <li className="boxes">
              <div className="card" style={{width:'18rem',backgroundColor:props.color==='dark'?'black':'white',color:props.color==='light'?'black':'white'}}>
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="/" className="btn btn-primary">Go somewhere</a>
            </div>

            </div>
    </li>
    </div>
    
    </ul>
    </nav>
    </>
  )
}
