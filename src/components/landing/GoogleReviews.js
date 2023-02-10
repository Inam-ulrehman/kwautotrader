import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { customFetch } from '../../utils/axios'
import { GrNext, GrPrevious } from 'react-icons/gr'
import Stars from '../singleComponents/Stars'

const initialState = {
  name: '',
  rating: '',
  formatted_address: '',
  reviews: [],
  length: '',
  stringLength: 400,
  index: 0,
}

const GoogleReviews = () => {
  const [state, setState] = useState(initialState)

  const handleNext = () => {
    if (state.index === state.length - 1) {
      return setState({ ...state, index: 0 })
    }
    setState({ ...state, index: state.index + 1 })
  }
  const handlePrevious = () => {
    if (state.index === 0) {
      return setState({ ...state, index: 4 })
    }
    setState({ ...state, index: state.index - 1 })
  }

  const fetchData = async () => {
    try {
      const result = await customFetch('/googleReviews')
      const { name, rating, reviews, formatted_address } = result.data.result

      setState({
        ...state,
        name,
        rating,
        reviews,
        formatted_address,
        length: reviews.length,
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])
  return (
    <Wrapper>
      <button className='btn previous' type='button' onClick={handlePrevious}>
        <GrPrevious />
      </button>
      <button className='btn next' type='button' onClick={handleNext}>
        <GrNext />
      </button>
      <div className='heading'>
        <div className='google'>
          <img
            src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'
            alt='Google Reviews'
            title='Google Reviews'
            loading='lazy'
            width='auto'
            height='auto'
          />
          <span>Rating</span>
        </div>
        <div className='title-underline'></div>
        <div className='name-stars'>
          <div className='name'>
            <strong>{state.name}</strong>
            <p>{state.formatted_address}</p>
          </div>
          <div className='star'>
            <div className='title'>
              <strong>{state.rating} Stars</strong>
            </div>
            <Stars rating={state.rating} />
          </div>
        </div>
      </div>
      {/* ========body-card======= */}
      <div className='body'>
        <div className='body-index'>
          <span>{state.index + 1}</span>/<span>{state.length}</span>
        </div>
        <div className='body-header'>
          <div className='image-container'>
            <img
              src={state.reviews[state.index]?.profile_photo_url}
              alt={state.reviews[state.index]?.author_name}
              title={state.reviews[state.index]?.author_name}
              loading='lazy'
              width='100%'
              height='100%'
            />
          </div>
          <div className='body-title-reviews'>
            <strong>{state.reviews[state.index]?.author_name}</strong>
            <div>
              <span className='reviews'>
                <Stars rating={state.reviews[state.index]?.rating} />
              </span>
              <span>
                {state.reviews[state.index]?.relative_time_description}
              </span>
            </div>
          </div>
        </div>
        <div className='body-description'>
          {/* state.reviews[state.index]?.text.substring(0, 200) */}
          <p>
            {state.reviews[state.index]?.text.substring(0, state.stringLength)}
            {state.reviews[state.index]?.text.length > state.stringLength && (
              <span onClick={() => setState({ ...state, stringLength: 2000 })}>
                Read More...
              </span>
            )}
          </p>
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: relative;
  min-height: calc(100vh - 3.2rem);
  .next {
    position: absolute;
    top: 50%;
    right: 5%;
    background-color: transparent;
    :hover {
      background-color: var(--grey-3);
    }
  }
  .previous {
    position: absolute;
    top: 50%;
    left: 5%;
    background-color: transparent;
    :hover {
      background-color: var(--grey-3);
    }
  }
  .heading {
    .google {
      text-align: center;
      padding: 1rem;
      img {
        margin-bottom: -10px;
      }
      span {
        font-size: 4rem;

        color: var(--grey-6);
      }
    }
  }
  .name-stars {
    padding: 1rem;
    display: flex;
    justify-content: space-around;
    max-width: 80vw;
    margin: 0 auto;
    .name {
      strong {
        color: var(--grey-5);
      }
      p {
        margin: 0;
        color: var(--grey-4);
      }
    }
  }
  .star {
    text-align: center;
    min-width: 100px;
    strong {
      color: var(--grey-5);
    }
  }
  .body {
    box-shadow: var(--shadow-2);
    padding: 1rem;

    margin: 1rem auto;
    max-width: 70vw;
    position: relative;
    .body-index {
      position: absolute;
      top: 1%;
      right: 1%;
      background-color: var(--grey-);
      padding: 5px;
      border-radius: 50%;
      color: var(--white);
    }
    .body-header {
      display: flex;

      img {
        max-width: 70px;
      }
      .body-title-reviews {
        padding-left: 1.5rem;
        strong {
          color: var(--grey-5);
        }
      }
    }
    .body-description {
      p {
        color: var(--grey-4);
        margin-bottom: 0;
        text-transform: none;
      }
      span {
        padding: 2px;
        margin: 0;
        border-radius: 0;
        color: var(--primary-5);
        transition: var(--transition-1);
        :hover {
          cursor: pointer;
          color: var(--primary-7);
          background-color: var(--grey-2);
        }
      }
    }
  }

  @media (max-width: 620px) {
    .body {
      max-width: 70vw;
    }
    .google {
      margin-bottom: 1rem;
    }
    .next {
      right: 1%;
    }
    .previous {
      left: 1%;
    }
  }
`
export default GoogleReviews
