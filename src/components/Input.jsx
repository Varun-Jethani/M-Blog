import React, { useId } from 'react'
import { FaUser } from 'react-icons/fa'


const Input = React.forwardRef(function ({
    label,
    type = 'text',
    className = "",
    children,
    ...props
}, ref){
    const id = useId()
    
    return (
        <div className='flex w-full h-12 items-center'>
            {label && <label
                className='inline-block pl-1 h-1/2 mx-3 transform -translate-y-1/2'
                htmlFor={id}>
                {label}
            </label>}
            {children}
                
            {/* <div className='w-1/4 h-full'>
            </div> */}
            <input
                type={type}
                className={`w-5/6 mr-4 bg-transparent border-solid outline-none border-2 border-[rgba(0,0,0,0.2)] p-4 text-black text-base rounded-3xl ${className}`}
                ref={ref}
                {...props}
                id={id} 
            />
        </div>
    )
}) 
    


export default Input
