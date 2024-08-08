import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { Button, Input, Logo } from './index'
import { useForm } from 'react-hook-form'
import { FaUser, FaLock } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'




function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const create = async (data) => {
        setError("")
        try {
            const session = await authService.createAccount(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login(userData))
                    navigate('/')
                }
            }
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <div className='flex items-center justify-center'>
            <div className={`mx-auto w-full max-w-lg
                p-10 border border-black/10 
                h-full bg-white rounded-3xl shadow-[0_0_10px_rgba(0,0,0,0.1)]`}>
                    <div className='mb-2 flex justify-center '>
                        
                            <Logo />
                        
                    </div>
                    <h2 className='text-center text-2xl font-bold leading-tight'>
                        Register
                    </h2>
                    <p className='mt-2 text-center text-base text-black/60'>
                        Already have an account? 
                        <Link to='/login' 
                        className='text-blue-500 font-medium text-primary 
                        transition-all duration-200 hover:underline'>
                            Login
                        </Link>
                    </p>
                    {error && <p className='text-red-500 text-center mt-8'>{error}</p>}

                    <form onSubmit={handleSubmit(create)} className='mt-8 flex flex-col'>
                        <div className='space-y-6 mx-2'>
                            <Input
                                type='text'
                                
                                {...register('name', { required: true }) }
                                placeholder='Enter your full name'
                                children={<FaUser className='h-1/2 w-1/6  right-4 text-black text-base'/>}
                            />
                            <Input
                                type='email'
                                
                                {...register('email', { required: true,
                                    validate:{
                                        matchPattern: (value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 
                                        'Email must be valid'
                                    }
                                 })}
                                placeholder='Enter your email'
                                children={<MdEmail className='h-1/2 w-1/6  right-4 text-black text-base'/>}
                            />
                            <Input
                                type='password'
                                
                                {...register('password', { required: true, minLength: 6 })}
                                placeholder='Enter your password'
                                children={<FaLock className='h-1/2 w-1/6  right-4 text-black text-base'/>}
                            />
                            

                            

                        </div>
                        <Button
                                type='submit'
                                className='w-11/12 mt-8 self-center'
                            >
                                Register
                            </Button>
                    </form>
            </div>

        </div>
    )
}

export default Signup
