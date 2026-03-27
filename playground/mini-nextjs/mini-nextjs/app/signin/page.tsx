import React from 'react'

const Signin = () => {
    

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className=' w-2xs h-44 border-2 border-black flex flex-col items-center justify-between rounded-2xl' >
        <div></div>
        <h1 className='text-3xl font-extrabold'>Signin Page</h1>
        <div>
          <label className='font-bold'>Username  </label>
          <input placeholder='omkar@gmail.com' className='bg-green-50 border rounded'></input>
        </div>
        <div>
          <label className='font-bold'>Password </label>
          <input placeholder='2fw@4@#afw' className='bg-green-50 border rounded'></input>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Signin;
