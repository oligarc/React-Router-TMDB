import React from 'react'
import Logo from '../Logo'
import { NavLink } from 'react-router'
import type { HeaderProps } from '~/Types/interfaces'
import Button from '../Button'
import SearchInput from '../SearchInput'

function Header({backgroundcolor,textcolor} : HeaderProps) {
  return (
    <header className={`${backgroundcolor} p-5`}>
      <div className='max-w-7xl mx-auto'>
      <div className='flex justify-between items-center'>
        <div className="flex items-center">
          <Logo image="tmdb-logo" format="svg" />
          <nav>
            <NavLink to="/favorites" className={"text-black ms-3"}>Favorites</NavLink>
            <NavLink to="/watchlist" className={"text-black ms-3 bg-gre"}>Watchlist</NavLink>
            <select className='ms-3 p-1 border rounded-2xl'>
              <option value="">Filter by genre</option>
              {/*Aquí habrá que meter la lista de géneros haciendo un fetch } {*/}
            </select>
          </nav>
        </div>
        <div className="flex justify-center items-center">
          <SearchInput placeholder='Looking for...?'></SearchInput>
          <Button backgroundcolor='bg-green-400' text='Search' isrounded></Button>
        </div>
        </div>
      </div>

    </header>
  )
}

export default Header