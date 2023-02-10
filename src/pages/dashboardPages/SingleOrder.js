import moment from 'moment/moment'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getSingleOrderThunk } from '../../features/order/orderSlice'
import { formatPrice } from '../../utils/helper'

const SingleOrder = () => {
  const dispatch = useDispatch()
  const { _id } = useParams()
  const { isLoading, singleOrder } = useSelector((state) => state.order)
  console.log(singleOrder)
  useEffect(() => {
    dispatch(getSingleOrderThunk(_id))
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
      <div className='order-details'>
        <span>
          Order Status:
          <strong>{singleOrder.shipment ? 'completed' : 'Processing'}</strong>
        </span>
        <span>
          Total Bill:<strong>{formatPrice(singleOrder.total)}</strong>
        </span>
        <span>
          {' '}
          Payment Status:<strong>{singleOrder.redirect_status}</strong>
        </span>
        <span>
          Order Date:
          <strong>
            {moment(singleOrder.createdAt).format('DD MMMM YYYY')}
          </strong>
        </span>
      </div>
      <div className='name-image-container'>
        {singleOrder?.cart?.map((item, index) => {
          const names = item.title
          return (
            <div className='name-image' key={index}>
              <p>{names}</p>
              <img src={item.uploadImage[0].secure_url} alt={names} />
            </div>
          )
        })}
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .order-details {
    span {
      padding: 1rem;
    }
    strong {
      margin-left: 10px;
    }
  }
  img {
    width: 200px;
  }
  @media (max-width: 620px) {
    img {
      width: 150px;
    }
  }
  .name-image-container {
    display: flex;
    flex-wrap: wrap;
    .name-image {
      margin: 1rem;
      text-align: center;
      box-shadow: var(--shadow-3);
      background-color: white;
      p {
        margin-top: 0;
        background-color: var(--grey-3);
        height: 2.3rem;
      }
    }
  }
`
export default SingleOrder
