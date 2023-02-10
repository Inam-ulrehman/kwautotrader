import React from 'react'
import styled from 'styled-components'
import Logo from '../Logo'
import Address from './Address'
import CopyRight from './CopyRight'
import SocialMedia from './SocialMedia'
import Subscribe from './Subscribe'

const Footer = () => {
  return (
    <Wrapper>
      <div className='logo-holder'>
        <Logo />
      </div>
      <div className='container'>
        <div className='social-media box-1'>
          <Subscribe />
          <Address />
        </div>
        <div className='box-2'>
          <SocialMedia />
        </div>
      </div>
      <CopyRight />
    </Wrapper>
  )
}
const Wrapper = styled.footer`
  background-color: var(--grey-1);
  display: grid;
  place-items: center;

  .logo-holder {
    max-height: 60px;
    overflow: hidden;
  }
  @media (min-width: 600px) {
    min-height: calc(100vh - 3.2rem);
    .container {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr 1fr;
      .box-2 {
      }
    }
  }
  @media (min-width: 768px) {
  }
  @media (min-width: 900px) {
  }
  @media (min-width: 1120px) {
  }
`
export default Footer
