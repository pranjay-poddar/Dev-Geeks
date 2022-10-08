import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary bg-gradient">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">MyPostApp</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/posts">All Posts</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/create">Create Post</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/about">About Us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">Contact</NavLink>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-primary" type="submit">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>

                            <NavLink to='/signup' className="btn btn-primary">
                                <i className="fa-solid fa-user-plus"></i>
                            </NavLink>

                            <NavLink to='/login' className="btn btn-primary">
                            <i className="fa-solid fa-arrow-right-to-bracket"></i>
                            </NavLink>

                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )

}

export default NavBar