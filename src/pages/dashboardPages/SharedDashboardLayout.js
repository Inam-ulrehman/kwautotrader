import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import DashboardNav from '../../components/dashboard/DashboardNav'

const SharedDashboardLayout = () => {
  return (
    <Wrapper>
      <DashboardNav />
      <Outlet />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  min-height: calc(100vh - 3.2rem);
`
export default SharedDashboardLayout
