import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ScrollToTopHook from './hooks/ScrollToTopHook'
import {
  SharedLayout,
  LandingPage,
  ErrorPage,
  Contact,
  ProtectedRoute,
  SharedDashboardLayout,
  Cart,
  Prices,
} from './pages'
import { Products, SingleProduct } from './pages/productPages'
import { CheckOut, PaymentStatus } from './pages/stripePages'
import {
  Dashboard,
  Profile,
  ChangePassword,
  Orders,
  SingleOrder,
} from './pages/dashboardPages'
import { ForgetPassword, Register, VerifyUser } from './pages/userPages'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { websiteContentThunk } from './features/websiteContent/websiteContentSlice'
import { getProductThunk } from './features/product/productSlice'
import { AboutUs, SingleAboutUs } from './pages/aboutUsPages'

const App = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.websiteContent)

  useEffect(() => {
    dispatch(websiteContentThunk())
    dispatch(getProductThunk())
    // eslint-disable-next-line
  }, [])
  if (isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <BrowserRouter>
      <ScrollToTopHook />
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<LandingPage />} />

          {/* =======Dashboard======== */}
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <SharedDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path='/dashboard/checkout' element={<CheckOut />} />
            <Route
              path='/dashboard/checkout/paymentStatus'
              element={<PaymentStatus />}
            />
            <Route path='/dashboard/orders' element={<Orders />} />
            <Route path='/dashboard/orders/:_id' element={<SingleOrder />} />
            <Route path='/dashboard/profile' element={<Profile />} />
            <Route
              path='/dashboard/changepassword'
              element={<ChangePassword />}
            />
          </Route>
          {/* =======Dashboard======== */}
          <Route path='changepassword/:id' element={<ForgetPassword />} />
          <Route path='verify/:id' element={<VerifyUser />} />
          <Route path='about' element={<AboutUs />} />
          <Route path='about/:_id' element={<SingleAboutUs />} />
          <Route path='products' element={<Products />} />
          <Route path='products/:_id' element={<SingleProduct />} />
          <Route path='prices' element={<Prices />} />
          <Route path='contact' element={<Contact />} />
          <Route path='register' element={<Register />} />
          <Route path='cart' element={<Cart />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
