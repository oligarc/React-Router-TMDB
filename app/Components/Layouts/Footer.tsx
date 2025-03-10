import { NavLink } from "react-router"
import Networks from "../Networks"
import type { FooterProps } from "~/Types/interfaces"

function Footer({backgroundcolor, textcolor} : FooterProps) {
  return (
    <footer className={`${backgroundcolor}  ${textcolor}`}>
        <div className="mt-2 p-10 rounded-b-md sticky max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
              <div>
                  <nav>
                      <ul className="inline-flex space-x-4 text-lg">
                          <NavLink to="/">2025 TMDB</NavLink>
                          <NavLink to="about">About us</NavLink>
                          <NavLink to="#">Privacy Policy</NavLink>
                          <NavLink to="#">Cookies Policy</NavLink>
                      </ul>
                  </nav>
              </div>
  
              <div className="div">
                  <Networks />
              </div>
  
          </div>
      </div>
    </footer>
  )
}

export default Footer