/*import React from 'react';
import './ContactUs.css';*/

const ContactUs = () => {
  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <div className="contact-us-details">
        <p>Address: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Phone: +1 123-456-7890</p>
        <p>Email: contact@restaurant.com</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <form className="reservation-form">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="number" placeholder="Phone" />
        <input type="date" placeholder="Date" />
        <input type="time" placeholder="Time" />
        <input type="number" placeholder="No. of Guests" />
        <button type="submit">Make Reservation</button>
      </form>
    </div>
  );
}

export default ContactUs;