import React from 'react'
import styled from 'styled-components'
import emptyCart from '../images/empty_cart.svg'

const EmptyCart = () => {
  return (
    <Wrapper>
      <div className='container'>
        <h3 className='title'>Your cart is Empty</h3>
        <img src={emptyCart} alt='empty cart' title='empty cart' />
      </div>
      {/* <img src={emptyCart} alt='' /> */}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: grid;
  justify-content: center;

  .container {
    height: calc(100vh - 61px);

    width: 500px;

    img {
      width: 100%;
    }
  }
  @media (max-width: 600px) {
    .container {
      width: 300px;
    }
  }
`
export default EmptyCart
