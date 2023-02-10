import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
const url = `https://res.cloudinary.com/inam6530/image/upload/v1667486202/inamwebsolutions/Inam_n9s4i4.svg`
const Logo = () => {
  const navigate = useNavigate()
  const { logo } = useSelector((state) => state.websiteContent)
  const image = logo?.uploadImage?.secure_url
  const handleClick = () => {
    navigate('/')
  }

  return (
    <Wrapper onClick={handleClick}>
      <img
        src={image ? image : url}
        alt='Logo'
        loading='eager'
        title='Logo'
        width='100%'
        height='100%'
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 200px;
  height: 200px;
  margin-left: 1rem;
  margin-top: -75px;
  img {
    width: 100%;
  }
  transition: var(--transition-1);
  :hover {
    cursor: pointer;
    scale: 1.1;
  }
`
export default Logo
