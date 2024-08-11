import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin} from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { FaUser, FaLock } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'



function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [error, setError] = React.useState("")

    const login = async(data)=>{
        setError("")
        try{
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                    navigate('/')
                }

            }
        }catch(e){
            setError(e.message)
        }
    }



    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-3 sm:mx-auto w-full max-w-lg bg-[#F7FFF7]  rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)]
                p-10 border border-black/10`}>

                    <div className='mb-2 w-full flex justify-center items-center' >
                        
                            <Logo />
                        
                    </div>
                    <h2 className='text-center text-2xl font-bold leading-tight'>
                        Login
                    </h2>
                    <p className='mt-2 text-center text-base text-black/60'>
                        Don't have an account? 
                        <Link to='/signup'   
                        className='text-blue-500 font-medium text-primary 
                        transition-all duration-200 hover:underline'>
                            Register
                        </Link>
                    </p>
                    
                    {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                    <form onSubmit={handleSubmit(login)} className='mt-8 flex flex-col'>
                        <div className='space-y-8 mx-4'>
                            <Input
                            className='placeholder-gray-950'
                            placeholder='Enter your email'
                            children={<MdEmail className='h-1/2 w-1/6  right-4 text-black text-base'/>}

                            type='email'
                            {...register('email', {
                                required: true,
                                validate:{
                                    matchPattern: (value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 
                                    'Email must be valid'
                                }
                                })}
                            />
                            <Input
                            className='placeholder-gray-950'
                            type='password'
                            placeholder='Enter your password'
                            children={<FaLock className='h-1/2 w-1/6  right-4 text-black text-base'/>}
                            {...register('password', {
                                required: true,
                            })}
                            />
                            

                        </div>
                        <Button
                            type='submit'
                            className='w-11/12 mt-8 self-center'
                            >Sign-in</Button>
                    </form>
            </div>
            
        </div>
    )
}

export default Login
