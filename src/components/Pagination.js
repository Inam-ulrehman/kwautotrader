import React from 'react'
import styled from 'styled-components'

const Pagination = ({ index, setIndex, productsList }) => {
  // handle Previous
  const handlePrevious = () => {
    if (index <= 0) {
      return
    }
    setIndex(index - 1)
  }
  // handle Next
  const handleNext = () => {
    if (index === productsList.length - 1) {
      return
    }
    setIndex(index + 1)
  }

  // handleIndex
  const handleIndex = (itemIndex) => {
    setIndex(itemIndex)
  }
  return (
    <Wrapper>
      <div
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
      >
        <button onClick={handlePrevious} className='btn' type='button'>
          Prev
        </button>
        {productsList?.map((item, itemIndex) => {
          return (
            <button
              onClick={() => handleIndex(itemIndex)}
              className={itemIndex === index ? 'btn active' : 'btn'}
              key={itemIndex}
            >
              {itemIndex + 1}
            </button>
          )
        })}
        <button onClick={handleNext} className='btn' type='button'>
          next
        </button>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  margin: 1rem;
  text-align: center;
  .active {
    background-color: var(--primary-8);
  }
`
export default Pagination
