import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { formatPrice } from '../../utils/helper'

const SubCategoryHolder = ({ subCategoryProducts }) => {
  const navigate = useNavigate()

  const handleClick = (_id) => {
    navigate(`/products/${_id}`)
  }
  return (
    <Wrapper>
      {subCategoryProducts.map((item, index) => {
        return (
          <div
            key={index}
            className='box-holder'
            onClick={() => handleClick(item._id)}
          >
            <div className='image-holder'>
              <img
                src={item.uploadImage[0].secure_url}
                alt={item.title}
                title={item.title}
                loading='eager'
                width='100%'
                height='100%'
              />
            </div>
            <span>{item.title}</span>
            <span>{formatPrice(item.amount).slice(2, 15)}</span>
          </div>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  box-shadow: var(--shadow-2);
  background-color: var(--grey-05);
  padding: 1rem;
  span {
    text-transform: capitalize;
  }
  .box-holder {
    box-shadow: var(--shadow-1);
    padding: 0 5px;
    color: var(--primary-9);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: var(--transition-1);
    :hover {
      cursor: pointer;
      box-shadow: var(--shadow-3);
    }
    .image-holder {
      width: 70px;
    }
    span {
      color: var(--grey-5);
    }
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`

export default SubCategoryHolder
