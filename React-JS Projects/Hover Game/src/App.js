import React, { useRef } from 'react'
import './style.css'
const App = () => {
    const initialData = 10;

    let intervalID = useRef(null);
    const [myNum, setMyNum] = React.useState(initialData);

    const handleMouseEnter = (n) => {
        if (n === 0) {
            intervalID.current = setInterval(() => { myNum > 0 && setMyNum((prev) => prev - 1) }, 100);
        }
        else if(n===1) {
            intervalID.current = setInterval(() => { myNum < 100 && setMyNum((prev) => prev + 1) }, 100);
        }
    }

    const handleMouseLeave = () => {
        clearInterval(intervalID.current);
    }

    return (
        <>
            <div className="container">
                <p>{myNum}</p>
                <div className="center_div">

                    <div className="inc" onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
                        <span className='content'>+</span>
                    </div>
                    <div className="dec" onMouseEnter={() => handleMouseEnter(0)} onMouseLeave={handleMouseLeave}>
                        <span className='content'>-</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
