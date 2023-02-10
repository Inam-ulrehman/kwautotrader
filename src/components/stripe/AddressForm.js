import React from 'react'
import { AddressElement } from '@stripe/react-stripe-js'
import { useEffect } from 'react'

const AddressForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <form>
      <h3>Shipping Address</h3>
      <AddressElement options={{ mode: 'shipping' }} />
    </form>
  )
}

export default AddressForm
