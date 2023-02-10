import React, { useState } from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import {
  forgetPasswordLinkThunk,
  forgetPasswordToggle,
} from '../../features/user/userSlice'

const ForgetPassword = () => {
  const emailRef = useRef()
  const dispatch = useDispatch()
  const { user } = useState((state) => state)
  const handleSubmit = (e) => {
    e.preventDefault()
    const email = emailRef.current.value.toLowerCase()

    if (!email) {
      return toast.error('Please enter your Email.')
    } else {
      dispatch(forgetPasswordLinkThunk({ email }))
    }
  }

  const handleButton = () => {
    dispatch(forgetPasswordToggle())
  }
  if (user?.isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        {/* Email input */}
        <div>
          <p>Please Enter your email So we can send you a verification link.</p>
          <label className='form-label' htmlFor='email'>
            Email
          </label>
          <input ref={emailRef} className='form-input' type='text' />
        </div>
        <div className='submit-login'>
          <button className='btn' type='submit'>
            Submit
          </button>
          <button onClick={handleButton} className='btn' type='button'>
            login/Register
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .submit-login {
    display: flex;
    justify-content: space-between;
  }
`
export default ForgetPassword
