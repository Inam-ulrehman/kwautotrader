import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'
import { getUniqueValues } from '../../utils/helper'
import {
  getCartFromLocalStorage,
  removeCartFromLocalStorage,
  setCartInLocalStorage,
} from '../../utils/localStorage'

const cart = getCartFromLocalStorage()
const initialState = {
  category: [],
  categoryIndex: 0,
  initialProductList: [],
  productList: [],
  featureProducts: [],
  newProducts: [],
  singleProduct: '',
  singleProductImages: [],
  nbHits: '',
  cart: cart || [],
  isLoading: false,

  // search
  searchTitle: '',
  searchCategory: '',
  // pagination
  list: [],
  page: 1,
  limit: 20,
  count: '',
  sort: '-createdAt',
  feature: false,
}

export const productThunk = createAsyncThunk(
  'product/productThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get()
      console.log('hello Thunk')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// get All Products Thunk
export const getAllProductsThunk = createAsyncThunk(
  'product/getAllProductsThunk',
  async (state, thunkAPI) => {
    try {
      const response = await customFetch.get(
        `/products?title=${state?.searchTitle}&category=${state?.searchCategory}&feature=${state?.feature}&sort=${state?.sort}&limit=${state?.limit}&page=${state?.page}`
      )

      return response.data
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
//  ==== Get Static Products
export const getProductThunk = createAsyncThunk(
  'product/getProductThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/products/static')

      const { products, nbHits } = response.data
      const category = getUniqueValues(products, 'category')

      return { category, products, nbHits }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
//  ==== Get Single Products
export const getSingleProductThunk = createAsyncThunk(
  'product/getSingleProductThunk',
  async (_id, thunkAPI) => {
    try {
      const response = await customFetch.get(`products/static/${_id}`)

      return response.data.products
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const userSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    getStateValues: (state, { payload }) => {
      const { name, value } = payload
      state[name] = value
    },
    clearState: (state, { payload }) => {
      state.categoryIndex = 0
      // search
      state.searchTitle = ''
      state.searchCategory = ''
      // pagination
      state.page = 1
      state.limit = 20
      state.sort = '-createdAt'
      state.feature = false
    },
    // pagination

    next: (state, { payload }) => {
      console.log('next')
      state.page = state.page + 1
    },
    prev: (state, { payload }) => {
      console.log('prev')
      state.page = state.page - 1
    },
    index: (state, { payload }) => {
      const index = Number(payload)
      state.page = index
    },
    // feature solution
    handleFeature: (state, { payload }) => {
      state.feature = !state.feature
    },
    // cart
    emptyCart: (state, { payload }) => {
      removeCartFromLocalStorage()
      state.cart = []
    },
    getCart: (state, { payload }) => {
      state.cart = [...state.cart, payload]
      setCartInLocalStorage(state.cart)
    },
    removeCartItem: (state, { payload }) => {
      const cart = state.cart.filter((item) => item._id !== payload)
      state.cart = cart
      setCartInLocalStorage(state.cart)
    },
    increaseItemQuantity: (state, { payload }) => {
      const index = state.cart.findIndex((item) => {
        return item._id === payload
      })
      if (state.cart[index].quantity >= state.cart[index].totalStock) {
        toast.error('Maximum available stock.')
        return
      }
      state.cart[index].quantity = state.cart[index].quantity + 1

      setCartInLocalStorage(state.cart)
    },
    decreaseItemQuantity: (state, { payload }) => {
      const index = state.cart.findIndex((item) => {
        return item._id === payload
      })
      if (state.cart[index].quantity === 1) {
        return
      }
      state.cart[index].quantity = state.cart[index].quantity - 1
      setCartInLocalStorage(state.cart)
    },
  },
  extraReducers: {
    [productThunk.pending]: (state, { payload }) => {
      console.log('promise pending')
      state.isLoading = true
    },
    [productThunk.fulfilled]: (state, { payload }) => {
      console.log('promise full filled')
      state.isLoading = false
    },
    [productThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
    },
    // Get All products Pagination

    [getAllProductsThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getAllProductsThunk.fulfilled]: (state, { payload }) => {
      state.list = payload.result
      state.count = payload.totalOrders

      state.isLoading = false
    },
    [getAllProductsThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
    },
    // ==== get Static products

    [getProductThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getProductThunk.fulfilled]: (state, { payload }) => {
      const { category, products, nbHits } = payload

      state.category = category
      state.featureProducts = products.filter((item) => item.feature === true)
      state.newProducts = payload.products.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      state.initialProductList = products
      state.productList = products
      state.nbHits = nbHits
      state.isLoading = false
    },
    [getProductThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)

      state.isLoading = false
    },
    //  ==== Get Single Product ====
    [getSingleProductThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getSingleProductThunk.fulfilled]: (state, { payload }) => {
      state.singleProduct = payload
      state.singleProductImages = payload.uploadImage
      state.isLoading = false
    },
    [getSingleProductThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
  },
})
export const {
  clearState,
  next,
  prev,
  index,
  handleFeature,
  createFunction,
  getStateValues,
  getCart,
  emptyCart,
  removeCartItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} = userSlice.actions
export default userSlice.reducer
