import React, { useEffect, useState } from 'react'
import Logo from '../Logo'
import { NavLink, useLoaderData, useNavigate } from 'react-router'
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
  const [genre,setGenre] = useState <Genre | null> (null)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const genresEffect = await fetchGenres();
      console.log(genresEffect)
      setGenres(genresEffect)
    };
    fetchData();
  }, [])


  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = parseInt(event.target.value); // We obtain the genre ID that we select
    const selectedGenre = genres.find(genre => genre.id === genreId) || null; // Find the selected genre

    setGenre(selectedGenre); // Updates the state

    if (selectedGenre) {
      // Goes to filter.tsx with the selected genre
      navigate(`/filter?genreId=${selectedGenre.id}`);
    }
  };


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
            <select onChange={handleGenreChange} className='ms-3 p-1 border rounded-2xl'>
              <option value="" className={`${backgroundcolor}`}>Filter by genre</option>
              {genres.map(genre => (
                  <option key={genre.id} value={genre.id} className={`${backgroundcolor}`}>{genre.name}</option>
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