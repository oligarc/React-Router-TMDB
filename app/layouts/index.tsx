import React from 'react'
import { NavLink, Outlet } from 'react-router'

function Index() {
  return (
    <>
        <nav>
            <NavLink to="/"><img src="/logo/tmdb-logo.svg" alt="" width={100}/></NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>
            <NavLink to="/watchlist">Watchlist</NavLink>
            <NavLink to="/trendingActors">Trending Actors</NavLink>
        </nav><hr />
        <div>
            <Outlet />
        </div>
    </>
  )
}

export default Index