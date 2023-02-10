import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import OrdersHolder from '../../components/dashboard/OrdersHolder'
import { getOrdersThunk } from '../../features/order/orderSlice'
import emptyCart from '../../images/empty_cart.svg'

const Orders = () => {
  const dispatch = useDispatch()
  const { isLoading, ordersList } = useSelector((state) => state.order)

  useEffect(() => {
    dispatch(getOrdersThunk())

    // eslint-disable-next-line
  }, [])
  if (isLoading) {
    return (
      <>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </>
    )
  }
  return (
    <Wrapper>
      {ordersList.length > 0 ? null : (
        <div className='empty-cart'>
          <h3>Your cart is empty.</h3>
          <img src={emptyCart} alt='Your cart is empty.' />
        </div>
      )}

      {/* ===holding orders */}
      {ordersList.length > 0 && <OrdersHolder />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: calc(100vh - 3.2rem);
  .empty-cart {
    display: grid;
    place-content: center;
    img {
      width: 400px;
    }
  }
  /* ===== Table Data */
  .container {
    text-align: center;
  }
  .image {
    img {
      width: 50px;
    }
  }
`

export default Orders
