import React, { useEffect, useState } from 'react'
import Logo from '../Logo'
import { NavLink, useLoaderData } from 'react-router'
import type { Genre, HeaderProps } from '~/Types/interfaces'
import Button from '../Button'
import SearchInput from '../SearchInput'
import { fetchGenres } from '~/Services/functions'

export async function loader() {
  try {
    const genres = await fetchGenres();
    console.log(genres)
    return { genres };
  } catch (error) {
    console.error("Error fetching genres:", error);
    return { genres: [] };
  }
}

function Header({backgroundcolor,textcolor} : HeaderProps) {

  const [genres,setGenres] = useState <Genre[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const genresEffect = await fetchGenres();
      console.log(genresEffect)
      setGenres(genresEffect)
    };
    fetchData();
  }, [])
  //const { genres } = useLoaderData() as { genres: { id: number; name: string }[] };
  return (
    <header className={`${backgroundcolor} p-5`}>
      <div className='max-w-7xl mx-auto'>
      <div className='flex justify-between items-center'>
        <div className="flex items-center">
          <Logo image="tmdb-logo" format="svg" />
          <nav>
            <NavLink to="/favorites" className={"text-black ms-3"}>Favorites</NavLink>
            <NavLink to="/watchlist" className={"text-black ms-3 bg-gre"}>Watchlist</NavLink>
            <NavLink to="/trendingActors" className={"text-black ms-3 bg-gre"}>Trending actors</NavLink>
            <select className='ms-3 p-1 border rounded-2xl'>
              <option value="">Filter by genre</option>
              {genres.map(genre => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
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