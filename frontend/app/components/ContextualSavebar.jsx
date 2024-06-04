import React from 'react'

export default function ContextualSavebar() {
  return (
    <div className='px-5 py-3 bg-spurple-100 fixed flex items-center justify-end space-x-5'>
        <button className='text-md bg-spurple-300 text-swhite px-2 py-1.5 rounded-lg'>Save changes</button>
        <button className='text-md bg-spurple-100 text-spurple-300 border border-spurple-300 px-2 py-1.5 rounded-lg'>Undo changes</button>      
    </div>
  )
}
