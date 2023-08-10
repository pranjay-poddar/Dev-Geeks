import { useCallback, useState } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom'


const Register = () => {

    const[username,setUsername]=useState("");
    const[phoneno,setPhoneno]=useState("");
    const[password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");

    const particlesInit = useCallback(async engine => {
        // console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        // await console.log(container);
    }, []);

    const handleSubmit = (e)=>{
        e.preventDefault();
        // console.log("user",username);console.log("pass",password);console.log("phone",phoneNo);console.log("con",confirmPassword)
        fetch("http://localhost:5000/register",{
            method:"POST",
            crossDomain: true,
            headers:{
                "Content-Type": "application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*"
            },
            body: JSON.stringify({
                username,
                phoneno,
                password,
            }),
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
    }

    return (
        <>
        <div className="main-container" style={{height:"70vh",top:"12vh"}}>
            <form onSubmit={handleSubmit}>
            <div className="logo">Crazy-Register</div>
            <div className="login-container">
                <div className="input-container"><TextField required onChange={e=>setUsername(e.target.value)} className="input" label="Username" variant="outlined" /></div>
                <div className="input-container"><TextField required onChange={e=>setPhoneno(e.target.value)} className="input" label="Phone Number" variant="outlined" /></div>
                <div className="input-container"><TextField required onChange={e=>setPassword(e.target.value)} className="input" label="Password" variant="outlined" /></div>
                <div className="input-container"><TextField required onChange={e=>setConfirmPassword(e.target.value)} className="input" label="Confirm Password" variant="outlined" /></div>
            </div>
            <p className="para">Don't have an account ? <Link to="/login" className="toggle-container"><span className="toggle">Login</span></Link> </p>
            <div className="btn-container">
                <button type="submit" className="btn" >Register</button>
                <button type="reset" className="btn">Reset</button>
            </div>
            </form>
        </div>
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "#000000",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: false,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.3,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: true,
                        speed: 1,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        />
        </>
    );
};

export default Register;