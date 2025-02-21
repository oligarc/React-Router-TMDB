import React from 'react'
import type { LogoProps } from '~/Types/interfaces'

function Logo({image,format} : LogoProps) {
  return (
    <img src={`/logo/${image}.${format}`} className='w-25'></img>
  )
}

export default Logo