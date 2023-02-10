import { configureStore } from '@reduxjs/toolkit'
import orderSlice from './features/order/orderSlice'
import productSlice from './features/product/productSlice'
import userSlice from './features/user/userSlice'
import websiteContentSlice from './features/websiteContent/websiteContentSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    order: orderSlice,
    websiteContent: websiteContentSlice,
  },
})

export default store
