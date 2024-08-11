import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Logo, LogoutBtn } from '../'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    let userid = ''
    try{userid = useSelector((state) => state.auth.userData.$id)
    if (authStatus && !userid ) {
      userid = useSelector((state) => state.auth.userData.userData.$id)

    }}catch(e){
      console.log(e)
      userid=''
    }
    const navigate = useNavigate()
    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'Sign Up',
            slug: '/signup',
            active: !authStatus
        },
        {
        name: "All Posts",
        slug: '/posts/'+userid,
        active: authStatus
        },
        {
            name: 'Create Post',
            slug: '/create-post',
            active: authStatus
        },
    ]


    const [isNavOpen, setIsNavOpen] = useState(false);
    
    

  


    const handleNavToggle = () => {
      setIsNavOpen(!isNavOpen);
    };

    return (
      <header className='py-3 shadow bg-[#1A535C]'>
      <Container>
        <nav className='flex flex-wrap items-center justify-between'>
        <div className='mr-4'>
          <Link to='/'>
          <Logo width='30px' />
          </Link>
        </div>
        <input type='checkbox' id='menu-toggle' className='hidden' />{  
        <label htmlFor='menu-toggle' onClick ={handleNavToggle} className='block cursor-pointer lg:hidden mr-5'>
          {isNavOpen ? (
            <svg 
            className='w-6 h-6 text-[#F7FFF7]' 
            fill='none' 
            stroke='currentColor' 
            viewBox='0 0 24 24' 
            xmlns='http://www.w3.org/2000/svg'>
            <path 
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M6 18L18 6M6 6l12 12'>
            </path>   
            </svg>) :(
          <svg
          className='w-6 h-6 text-[#F7FFF7]'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 6h16M4 12h16M4 18h16'
          ></path>
          </svg>)}
        </label>}
        <ul className='hidden lg:flex ml-auto space-x-3 text-[#F7FFF7]'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black hover:font-bold rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        <ul className={`flex flex-col w-full mt-4 space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4 lg:hidden sm:items-center sm:mt-0 ${isNavOpen ? 'block' : 'hidden'}`}>
          {navItems.map((item) =>
          item.active ? (
            <li key={item.name}>
            <button
              onClick={() => {
              navigate(item.slug);
              setIsNavOpen(false);
              }}
              className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            >
              {item.name}
            </button>
            </li>
          ) : null
          )}
          {authStatus && (
          <li>
            <LogoutBtn />
          </li>
          )}
        </ul>
        </nav>
      </Container>
      </header>
    );
}

export default Header
