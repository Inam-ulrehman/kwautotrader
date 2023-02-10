import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const SingleAboutUs = () => {
  const { _id } = useParams()
  const { aboutUs } = useSelector((state) => state.websiteContent)
  const person = aboutUs.find((item) => item._id === _id)

  return (
    <Wrapper>
      <Helmet>
        <title>{person?.name}</title>

        <meta name='description' content={person?.profession} />
        <link rel='canonical' href='/contact' />
      </Helmet>
      <div className='box-1'>
        <img
          src={person?.uploadImage[0]?.secure_url}
          alt={person?.name}
          title={person?.name}
          loading={'eager'}
          width='100%'
          height='100%'
        />
      </div>
      <div className='box-2'>
        <div className='heading'>
          <h1>{person?.name}</h1>
          <span>{person?.profession}</span>
        </div>
        <div className='paragraph'>
          <p>{person?.paragraph}</p>
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  place-content: center;

  .box-1 {
    margin: 1rem;
    width: 400px;
    height: 400px;
    box-shadow: var(--shadow-4);
    border-bottom: 5px solid var(--primary-5);
    img {
      margin-top: -5px;
      width: 100%;
    }
  }
  .box-2 {
    margin: 1rem;

    background-color: var(--white);
    box-shadow: var(--shadow-2);
    .heading {
      text-transform: capitalize;
      display: grid;
      align-items: center;
      padding: 1rem;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      background-color: var(--grey-2);
      color: var(--grey-5);
      h1,
      span {
        font-size: 1.3rem;
      }
      h1,
      span {
        margin: 0;
      }
    }
    .paragraph {
      padding: 1rem;
      color: var(--grey-5);
    }
  }
  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 600px) {
    .box-1 {
      width: 350px;
      height: 350px;
      margin: 0 auto;
      img {
      }
    }
  }
`

export default SingleAboutUs
