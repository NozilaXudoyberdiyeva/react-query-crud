import React from 'react'
import { NavbarWithSolidBackground } from '../components/Navbar'
import { FooterWithSocialLinks } from '../components/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <NavbarWithSolidBackground />
      <Outlet />
      <FooterWithSocialLinks />
    </div>
  )
}

export default Layout
