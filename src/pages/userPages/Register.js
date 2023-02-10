import { React, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import {
  forgetPasswordToggle,
  getStateValue,
  loginUserThunk,
  registerUserThunk,
} from '../../features/user/userSlice'
import ForgetPassword from '../../components/user/ForgetPassword'
import { Helmet } from 'react-helmet-async'
import FormInput from '../../components/FormInput'
import Logo from '../../components/Logo'
const genderValue = [
  'male',
  'female',
  'transgender',
  'non-binary/non-conforming',
  'prefer not to respond',
]

const Register = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state)
  const [login, setLogin] = useState(true)
  const { name, lastName, email, password, dateOfBirth, gender } = user

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login) {
      if (!email) return toast.error('please enter your Email.')
      if (!password) return toast.error('please enter your Password.')
      dispatch(loginUserThunk({ email, password }))
      return
    } else {
      if (!name) return toast.error('please enter your First Name.')
      if (!lastName) return toast.error('please enter your Last Name.')
      if (!dateOfBirth) return toast.error('please enter your Date Of Birth.')
      if (!gender) return toast.error('please enter your Gender.')
      if (!email) return toast.error('please enter your Email.')
      if (!password) return toast.error('please enter your Password.')
      dispatch(
        registerUserThunk({
          name,
          lastName,
          email,
          password,
          dateOfBirth,
          gender,
        })
      )
    }
  }
  // handle Change
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValue({ name, value }))
  }
  // handle Login
  const handleLogin = () => {
    setLogin(!login)
  }

  // handle Forget Password
  const handleForgetPassword = (e) => {
    dispatch(forgetPasswordToggle())
  }

  if (user.isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  if (user.isMember) {
    return <Navigate to={'/dashboard'} />
  }
  return (
    <Wrapper>
      <Helmet>
        <title>Register/Login</title>
        <meta
          name='description'
          content='Create an account or log into your portal.'
        />
        <link rel='canonical' href='/register' />
      </Helmet>
      <div className='div-title'>
        <div className='title-holder'>
          <Logo />
          <h1>
            Registered
            <strong> members</strong> can connect with all our
            <strong> services.</strong>
          </h1>
        </div>
      </div>
      {user.forgetPassword ? (
        <ForgetPassword />
      ) : (
        <form className='form' onSubmit={handleSubmit}>
          {/* Registration form logic */}
          {!login && (
            <div>
              <div className='name-lastName'>
                <FormInput
                  name='name'
                  label={'First Name'}
                  value={user.name}
                  onChange={handleChange}
                />
                <FormInput
                  name='lastName'
                  label={'Last Name'}
                  value={user.lastName}
                  onChange={handleChange}
                />
              </div>
              {/* date of birth */}
              <div className='date-input'>
                <FormInput
                  label={'Date Of Birth'}
                  name='dateOfBirth'
                  type='date'
                  value={user?.dateOfBirth ? user.dateOfBirth : ''}
                  onChange={handleChange}
                />
              </div>
              {/* gender */}
              <div className='gender'>
                <label htmlFor='gender'>Gender</label>
                <select
                  name='gender'
                  value={user?.gender}
                  onChange={handleChange}
                >
                  {genderValue.map((item, index) => {
                    return (
                      <option
                        select={user?.gender?.toString()}
                        key={index}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          )}
          {/* Login form logic below */}
          <div className='login'>
            <FormInput
              name='email'
              value={user.email}
              onChange={handleChange}
            />
            <FormInput
              name='password'
              type={'password'}
              value={user.password}
              onChange={handleChange}
            />
          </div>
          {/* email input */}

          {/* login in log out buttons */}
          <div className='login-register'>
            {login ? (
              <button type='submit' className='btn'>
                LogIn
              </button>
            ) : (
              <button type='submit' className='btn'>
                Register
              </button>
            )}
            <button
              className='btn'
              type='button'
              onClick={handleForgetPassword}
            >
              Forget Password
            </button>
          </div>

          <p>
            {login ? 'You are not a member ?' : 'Are you a member ?'}
            <button
              className='login-button'
              onClick={handleLogin}
              type='button'
            >
              {login ? 'Register' : 'LogIn'}
            </button>
          </p>
        </form>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  min-height: calc(100vh - 3.2rem);
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;

  .div-title {
    height: fit-content;
    display: grid;
    place-content: center;
    .title-holder {
      width: fit-content;
      height: fit-content;
    }
    div {
      margin: 0;
    }
    h1 {
      margin-top: -4rem;
      margin-left: 0;
      font-size: 1.5rem;
      max-width: 350px;
      text-transform: none;
      strong {
        color: var(--primary-5);
      }
    }
  }
  form {
    margin-top: 6rem;
    height: fit-content;
  }
  .name-lastName {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
  }

  .date-input {
    input {
      text-transform: uppercase;
    }
  }
  select {
    text-transform: capitalize;
  }
  .gender {
    padding: 5px 0;
    display: grid;
  }
  .login-button {
    background: var(--green-medium);
    border: transparent;
    font-size: large;
    margin-left: 1rem;
    border-radius: var(--radius);
    padding: 7px;
    transition: var(--transition);
    color: var(--white);

    :hover {
      cursor: pointer;
      background: var(--green-dark);
      color: white;
    }
  }
  .login-register {
    display: flex;
    justify-content: space-between;
  }
  @media (max-width: 820px) {
    min-height: fit-content;
  }
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    form {
      margin-top: 0px;
    }
  }
`
export default Register
