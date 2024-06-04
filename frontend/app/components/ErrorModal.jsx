import React from 'react'

export default function ErrorModal() {
  return (
    <div className='bg-swhite shadow-2xl fixed px-10 py-5 rounded-lg flex flex-col space-y-5 items-center justify-center align-middle'>
      <span>Authorization error ! Login again.</span>
      <button className='px-5 py-2 bg-red-900 text-swhite rounded-lg'>OK</button>
    </div>
  )
}
