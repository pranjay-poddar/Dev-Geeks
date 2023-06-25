import React from 'react'

function Spinner() {
  return (
    <div className='absolute inset-0 bg-black opacity-80 z-50 flex items-center justify-center'>
        <div className='h-20 w-20 border-t-4 border-l-4 border-gray-300 animate-spin rounded-full'>

        </div>
    </div>
  )
}

export default Spinner