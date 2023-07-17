import { useState,useEffect,useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const KeyGenerator = ({callback, p1,q1,n1,phi1,e1,d1}) => {

  const [p, setP] = useState(p1)
  const [q, setQ] = useState(q1)
  const [n, setN] = useState(n1)
  const [phi, setPhi] = useState(phi1)
  const [e, setE] = useState(e1)
  const [d, setD] = useState(d1)

// checkprime - function to check if a number is prime
  function checkprime(n) {
    if (n === 2) {
      return true
    } else if (n % 2 === 0 || n === 1 || n === 0) {
      return false
    } else {
      for (let i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) {
          return false
        }
      }
      return true
    }
  }



  function gcd(a, b) {
    if (b === 0) {
      return a
    } else {
      return gcd(b, a % b)
    }
  }


//  generateKeys - function to generate keys using p and q
  function generateKeys() {
    if(p && q){
    if (checkprime(p) && checkprime(q)) {

      let nz = p*q        // n = p*q
      let phiz = (p - 1) * (q - 1)    // phi = (p-1)*(q-1)
      setN(nz)
      setPhi((p - 1) * (q - 1))

      let ez = 2       // e = 2
      while (ez < phiz) {
        if (gcd(ez, phiz) === 1) {        // e and phi must be coprime
          break
        } else {
          ez++
        }
      }



      setE(ez)

      let dz = 1
      while (dz < phiz) {
        if ((ez * dz) % phiz === 1) {     // d = (1/e)mod(phi)
          break
        } else {
          dz++
        }
      }
      setD(dz)

      callback(ez,dz,nz,phiz)    // callback function to send the keys to parent component
    } else {
      alert('p and q must be prime')
    }}
    else{
      alert('p and q cannot be empty')
    }



  }



  return (
    <div className='flex flex-col items-center'>
      <p className="text-[39px] leading-[49px] mb-[30px]"> Key Generator </p>
      <div className='flex flex-col justify-center items-center bg-[#3b3b3b] p-7 text-[28px] rounded-[23px]'>
        <div className='mb-[100px] mt-[40px]'>
          <p className='inline-block ml-[30px] mr-[20px]'>enter 2 prime numbers</p>
          <p className='inline-block ml-[30px] mr-[20px]'>p = </p>
          <input type="number" className='bg-[#1C1C1C] max-w-[150px] border-0 px-5 py-3 rounded-[9px] outline-0 focus:border-0' value={p} onChange={(e)=> setP(parseInt(e.target.value))} />
          <p className='inline-block ml-[30px] mr-[20px]'>q = </p>
          <input type="number" className='bg-[#1C1C1C] max-w-[150px] border-0 px-5 py-3 rounded-[9px] outline-0 focus:border-0 mr-[20px]' value={q} onChange={(e)=> setQ(parseInt(e.target.value))} />
          <button onClick={() => generateKeys()}>Generate Keys</button>
        </div>
        <div>
          <p className='inline-block ml-[30px] mr-[20px]'>public key = </p>
          <input type="text" disabled className='bg-[#1C1C1C] max-w-[300px] border-0 px-5 py-3 rounded-[9px] outline-0 focus:border-0' defaultValue = {n&&phi&&e?"{ "+e+" , "+n+" }":""} />
          <p className='inline-block ml-[30px] mr-[20px]'>private key = </p>
          <input type="text" disabled className='bg-[#1C1C1C] max-w-[300px] border-0 px-5 py-3 rounded-[9px] outline-0 focus:border-0' defaultValue = {n&&phi&&d?"{ "+d+" , "+n+" }":""} />

        </div>
      </div>
    </div>
  )
}


const Encrypt = ({e,n}) => {
  const [m, setM] = useState(0)
  const [c, setC] = useState(0)


  // binarymod - function to calculate (b^e)mod(m)

  function binarymod(b, e, m) {
    let r = 1
    b = b % m
    while (e > 0) {
      if (e % 2 == 1) {
        r = (r * b) % m
      }
      e = Math.floor(e / 2)
      b = (b * b) % m
    }
    return r
  }


  // encrypt - function to encrypt message

  function encrypt() {
    let c  = binarymod(m, e, n)
    setC(c)
  }

  return (
    <div className='flex flex-col items-center'>
      <p className="text-[39px] leading-[49px] mb-[30px]"> Encrypt </p>
      <div className='flex flex-col justify-center items-center bg-[#3b3b3b] p-7 text-[28px] rounded-[23px]'>
        <div className='mb-[100px] mt-[40px]'>
          <p className='inline-block ml-[30px] mr-[20px]'>enter message</p>
          <input type="number" className='bg-[#1C1C1C] max-w-[150px] border-0 px-5 py-3 rounded-[9px] outline-0 focus:border-0 mr-[20px]' value={m} onChange={(e)=> setM(parseInt(e.target.value))} />
          <button onClick={() => encrypt()}>Encrypt</button>
        </div>
        <div>
          <p className='inline-block ml-[30px] mr-[20px]'>encrypted message = </p>
          <input type="text" className='bg-[#1C1C1C] max-w-[300px] border-0 px-5 py-3 rounded-[9px] outline-0 focus:border-0' value = {c?"{ "+c+" }":""} />
        </div>
      </div>
    </div>
  )
}

const Decrypt = ({d,n}) => {
  const [c, setC] = useState(0)
  const [m, setM] = useState(0)


  // binarymod - function to calculate (b^e)mod(m)

  function binarymod(b, e, m) {
    let r = 1
    b = b % m
    while (e > 0) {
      if (e % 2 == 1) {
        r = (r * b) % m
      }
      e = Math.floor(e / 2)
      b = (b * b) % m
    }
    return r
  }


  // decrypt - function to decrypt message

  function decrypt() {


    let m = binarymod(c, d, n)
    setM(m)
  }

  return (
    <div className='flex flex-col items-center'>
      <p className="text-[39px] leading-[49px] mb-[30px]"> Decrypt </p>
      <div className='flex flex-col justify-center items-center bg-[#3b3b3b] p-7 text-[28px] rounded-[23px]'>
        <div className='mb-[100px] mt-[40px]'>
          <p className='inline-block ml-[30px] mr-[20px]'>enter encrypted message</p>
          <input type="number" className='bg-[#1C1C1C] max-w-[150px] border-0 px-5 py-3 rounded-[9px] outline-0 focus:border-0 mr-[20px]' value={c} onChange={(e)=> setC(parseInt(e.target.value))} />
          <button onClick={() => decrypt()}>Decrypt</button>
        </div>
        
        <div>
          <p className='inline-block ml-[30px] mr-[20px]'>decrypted message = </p>
          <input type="text" className='bg-[#1C1C1C] max-w-[300px] border-0 px-5 py-3 rounded-[9px] outline-0 focus:border-0' value = {m?"{ "+m+" }":""} />
        </div>
      </div>
    </div>
  )
}


function App() {
  const [count, setCount] = useState(0)
  const [e, setE] = useState(0)
  const [d, setD] = useState(0)
  const [n, setN] = useState(0)
  const [phi, setPhi] = useState(0)
  const [p, setP] = useState(0)
  const [q, setQ] = useState(0)


  const callback = useCallback((e,d,n,phi) => {
    setE(e)
    setD(d)
    setN(n)
    setPhi(phi)
  }, [])
  

  useEffect(() => {
  }, [e,d,n,phi])


  return (
    <>
    <div>
      <div className="App">
        <header className="App-header">
          <h1>RSA SOLVER </h1>
          </header>
          </div>
      
      {count==0?<KeyGenerator callback={callback} />:count==1?<Encrypt e={e} n={n} />:<Decrypt d={d} n={n} />}

      <div className='flex justify-evenly p-[30px] text-[25px]'>
          <p className='inline-block ml-[30px] mr-[20px]'> public key: {"{ "+e+","+n+" }" } </p>
          <p className='inline-block ml-[30px] mr-[20px]'> private key: {"{ "+d+","+n+" }" } </p>
        </div>


      <div className='flex justify-evenly p-[30px] text-[25px]'>
        <button disabled={count==1} onClick = {() => setCount(count+1)}>{count==-1?"GO BACK":"Encrypt"}</button>
        <button disabled={count==-1} onClick = {() => setCount(count-1)}>{count==1?"GO BACK":"Decrypt"}</button>
      </div>
      </div>
    </>
  )
}

export default App
