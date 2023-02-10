import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import image from '../images/pageNotFound.svg'
const ErrorPage = () => {
  return (
    <Wrapper>
      <div className='title'>
        <h1>Page not Found</h1>
        <button className='btn'>
          <Link to='/'>Home</Link>
        </button>
      </div>

      <img src={image} alt='Error no page found.' />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: grid;
  place-items: center;
  height: calc(100vh - 3.2rem);
  img {
    max-width: 300px;
  }
  button {
    margin: 1rem;
  }
  a {
    color: white;
  }
  @media (min-width: 600px) {
    img {
      max-width: 500px;
    }
  }
`

export default ErrorPage
