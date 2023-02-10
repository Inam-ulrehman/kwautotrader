import moment from 'moment/moment'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { formatPrice } from '../../utils/helper'
import Pagination from '../Pagination'

const OrdersHolder = () => {
  const { ordersList, totalOrders } = useSelector((state) => state.order)
  const [index, setIndex] = useState(0)
  return (
    <Wrapper className='orders'>
      <div className='total-page'>
        <strong>Total Orders: {totalOrders}</strong>
        <strong>Page No : {index + 1}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>TOTAL</th>
            <th>DATE</th>
            <th>ACTION</th>
          </tr>

          {ordersList[index]?.map((item) => {
            const names = item.cart.map((item, index) => {
              const name = [item.title]
              return name
            })
            const images = item.cart.map((item, index) => {
              const image = item.uploadImage
              return image
            })

            return (
              <tr className='container' key={item._id}>
                <td className='image'>
                  {images.map((item, index) => {
                    return (
                      <div key={index}>
                        <img src={item[0].secure_url} alt='Order' />
                      </div>
                    )
                  })}
                </td>
                <td className='name'>
                  {names.map((item, index) => {
                    return <div key={index}>{item}</div>
                  })}
                </td>

                <td>{formatPrice(item.total)}</td>
                <td>{moment(item.createdAt).format('MMMM DD YYYY')}</td>
                <td>
                  <Link className='btn' to={`${item._id}`}>
                    DETAILS
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Pagination index={index} setIndex={setIndex} productsList={ordersList} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .total-page {
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
  }
`

export default OrdersHolder
