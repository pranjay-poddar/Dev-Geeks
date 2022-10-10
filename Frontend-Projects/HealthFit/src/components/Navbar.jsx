import { Link } from "react-router-dom"
import ThemeMode from "./ThemeMode"

import Logo from "../assets/images/Logo.svg"

const Navbar = () => {
  return (
    <>
      {/* <header className="text-gray-600 body-font w-full md:w-1/2 md:float-left"> */}
      <header className="text-gray-600 body-font w-full shadow dark:border-b dark:border-b-slate-700">
        <div className="container mx-auto flex flex-wrap px-5 py-1 md:flex-row justify-between items-center pb-3 flex-col md:pb-0">
          <div className="flex title-font font-medium items-center text-gray-900 mb-2 md:mb-0">
            <Link to="/">
              <img src={Logo} alt="Fitness Craze" className="w-8, h-8 mx-0 my-5" />
            </Link>
            <Link to="/">
              <span className="ml-3 text-2xl dark:text-gray-100">Fitness Freak</span>
            </Link>
          </div>
          <nav className="flex flex-wrap items-center text-base justify-center">
            <Link to="/" className="mr-2 p-2 hover:text-indigo-800 dark:text-gray-100 dark:hover:text-indigo-400">
              Home
            </Link>
            <a href="#exercises" className="hover:text-indigo-800 p-2 dark:text-gray-100 dark:hover:text-indigo-400">
              Exercises
            </a>
            <div className="mx-2">
              <ThemeMode />
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Navbar
