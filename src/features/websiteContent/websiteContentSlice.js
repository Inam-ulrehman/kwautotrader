import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customFetch } from '../../utils/axios'

const initialState = {
  logo: '',
  sectionOne: '',
  sectionTwo: '',
  sectionThree: '',
  contentContacts: '',
  contentSocialLinks: '',
  aboutUsTitle: '',
  aboutUs: [],
  isLoading: false,
}

export const websiteContentThunk = createAsyncThunk(
  'websiteContent/websiteContentThunk',
  async (_, thunkAPI) => {
    try {
      const resultLogo = await customFetch.get('/ContentLogo')
      const resultOne = await customFetch.get('/sectionOne')
      const resultTwo = await customFetch.get('/sectionTwo')
      const resultThree = await customFetch.get('/sectionThree')
      const resultContact = await customFetch.get('/contentContact')
      const resultAboutUsTitle = await customFetch.get('/ContentAboutUsTitle')
      const resultAboutUs = await customFetch.get('/ContentAboutUs')
      const resultSocialLinks = await customFetch.get('/contentSocialLinks')

      const logo = resultLogo.data.contentLogo
      const sectionOne = resultOne.data.sectionOne
      const sectionTwo = resultTwo.data.sectionTwo
      const sectionThree = resultThree.data.sectionThree
      const contentContacts = resultContact.data.contentContact
      const contentSocialLinks = resultSocialLinks.data.contentSocialLink
      const aboutUsTitle = resultAboutUsTitle.data.contentAboutUsTitle
      const aboutUs = resultAboutUs.data.contentAboutUs

      const data = [
        logo,
        sectionOne,
        sectionTwo,
        sectionThree,
        contentContacts,
        contentSocialLinks,
        aboutUsTitle,
        aboutUs,
      ]

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const websiteContentSlice = createSlice({
  name: 'websiteContent',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
  },
  extraReducers: {
    [websiteContentThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [websiteContentThunk.fulfilled]: (state, { payload }) => {
      state.logo = payload[0]
      state.sectionOne = payload[1]
      state.sectionTwo = payload[2]
      state.sectionThree = payload[3]
      state.contentContacts = payload[4]
      state.contentSocialLinks = payload[5]
      state.aboutUsTitle = payload[6]
      state.aboutUs = payload[7]
      state.isLoading = false
    },
    [websiteContentThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
    },
  },
})
export const { createFunction } = websiteContentSlice.actions
export default websiteContentSlice.reducer
