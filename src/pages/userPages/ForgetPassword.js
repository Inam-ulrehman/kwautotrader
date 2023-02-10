import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { forgetPasswordChangeThunk } from '../../features/user/userSlice'

const SingleChangePassword = () => {
  const dispatch = useDispatch()
  const passwordOneRef = useRef()
  const passwordTwoRef = useRef()
  const { id } = useParams()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    const password = passwordOneRef.current?.value
    const passwordTwo = passwordTwoRef.current?.value

    if (!password || !passwordTwo) {
      return toast.error('Please fill both fields.')
    }
    if (password !== passwordTwo) {
      return toast.warning(`Password don't match`)
    }
    if (password.length < 8) {
      return toast.warning(`Password is too short`)
    } else {
      dispatch(forgetPasswordChangeThunk({ password, id }))
      return navigate('/register')
    }
  }
  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className='form'>
        {/* password */}
        <div>
          <label className='form-label' htmlFor='password'>
            New Password
          </label>
          <input className='form-input' type='password' ref={passwordOneRef} />
        </div>
        {/* confirm password */}
        <div>
          <label className='form-label' htmlFor='password'>
            Confirm New Password
          </label>
          <input className='form-input' type='password' ref={passwordTwoRef} />
        </div>
        <p>Password must be 8 character long.</p>
        <button type='submit' className='btn'>
          Change Password
        </button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: calc(100vh - 3.2rem);
  .form {
    margin-top: 6rem;
  }
`
export default SingleChangePassword
