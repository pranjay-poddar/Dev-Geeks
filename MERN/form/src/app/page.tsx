"use client"
import { useState } from "react";
import Spinner from '../_components/Spinner';
import Message from '../_components/Message';

export default function Home() {

  const [imgLoad, setImgLoad] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  const [showMsg, setShowMsg] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [regNum, setRegNum] = useState('');
  const [phNum, setPhNum] = useState<null | number>(null);

  const [isUPI, setIsUPI] = useState(false);
  const [isBank, setIsBank] = useState(false);

  const [UPIID, setUPIID] = useState<null | string>(null);
  const [QRCode, setQRCode] = useState<null | ArrayBuffer | string>(null);
  const [accNum, setAccNum] = useState<null | number>(null);
  const [IFSCNum, setIFSCNum] = useState<null | string>(null);
  const [nameAccNum, setnameAccNum] = useState<null | string>(null);


  const sendDataToServer = (data: object) => {
    setLoader(true);
    fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoader(false);
        setMsg(data.message);
        setShowMsg(true);
      })
      .catch((error) => {
        setLoader(false);
        setMsg("Please Try Again !");
        setShowMsg(true);
      });
  };

  const convertImage = (file: File) => {
    setImgLoad(true)
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result;
        setQRCode(base64String);
        setImgLoad(false);
      };
    }
    catch(err){
      setQRCode(null);
      setMsg("Please Upload Again!");
      setImgLoad(false);
      setShowMsg(true);
    }

  };

  const SubmitData = (e: any) => {
    e.preventDefault();
    const data = { name, email, regNum, phNum, isUPI, isBank, UPIID, QRCode, accNum, IFSCNum, nameAccNum };
    sendDataToServer(data);
  }
  const resetData = () => {
    setUPIID(null);
    setQRCode(null);
    setAccNum(null);
    setIFSCNum(null);
    setnameAccNum(null);
  }
  return (
    <div className="body">
      <header id="headingContainer" className="item-center p-10">
        <h3 >Money Management FORM</h3>
      </header>
      <form onSubmit={SubmitData} className="p-10">
        <div id="personalInfoContainer">
          <input type="text" name='' required onChange={(e) => { setName(e.target.value) }} placeholder={"Full Name"} />
          <input type="email" name='' required onChange={(e) => { setEmail(e.target.value) }} placeholder={"Email"} />
          <input type="text" name='' required onChange={(e) => { setRegNum(e.target.value) }} placeholder={"Telephone Number"} />
          <input type="number" name='' required onChange={(e) => { setPhNum(parseInt(e.target.value)) }} placeholder={"Phone Number"} />
        </div>

        <div id="rcvOptContainer">
          <label htmlFor="rcvOpt">Select Recieving Option</label>
          <select name="recievingOption" defaultValue="select" id="rcvOpt" onChange={(e) => { resetData(); (e.target.value === "upi") ? (setIsUPI(true), setIsBank(false)) : (e.target.value) === "bank" ? (setIsUPI(false), setIsBank(true)) : (setIsUPI(false), setIsBank(false)) }} required>
            <option value="select" disabled>Select</option>
            <option value="upi">UPI</option>
            <option value="bank">BANK</option>
          </select>
        </div>

        {isUPI &&
          <div id="upiContainer">
            <h5 className="txt-center m-15">UPI Details</h5>
            <input type="email" name="" placeholder="UPI ID" id="" required onChange={(e) => { setUPIID(e.target.value) }} />
            <div>
              <label htmlFor="qrcode">QR Code</label>
              <input type="file" name="qrcode" id="qrcode" required onChange={(e) => e.target.files && e.target.files.length > 0 && convertImage(e.target.files[0])} />
            </div>
          </div>
        }
        {isBank &&
          <div id="bankContainer">
            <h5 className="txt-center">Bank Details</h5>
            <input type="number" onChange={(e) => setAccNum(parseInt(e.target.value))} name="" placeholder="Bank A/C Number" required />
            <input type="text" onChange={(e) => setIFSCNum(e.target.value)} name="" placeholder="IFSC CODE" required />
            <input type="text" onChange={(e) => setnameAccNum(e.target.value)} name="" placeholder="Name of A/c holder" />
          </div>
        }

        {isUPI || isBank ? <div id="btnContainer" className="item-center"><button type="submit">Submit</button></div> : ""}


      </form>

      {(imgLoad || loader) ? <Spinner /> : showMsg ? <Message message={msg} setShowMsg = {setShowMsg} /> : null}

    </div>
  )
}
