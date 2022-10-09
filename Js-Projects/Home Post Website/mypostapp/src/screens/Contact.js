import React from 'react'
import './Contact.css'

function Contact() {
  return (
    <div className="container" >
      <h3 className="text-center text-uppercase pt-4">Contact</h3>
      <div className="mx-auto conatct-form-conatiner shadow-sm rounded p-3 lh-1 text-muted">
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label" required>Name</label>
            <input type="text" className="form-control" id="name" />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Contact Number</label>
            <input type="text" className="form-control" id="conatct-number" />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">When can we reach you?</label>
            <select className="form-select" id="timing">
              <option defaultValue="">Best time to reach</option>
              <option value="M">Morning</option>
              <option value="A">Afternoon</option>
              <option value="E">Evening</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="query" className="form-label" required> Enter your query</label>
            <textarea className='form-control' id='query'></textarea>
          </div>

          <div className='d-grid' >
          <button type="submit" className="btn btn-warning" style={{color: 'red'}} >Submit</button>

          </div>
        </form>
      </div >
    </div >
  )
}

export default Contact