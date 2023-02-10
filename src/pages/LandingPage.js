import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
// import { GoogleMaps } from '../components/GoogleMaps'
import {
  LandingNewProducts,
  LandingFeatureProduct,
  LandingShare,
  GoogleReviews,
} from '../components/landing'

const LandingPage = () => {
  const { sectionOne, sectionTwo, sectionThree } = useSelector(
    (state) => state.websiteContent
  )
  return (
    <>
      <Helmet>
        <title>{sectionOne?.heading}</title>
        <meta name='description' content={sectionOne?.paragraph} />
        <link rel='canonical' href='/' />
      </Helmet>
      <LandingShare landingPage={sectionOne} heading={1} />
      <LandingFeatureProduct />
      <LandingShare landingPage={sectionTwo} heading={2} />
      <LandingNewProducts />
      <LandingShare landingPage={sectionThree} heading={3} />
      <GoogleReviews />
      {/* <GoogleMaps /> */}
    </>
  )
}

export default LandingPage
