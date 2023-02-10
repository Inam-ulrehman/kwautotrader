import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getStateValues } from '../../features/product/productSlice'

const LandingFeatureProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { featureProducts } = useSelector((state) => state.product)

  const handleClick = (category) => {
    navigate(`/products`)
    dispatch(getStateValues({ name: 'searchCategory', value: category }))
  }
  return (
    <Wrapper>
      <div className='container-header'>
        <div className='title'>
          Feature <span>Services</span>
        </div>
        <div className='title-underline'></div>
      </div>
      <div className='container'>
        {featureProducts
          .map((item, index) => {
            return (
              <div
                onClick={() => handleClick(item.category)}
                className='container-holder'
                key={index}
              >
                <div className='container-image'>
                  <img
                    src={item.uploadImage[0].secure_url}
                    alt={item.category}
                    title={item.category}
                    loading='eager'
                    width='100%'
                    height='100%'
                  />
                </div>
                <div className='container-paragraph'>
                  <p>{item.category}</p>
                </div>
              </div>
            )
          })
          .slice(0, 4)}
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: grid;
  align-content: space-evenly;
  .container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    padding: 1rem;
  }
  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 8px;
    span {
      color: var(--primary-5);
    }
  }
  .container-holder {
    max-width: 280px;
    box-shadow: var(--shadow-1);
    position: relative;
    transition: var(--transition-1);
    :hover {
      cursor: pointer;
      box-shadow: var(--shadow-3);
      .container-paragraph {
        opacity: 1;
        background-color: var(--primary-9);
      }
      p {
        color: var(--white);
      }
    }
  }
  .container-image {
    width: 280px;
    height: 280px;
    img {
      width: 100%;
    }
  }
  .container-paragraph {
    position: absolute;
    bottom: 0;
    padding: 5px;
    background: var(--primary-5);
    opacity: 0.8;
    width: 100%;
    text-align: center;
    transition: var(--transition-1);
    p {
      color: var(--white);
      margin: 0;
    }
  }
  @media (min-width: 992px) {
    min-height: calc(100vh - 3.2rem);
  }

  @media (max-width: 1024px) {
    .container-holder {
      max-width: 210px;
    }
    .container-image {
      width: 210px;
      height: 210px;
    }
  }
  @media (max-width: 992px) {
  }
  @media (max-width: 768px) {
    .container-holder {
      max-width: 190px;
    }
    .container-image {
      width: 190px;
      height: 190px;
    }
  }
  @media (max-width: 620px) {
    min-height: auto;
    .container-holder {
      margin-top: 1rem;
      max-width: 180px;
    }
    .container-image {
      width: 180px;
      height: 180px;
    }
  }
  @media (max-width: 400px) {
    .container-holder {
      margin-top: 1rem;
      max-width: 160px;
    }
    .container-image {
      width: 160px;
      height: 160px;
    }
  }
`
export default LandingFeatureProduct
