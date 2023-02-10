import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import AboutUsCard from '../../components/aboutUs/AboutUsCard'

const AboutUs = () => {
  const { aboutUsTitle, aboutUs } = useSelector((state) => state.websiteContent)
  const { title, paragraph } = aboutUsTitle

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={paragraph} />
        <link rel='canonical' href='/about' />
      </Helmet>
      <Wrapper>
        {/* headings */}
        <div className='box-1'>
          <div className='heading'>
            <h1 className='title'>{title}</h1>
            <div className='title-underline'></div>
            <p className='small'>{paragraph}</p>
          </div>
        </div>
        {/* Team Members */}
        <div className='box-2'>
          {aboutUs.map((item, index) => {
            const { uploadImage, name, profession, paragraph, _id } = item
            return (
              <AboutUsCard
                key={index}
                _id={_id}
                image={uploadImage[0]?.secure_url}
                name={name}
                profession={profession}
                paragraph={paragraph}
              />
            )
          })}
        </div>
      </Wrapper>
    </>
  )
}
const Wrapper = styled.div`
  display: grid;
  .box-1 {
    h1 {
      padding-top: 1.5rem;
      font-size: 2rem;
      margin: 0 auto;
      margin-bottom: 1rem;
      max-width: 500px;
      color: var(--grey-5);
    }
    p {
      margin: 1rem auto;
      padding: 1rem;
      color: var(--grey-5);
    }
  }
  /* Team Members */

  .box-2 {
    display: flex;
    flex-wrap: wrap;
  }
`
export default AboutUs
