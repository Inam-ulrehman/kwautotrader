import React, { useEffect } from 'react'
import queryString from 'query-string'
import { useDispatch, useSelector } from 'react-redux'
import { createOrderThunk } from '../../features/order/orderSlice'
import { totalBill } from '../../utils/helper'
import { useState } from 'react'
import { emptyCart } from '../../features/product/productSlice'

const PaymentStatus = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState(false)
  const { cart } = useSelector((state) => state.product)
  const payment = queryString.parse(window.location.search)
  const { payment_intent, payment_intent_client_secret, redirect_status } =
    payment
  const success = redirect_status === 'succeeded'
  const processing = redirect_status === 'processing'
  const total = totalBill(cart)

  const order = {
    cart,
    payment_intent,
    payment_intent_client_secret,
    redirect_status,
    total,
  }
  const postOrder = () => {
    dispatch(createOrderThunk(order))
  }

  // I have created this useEffect to stop double Order.

  useEffect(() => {
    setValue(true)
    if (value && (success || processing)) {
      postOrder()
      dispatch(emptyCart())
    }

    // eslint-disable-next-line
  }, [value])

  if (success) {
    return (
      <div>
        <h4>Success! Payment received...</h4>
      </div>
    )
  }

  if (processing) {
    return (
      <div>
        <h4>Payment processing. We'll update you when payment is received.</h4>
      </div>
    )
  }
  if (redirect_status === 'requires_payment_method') {
    return (
      <div>
        <h4>Payment failed. Please try another payment method.</h4>
      </div>
    )
  } else {
    return (
      <div>
        <h4>Something went wrong.</h4>
      </div>
    )
  }
}

export default PaymentStatus
