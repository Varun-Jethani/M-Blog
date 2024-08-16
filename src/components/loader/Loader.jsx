import React from 'react'
import './loader.css'

function Loader({text='Redirecting'}) {
    return (
    <div className='flex items-center justify-center mb-10 mt-20 h-96 w-full overflow-hidden'>
    <div className="main"><span><span></span><span></span><span></span><span></span></span>
      <div className="base"><span></span>
        <div className="face"></div>
      </div>
    </div>
    <div className="longfazers"><span></span><span></span><span></span><span></span></div>
    <h1 className='loadtext'>{text}...</h1>
  </div>
    )
}

export default Loader
