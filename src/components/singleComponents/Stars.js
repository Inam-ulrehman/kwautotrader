import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import styled from 'styled-components'

const Stars = ({ rating }) => {
  const number = rating

  return (
    <Wrapper>
      <span>{rating >= number ? <AiFillStar /> : <AiOutlineStar />}</span>
      <span>{rating >= number ? <AiFillStar /> : <AiOutlineStar />}</span>
      <span>{rating >= number ? <AiFillStar /> : <AiOutlineStar />}</span>
      <span>{rating >= number ? <AiFillStar /> : <AiOutlineStar />}</span>
      <span>{rating >= number ? <AiFillStar /> : <AiOutlineStar />}</span>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  span {
    svg {
      path {
        color: orange;
      }
    }
  }
`
export default Stars
