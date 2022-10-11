import React from "react"

const BoxLoader = ({ quantity }) => {
  //
  let items = [0]

  if (quantity > 0) {
    items = []
    for (let i = 0; i < quantity; i++) {
      items.push(i)
    }
  }

  return (
    <div className="flex flex-wrap gap-5 md:flex-row justify-center items-center w-full">
      {items.map((i) => (
        <div key={i} role="status" className="flex flex-wrap p-4 max-w-sm animate-pulse md:p-6 dark:border-gray-700">
          <div className="flex flex-col w-[270px] h-[280px] gap-y-12 justify-center items-center mb-4 bg-gray-300 rounded dark:bg-gray-700">
            <svg
              className="w-12 h-12 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"></path>
            </svg>
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-600 w-16 mb-4"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </div>
  )
}

export default BoxLoader
