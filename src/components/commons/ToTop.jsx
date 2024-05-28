import React, { useEffect, useState } from 'react'

const ToTop = ({propClasses}) => {

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  return (
    <div className={`z-10 hover:cursor-pointer ${propClasses} fixed bottom-20 right-5 bg-black dark:bg-light dark:text-light text-white p-2 rounded-full uppercase font-fontin`} onClick={toTop} >TOP</div>
  )
}

export default ToTop