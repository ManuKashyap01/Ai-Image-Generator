import React from 'react'
import { BrowserRouter,Link,Route,Routes } from 'react-router-dom'
import {logo} from './assets'
import { Home,CreatePost } from './pages'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <header className='flex w-full justify-between items-center bg-white sm:px-8 p-4 border-b border-b-[#e6ebf4]'>
        <Link to='/'>
          <img src={logo} alt="logo" className='w-28 object-contain'/>
        </Link>
        <Link to='/create-post' className='font-inter font-semibold tracking-wide bg-[#bada55] text-white px-4 py-2 rounded-lg'>Create</Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-100px)]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create-post' element={<CreatePost/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
