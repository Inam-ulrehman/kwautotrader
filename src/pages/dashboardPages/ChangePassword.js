import React from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { changePasswordThunk } from '../../features/user/userSlice'

const ChangePassword = () => {
  const dispatch = useDispatch()
  const passwordOneRef = useRef()
  const passwordTwoRef = useRef()
  const handleSubmit = (e) => {
    e.preventDefault()
    const password = passwordOneRef.current.value
    const passwordTwo = passwordTwoRef.current.value

    if (!password || !passwordTwo) {
      return toast.warning('Please enter your password.')
    }
    if (password !== passwordTwo) {
      return toast.error('Password do Not match.')
    }
    if (password.length < 8 || passwordTwo.length < 8) {
      return toast.error('Password is too short.')
    } else {
      dispatch(changePasswordThunk({ password }))
      passwordOneRef.current.value = ''
      passwordTwoRef.current.value = ''
    }
  }
  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        <div>
          <label className='form-label' htmlFor='password'>
            New Password
          </label>
          <input className='form-input' type='password' ref={passwordOneRef} />
        </div>
        <div>
          <label className='form-label' htmlFor='passwordTwo'>
            Confirm New Password
          </label>
          <input className='form-input' type='password' ref={passwordTwoRef} />
        </div>
        <button className='btn' type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default ChangePassword
