"use client"
import React from 'react'
import "./formDataStyling.css"
import Spinner from "../src/_components/Spinner"
import { useState } from 'react';
import Image from 'next/image';

const FormData = () => {
  const [id, setId] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);
  const [data, setData] = useState<null | any>(null);
  const [load, setLoad] = useState<boolean>(false)
  let num = -1;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoad(true);
    fetch(`/api/submit?id=${id}&info=${password}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => { setLoad(false); data.length > 0 ? setData(data) : alert("Something went wrong!") })
      .catch((error) => { alert("Something went wrong") });
  }

  const showImage = (index: number) => {

    const imageArray = document.querySelectorAll(".img-container");
    imageArray.forEach((el) => {
      (el as HTMLElement).style.display = "none";
    });
    (imageArray[index] as HTMLElement).style.display = "block";
  }

  return (
    <>
      {
        data ?
          <>
            <div id='body'>
              <div className="cards-container">
                {
                  data.map((user: any, index: number) => {
                    if (user.isBank) {
                      return (
                        <div className="card" key={`card${index}`}>
                          <h3>{user.name}</h3>
                          <div>
                            <p>Email: <span>{user.email}</span></p>
                            <p>Reg. No.: <span>{user.regNum}</span></p>
                            <p>Mob. No: <span>{user.phNum}</span></p>
                          </div>
                          <div className="img-container"></div>
                          <p>A/C No.: <span>{user.accNum}</span></p>
                          <p>IFSC: <span>{user.IFSCNum}</span></p>
                          <p>Name: <span>{user.nameAccNum}</span></p>
                        </div>
                      )
                    }
                    else {
                      return (
                        <div className="card" key={`card${index}`}>

                          <div className="card-info">

                            <div className='img-container' style={{ display: "none" }}>
                              <Image src={user.QRCode} alt="QR Code" className='qrcode' />
                            </div>
                            <h3>{user.name}</h3>
                            <div>
                              <p>Email: <span>{user.email}</span></p>
                              <p>Reg. No.: <span>{user.regNum}</span></p>
                              <p>Mob. No: <span>{user.phNum}</span></p>
                              <p>UPI ID: <span>{user.UPIID}</span></p>
                            </div>
                            <button className="show-image-btn" onClick={() => showImage(index)}>Show Image</button>
                          </div>
                        </div>
                      )
                    }
                  })
                }
              </div>
              <div className='main-img-container'>
              </div>
            </div>
          </>
          :
          load ?
            <Spinner /> :
            <div id='login'>
              <form onSubmit={handleSubmit}>
                <h1>NCC ADMIN </h1>
                <div>
                  <input type="text" placeholder='Please Enter User ID' required onChange={(e) => setId(e.target.value)} />
                </div>
                <div>
                  <input type="text" placeholder='Please Enter Password' required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div id='btn-container'>
                  <button type='submit'>Submit</button>
                </div>
              </form>
            </div>
      }
    </>
  )
}

export default FormData;
