import { NavLink } from "react-router"

function Networks() {
    return (
      <nav>
          <ul className="inline-flex space-x-5 items-center">
              <NavLink to="#"><img src="/iconos/yt-icon.png" alt="yt-icon" className="w-10" /></NavLink>
              <NavLink to="#"><img src="/iconos/fb-icon.png" alt="fb-icon" className="w-10" /></NavLink>
              <NavLink to="#"><img src="/iconos/ig-icon.png" alt="ig-icon" className="w-10" /></NavLink>
              <NavLink to="#"><img src="/iconos/gmail-icon.png" alt="gmail-icon" className="w-10" /></NavLink>
              <NavLink to="#"><img src="/iconos/x-icon.png" alt="x-icon" className="w-10" /></NavLink>
          </ul>
      </nav>
    )
  }
  
  export default Networks