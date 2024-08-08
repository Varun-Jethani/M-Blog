import React from 'react'
import logo from '../assets/logo.png'

function Logo({width = '50px'}) {
    return (
        <div maxwidth={width} className='flex items-center'>
            <img className="logo" src={logo} alt="" />
        </div>
    )
}

export default Logo
