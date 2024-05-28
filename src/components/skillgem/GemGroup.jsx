import React from 'react'
import Gem from './Gem'

const GemGroup = ({ gem }) => {
  return (
    <li className='p-3 my-2 w-auto card shadow-lg bg-content1 dark:bg-backgroundPrimary break-inside-avoid-column'>
      <h2 className='font-bold my-2 uppercase'>{gem.slot}</h2>
     {gem && gem.gems.map((gem) => <Gem key={gem.slot + gem.gemId} gem={gem}/>)}
    </li>
  )
}

export default GemGroup