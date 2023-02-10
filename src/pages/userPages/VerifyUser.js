import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { verifyUserThunk } from '../../features/user/userSlice'

const VerifyUser = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(verifyUserThunk(id))
    navigate('/')
    // eslint-disable-next-line
  }, [])
  return <div>VerifyUser</div>
}

export default VerifyUser
