import { NavLink } from "react-router"
import Networks from "../Networks"

function Footer() {
  return (
    <footer>
        <footer className="mt-2 p-10 rounded-b-md sticky">
          <div className="flex justify-between items-center">
  
              <div>
                  <nav>
                      <ul className="inline-flex space-x-4 text-lg">
                          <NavLink to="/">2025 TMDB</NavLink>
                          <NavLink to="about">About us</NavLink>
                          <NavLink to="#">Privacy Politics</NavLink>
                          <NavLink to="#">Cookies Politics</NavLink>
                      </ul>
                  </nav>
              </div>
  
              <div className="div">
                  <Networks />
              </div>
  
          </div>
      </footer>
    </footer>
  )
}

export default Footer