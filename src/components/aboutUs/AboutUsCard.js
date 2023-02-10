import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { paragraphLimit } from '../../utils/helper'

const AboutUsCard = ({ image, name, profession, paragraph, _id }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/about/${_id}`)
  }
  return (
    <Wrapper onClick={handleClick}>
      <div className='image'>
        <img
          src={image}
          alt={name}
          title={name}
          loading='lazy'
          width='100%'
          height='100%'
        />
      </div>
      <div className='body'>
        <div className='spanHolder'>
          <span>{name}</span>
          <span>{profession}</span>
        </div>
        <div className='paragraph'>
          <p>
            {paragraph.length > 215
              ? paragraphLimit(paragraph, 215)
              : paragraph}
          </p>
          {paragraph.length > 215 && <span>Read More</span>}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  /* Team Members */

  box-shadow: var(--shadow-1);
  margin: 1rem auto;
  background: var(--white);
  border-top-left-radius: var(--radius-2);
  border-top-right-radius: var(--radius-2);
  transition: var(--transition-1);
  overflow: hidden;
  :hover {
    cursor: pointer;
    box-shadow: var(--shadow-4);
  }
  .image {
    border-top-left-radius: var(--radius-2);
    border-top-right-radius: var(--radius-2);
    display: grid;
    justify-content: center;
  }
  img {
    width: 80vw;
    height: 30vh;
    object-fit: contain;
    border-bottom: 2px solid var(--primary-5);
  }
  .body {
    margin-top: -8px;
    padding: 1rem;
    background: var(--white);
  }
  .spanHolder {
    display: flex;
    justify-content: space-between;
    text-transform: capitalize;
  }
  .paragraph {
    p {
      margin-bottom: 0;
      color: var(--grey-5);
      display: inline;
    }
    span {
      padding: 2px;
      margin: 0;
      border-radius: 0;
      color: var(--primary-5);
      transition: var(--transition-1);
      :hover {
        color: var(--primary-7);
        background-color: var(--grey-2);
      }
    }
  }
  @media (min-width: 600px) {
    width: 45vw;
  }
  @media (max-width: 600px) {
    margin: 2rem;
  }
  @media (min-width: 1024px) {
    width: 30vw;
    img {
      width: 30vw;
    }
  }
`
export default AboutUsCard
