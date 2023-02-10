import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import ScrollHook from './ScrollHook'

const PaginationHook = ({ page, count, limit, next, prev, index }) => {
  const dispatch = useDispatch()

  const totalPages = Math.ceil(count / limit)
  const pagesArray = Array.from({ length: totalPages }, (v, i) => i + 1)

  // handle buttons

  const handleNext = (e) => {
    if (pagesArray.length <= page) {
      return
    }
    dispatch(next())
    ScrollHook()
  }

  const handleIndex = (e) => {
    dispatch(index(e.target.value))
    ScrollHook()
  }

  const handlePrev = (e) => {
    if (page <= 1) {
      return
    }
    dispatch(prev())
    ScrollHook()
  }
  if (count <= 9) {
    return
  }

  return (
    <Wrapper className='title'>
      <button className='btn prev' type='button' onClick={handlePrev}>
        Prev
      </button>
      {/* Page Pagination */}
      {page > 1 && (
        <>
          <button className='btn' onClick={handleIndex} value={1}>
            1
          </button>
        </>
      )}

      {pagesArray
        .map((item, index) => {
          return (
            <button
              key={index}
              className={Number(page) === index + 1 ? `btn active` : 'btn'}
              type='button'
              onClick={handleIndex}
              value={item}
            >
              {item}
            </button>
          )
        })
        .slice(page - 1, page + 4)}
      {page !== pagesArray.length && (
        <>
          <button
            className='btn'
            onClick={handleIndex}
            value={pagesArray.length}
          >
            {pagesArray.length}
          </button>
        </>
      )}
      <button className='btn next' type='button' onClick={handleNext}>
        Next
      </button>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .active {
    background-color: var(--primary-8);
  }
  .prev,
  .next {
    margin: 1rem 5px;
  }
  .btn {
    border-radius: 0;
  }
`
export default PaginationHook

// ======require props======

// pages , count , limit

// =====require functions====

// handleNext() , handleIndex() , handlePrev()
