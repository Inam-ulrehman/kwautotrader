import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const initialState = {
  name: '',
  email: '',
  password: '',
  isLoading: false,
}

export const userThunk = createAsyncThunk(
  'user/userThunk',
  async (_, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.get()
      console.log('hello Thunk')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
  },
  extraReducers: {
    [userThunk.pending]: (state, { payload }) => {
      console.log('promise pending')
      state.isLoading = true
    },
    [userThunk.fulfilled]: (state, { payload }) => {
      console.log('promise full filled')
      state.isLoading = false
    },
    [userThunk.rejected]: (state, { payload }) => {
      console.log('promise rejected')
      state.isLoading = false
    },
  },
})
export const { createFunction } = userSlice.actions
export default userSlice.reducer
