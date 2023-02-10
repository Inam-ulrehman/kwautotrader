import React from 'react'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import LandingFeatureProduct from '../../components/landing/LandingFeatureProducts'

const Dashboard = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>Dashboard</title>
        <meta name='description' content='' />
        <link rel='canonical' href='/about' />
      </Helmet>
      <LandingFeatureProduct />
    </Wrapper>
  )
}

const Wrapper = styled.div``
export default Dashboard
