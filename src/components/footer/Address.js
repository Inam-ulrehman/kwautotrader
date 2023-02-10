import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Address = () => {
  const {
    address: contentAddress,
    mobileNumber,
    landLine,
    email,
    googleLocation,
  } = useSelector((state) => state.websiteContent.contentContacts)
  const address = [
    {
      id: 1,
      title: 'Address',
      titleInfo: googleLocation,
      titleText: contentAddress,
      target: '_blank',
      rel: 'noreferrer',
    },
    {
      id: 2,
      title: 'Mobile Number',
      titleInfo: `tel:${mobileNumber}`,
      titleText: mobileNumber,
    },
    {
      id: 3,
      title: 'Landline',
      titleInfo: `tel:${landLine}`,
      titleText: landLine,
    },
    {
      id: 4,
      title: 'Email',
      titleInfo: `mailto:${email}`,
      titleText: email,
    },
  ]
  return (
    <Wrapper className='boxDesign'>
      <div className='title'>Contact US</div>
      {address.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.title} : </p>
            <a href={item.titleInfo} target={item.target}>
              {item.titleText}
            </a>
          </div>
        )
      })}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .title {
    font-size: 2rem;
  }
  p,
  a {
    margin: 0;
    display: inline;
  }
  a {
    color: var(--white);
    transition: var(--transition);
    padding: 0.3rem 1rem;
    border-radius: var(--radius-1);
    text-transform: capitalize;
    :hover {
      cursor: pointer;
      background-color: var(--primary-7);
    }
  }
`
export default Address
