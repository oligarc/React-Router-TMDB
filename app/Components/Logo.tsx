import React from 'react'
import { Link } from 'react-router'
import type { LogoProps } from '~/Types/interfaces'

function Logo({image,format} : LogoProps) {
  return (
    <Link to="/">
      <img src={`/logo/${image}.${format}`} className="w-25 m-3" alt="Logo" />
    </Link>
  )
}

export default Logo