import React from 'react';
//import './chefs.css';

const Chefs = () => {
    return (
        <div className="row">
            <h1 className="galleryhead" id="chefs">Chefs</h1>
            <div className="column">
                <div className="card">
                    <img src="image/person.jpg" alt="Michael" style={{ width: '50%' }} />
                    <div className="container">
                        <h2>Michael Collins</h2>
                        <p className="title">Pastry Chef</p>
                        <p>
                            <a className="fa fa-facebook" href="#" target="_blank"></a>
                            <a className="fa fa-instagram" href="#" target="_blank"></a>
                            <a className="fa fa-linkedin" href="#" target="_blank"></a>
                        </p>
                    </div>
                </div>
            </div>

            <div className="column">
                <div className="card">
                    <img src="image/person.jpg" alt="Sunita" style={{ width: '50%' }} />
                    <div className="container">
                        <h2>Sunita Williams</h2>
                        <p className="title">Ice Cream Chef</p>
                        <p>
                            <a className="fa fa-facebook" href="#" target="_blank"></a>
                            <a className="fa fa-instagram" href="#" target="_blank"></a>
                            <a className="fa fa-linkedin" href="#" target="_blank"></a>
                        </p>
                    </div>
                </div>
            </div>

            <div className="column">
                <div className="card">
                    <img src="image/person.jpg" alt="George" style={{ width: '50%' }} />
                    <div className="container">
                        <h2>George Clooney</h2>
                        <p className="title">Cookie Chef</p>
                        <p>
                            <a className="fa fa-facebook" href="#" target="_blank"></a>
                            <a className="fa fa-instagram" href="#" target="_blank"></a>
                            <a className="fa fa-linkedin" href="#" target="_blank"></a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chefs;