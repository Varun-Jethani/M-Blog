import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { Navigate } from 'react-router-dom'


function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout()
        .then(() => {
            dispatch(logout())
        })
    }
    return (
        <button 
        onClick={logoutHandler}
        className='inline-bock px-6 py-2 duration-200 hover:bg-red-600 rounded-full'> 
            Logout
        </button>

    )
}

export default LogoutBtn
