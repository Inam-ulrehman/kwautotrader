import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { customFetch } from '../utils/axios'
const image =
  'https://res.cloudinary.com/inam6530/image/upload/v1673448474/Default%20project/contactUs/Support_2_toxjey.png'

const initialState = {
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
  isLoading: false,
}

const Contact = () => {
  const [state, setState] = useState(initialState)
  const { name, phone, email, message, subject, isLoading } = state
  const handleSubmit = async (e) => {
    // Prepare axios and good to go.
    e.preventDefault()

    if (!name || !phone || !email || !message || !subject) {
      return toast.warning('Please fill all fields.')
    } else {
      setState({ ...state, isLoading: true })
      try {
        const response = await customFetch.post('contacts', state)
        toast.success(
          `Hello, ${response.data.contact.name}. A team member will be in touch soon.`
        )
        setState(initialState)
      } catch (error) {
        setState({ ...state, isLoading: false })
        console.log(error)
      }
    }
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setState({ ...state, [name]: value })
  }
  return (
    <>
      <Helmet>
        <title>Contact Us</title>
        <meta
          name='description'
          content='We are here 24/7 to answer all your questions.'
        />
        <link rel='canonical' href='/contact' />
      </Helmet>
      <Wrapper>
        <form onSubmit={handleSubmit} className='form'>
          <h1 className='title'>Get In Touch with us</h1>
          <div className='title-underline'></div>
          {/* name */}
          <div>
            <label className='form-label'>Full Name</label>
            <input
              className='form-input'
              type='text'
              name='name'
              value={name}
              onChange={handleChange}
            />
          </div>
          {/* Mobile */}
          <div className='mobile'>
            <label className='form-label '>Mobile Number</label>
            <input
              className='form-input'
              type='number'
              name='phone'
              value={phone}
              onChange={handleChange}
            />
          </div>
          {/* Email */}
          <div>
            <label className='form-label'>Email Address</label>
            <input
              className='form-input'
              type='email'
              name='email'
              value={email}
              onChange={handleChange}
            />
          </div>
          {/* Subject */}
          <div>
            <label className='form-label'>Subject</label>
            <input
              className='form-input'
              name='subject'
              type='text'
              value={subject}
              onChange={handleChange}
            />
          </div>
          {/* Message */}
          <div>
            <label className='form-label'>Message</label>
            <textarea
              className='form-input'
              type='text'
              cols='50'
              rows='5'
              name='message'
              value={message}
              onChange={handleChange}
            />
          </div>
          <button disabled={isLoading} type='submit' className='btn btn-block'>
            Submit
          </button>
        </form>
        <div className='contactImage'>
          <div className='address'></div>
          <img
            src={image}
            alt='ContactUs'
            title='ContactUs'
            loading='eager'
            width='100&'
            height='100%'
          />
        </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  h1 {
    margin-top: 0;
    font-size: 1rem;
  }

  .contactImage {
    margin-left: 2rem;
    box-shadow: var(--shadow-2);
    border-radius: var(--radius-1);
    padding: 1rem;

    background-color: var(--primary-1);
    img {
      margin-bottom: -1.5rem;
      margin-left: -1rem;
      border-bottom-left-radius: var(--radius-1);
      width: 40vw;
    }
  }
  .mobile {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type='number'] {
      -moz-appearance: textfield;
    }
  }
  @media (max-width: 720px) {
    .contactImage {
      display: none;
    }
  }
`
export default Contact
