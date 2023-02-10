import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaPlusSquare, FaMinusSquare, FaTrash } from 'react-icons/fa'
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeCartItem,
} from '../features/product/productSlice'
import { formatPrice, totalBill } from '../utils/helper'
import EmptyCart from '../components/EmptyCart'

const Cart = () => {
  const dispatch = useDispatch()
  const { product, user } = useSelector((state) => state)
  const { cart } = product
  console.log(cart)

  // ==== Calculator function=====
  const TotalAmount = totalBill(cart)

  // ===== Remove Item =====
  const handleRemove = (_id) => {
    dispatch(removeCartItem(_id))
  }

  const handleIncrease = (_id) => {
    dispatch(increaseItemQuantity(_id))
  }
  // ==== handle Decrease =====

  const handleDecrease = (_id) => {
    dispatch(decreaseItemQuantity(_id))
  }
  if (cart.length === 0) {
    return <EmptyCart />
  }
  return (
    <Wrapper>
      <table className='table'>
        <tbody>
          <tr className='heading'>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>ITEMS</th>
            <th>PRICE</th>
            <th className='action'>ACTION</th>
          </tr>

          {cart.map((item, index) => {
            return (
              <tr key={index}>
                <td className='img'>
                  <img src={item.uploadImage[0].secure_url} alt='Cart' />
                </td>
                <td className='name-box'>
                  <span>{item.title}</span>
                  <strong>{item.category}</strong>
                </td>
                <td>
                  <div className='quantity'>
                    <button
                      className='btn'
                      type='button'
                      onClick={() => handleDecrease(item._id)}
                    >
                      <FaMinusSquare />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className='btn'
                      type='button'
                      onClick={() => handleIncrease(item._id)}
                    >
                      <FaPlusSquare />
                    </button>
                  </div>
                </td>
                <td className='price'>
                  {formatPrice(item.amount).slice(2, 15)}
                </td>
                <td className='action'>
                  <button
                    className='btn'
                    type='button'
                    onClick={() => handleRemove(item._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='total'>
        <p>
          <strong>Total Bill</strong>
        </p>
        <p>
          <strong> {formatPrice(TotalAmount)}</strong>
        </p>
      </div>
      <div className='checkout'>
        <Link
          to={`${user.isMember ? '/dashboard/checkout' : '/register'}`}
          className='btn'
        >
          CheckOut
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 2rem;
  min-height: 100vh;
  padding-top: 5rem;
  /* table */
  .table {
    text-align: center;
    th,
    tr,
    td,
    tbody {
      border: none;
    }
  }

  table {
    border: none;
  }
  td {
    border-top: 2px solid var(--grey-2) !important;
  }

  /* name */
  .name-box {
    text-transform: capitalize;
    span {
      display: block;
    }
  }

  /* Quantity */
  .quantity {
    span {
      padding: 0.1rem 1.2rem;
    }
  }

  .checkout {
    text-align: center;
    margin: 1rem;
  }
  .img {
    border: transparent;
    img {
      max-width: 100px;
    }
  }
  .total {
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
    border: 2px solid var(--grey-3);
  }
  @media (max-width: 600px) {
    padding: 0px;
    margin: 0 auto;
    width: 400px;
    table {
    }
    .heading {
      width: 400px;
    }
    .quantity {
      display: grid;
      justify-content: space-evenly;
      width: 5px;
      margin: 0 auto;

      button {
        padding: 2px;
        width: 25px;
      }
      span {
        padding: 0;
        background-color: transparent;
        width: 23px;
        border-top: 0px solid black;
        border-bottom: 0px solid black;
      }
    }

    padding-top: 0px;
    .total {
      max-width: 400px;
      margin: 0 auto;
    }
  }
  @media (max-width: 400px) {
  }
`

export default Cart
