import { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { customFetch } from '../../utils/axios'
import { useSelector } from 'react-redux'

import {
  AddressForm,
  StripeProfile,
  CheckoutForm,
} from '../../components/stripe'
import styled from 'styled-components'

const CheckOut = () => {
  const { cart } = useSelector((state) => state.product)
  const [showCart, setShowCart] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  // eslint-disable-next-line
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_API_KEY)
  )

  const getClientSecret = async () => {
    try {
      const response = await customFetch.post('/stripe', cart)
      const { client_secret } = response.data
      setClientSecret(client_secret)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getClientSecret()
    // eslint-disable-next-line
  }, [])

  const appearance = {
    theme: 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  }
  return (
    <Wrapper>
      <strong> Success card : 4242 4242 4242 4242</strong>
      <strong> fail card : 4000000000009995</strong>

      {!showCart && <StripeProfile setShowCart={setShowCart} />}

      {clientSecret && showCart && (
        <Elements stripe={stripePromise} options={options}>
          <div className='heading'>
            <h3 className='title'>Payment Details</h3>
            <div className='title-underline'></div>
          </div>
          <AddressForm />
          <CheckoutForm />
        </Elements>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  padding: 1rem;
  .heading {
    margin: 1rem;
  }
`
export default CheckOut

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
