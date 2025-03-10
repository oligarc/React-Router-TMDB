import React, { useEffect, useState } from 'react'
import Logo from '../Logo'
import { NavLink, useNavigate } from 'react-router'
import type { Genre, HeaderProps } from '~/Types/interfaces'
import Button from '../Button'
import SearchInput from '../SearchInput'
import { fetchGenres } from '~/Services/functions'

function Header({ backgroundcolor, textcolor }: HeaderProps) {

  const [genres, setGenres] = useState<Genre[]>([])
  const [genre, setGenre] = useState<Genre | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const genresEffect = await fetchGenres();
      setGenres(genresEffect);
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = parseInt(event.target.value);
    const selectedGenre = genres.find(genre => genre.id === genreId) || null;
    setGenre(selectedGenre);

    if (selectedGenre) {
      navigate(`/filter?genreId=${selectedGenre.id}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className={`${backgroundcolor} ${textcolor} p-5 `}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Logo image="tmdb-logo" format="svg" />
            <nav>
              <NavLink to="/favorites" className={`${textcolor} ms-3`}>Favorites</NavLink>
              <NavLink to="/watchlist" className={`${textcolor} ms-3`}>Watchlist</NavLink>
              <NavLink to="/trendingActors" className={`${textcolor} ms-3`}>Trending actors</NavLink>
              <select onChange={handleGenreChange} className="ms-3 p-1 border rounded-2xl">
                <option value="" className={`${backgroundcolor}`}>Filter by genre</option>
                {genres.map(genre => (
                  <option key={genre.id} value={genre.id} className={`${backgroundcolor}`}>{genre.name}</option>
                ))}
              </select>
            </nav>
          </div>
          <div className="flex justify-center items-center">
            <SearchInput
              placeholder="Looking for...?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              name='try'
            />
            <Button backgroundcolor="bg-green-400" text="Search" isrounded onClick={handleSearch} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
