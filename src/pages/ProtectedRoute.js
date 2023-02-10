import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state)

  if (!user.isMember) {
    return <Navigate to={'/'} />
  } else {
    return children
  }
}

export default ProtectedRoute
