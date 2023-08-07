import { useCallback } from "react";
import { Link } from 'react-router-dom';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import TextField from '@mui/material/TextField';

const Login = () => {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    const allColor = true;

    return (
        <>
        <div className="main-container">
            <form action="#">
            <div className="logo">Crazy-Login</div>
            <div className="login-container">
                <div className="input-container"><TextField required className="input" label="Username" variant="outlined" /></div>
                <div className="input-container"><TextField required className="input" label="Password" variant="outlined" /></div>
            </div>
            <p className="para-left">Forgot Password ?</p>
            <p className="para">Already have an account ? <Link to="/register" className="toggle-container"><span className="toggle">Signup</span></Link> </p>
            <div className="btn-container">
                <button type="submit" className="btn">Login</button>
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

export default Login;