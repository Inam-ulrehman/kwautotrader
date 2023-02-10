import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../components/footer/Footer'
import DesktopNavbar from '../components/navbar/DesktopNavbar'
import MobileNavbar from '../components/navbar/MobileNavbar'

const SharedLayout = () => {
  return (
    <main>
      <DesktopNavbar />
      <MobileNavbar />
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Footer />
    </main>
  )
}
const Wrapper = styled.section`
  margin-top: 3.2rem;
`
export default SharedLayout
