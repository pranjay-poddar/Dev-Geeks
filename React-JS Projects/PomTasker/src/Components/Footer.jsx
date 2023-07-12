import React from 'react'

export default function Footer() {
  return (
    <>
    <footer className="w-full bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© Tayyab Ilyas
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <a href="https://github.com/tayyab-ilyas" className="mr-4 hover:underline md:mr-6 ">GitHub</a>
            </li>
            <li>
                <a href="https://www.linkedin.com/in/tayyab-ilyas/" className="mr-4 hover:underline md:mr-6">LinkedIn</a>
            </li>
            <li>
                <a href="mailto:tayyabilyas963@gmail.com" className="hover:underline">Contact</a>
            </li>
        </ul>
        </div>
    </footer>
    </>
  )
}
