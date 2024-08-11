import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'



function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect (() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
      
    })
    .finally(()=>setLoading(false))
  }, [])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-[#c5f8f0]">
      <div className='w-full block'>
        <Header />
          <Outlet />
        <Footer />
      </div>

    </div>
  ) : <div>
        <h1 className='text-black'>
          Loading...
        </h1>
      </div>
  
}

export default App
