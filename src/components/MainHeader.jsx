import React from 'react'
import DarkThemeSwitcher from './DarkThemeSwitcher'
import { toast } from 'react-toastify'

const MainHeader = () => {
  return (
    <div className='container overflow-hidden flex justify-between items-center min-w-full py-3 px-1 mx-0 bg-white dark:bg-black transition-all'>
      <h1 className='text-center flex-1 mx-0 p-0 font-bold uppercase text-light dark:text-dark'>Pob Find</h1>
      <DarkThemeSwitcher className="dark:bg-gray-300 bg-zinc-600 p-1 rounded-full mx-2"/>
    </div>
  )
}

export default MainHeader