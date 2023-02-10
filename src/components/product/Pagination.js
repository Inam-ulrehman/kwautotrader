import React from 'react'
import { useSelector } from 'react-redux'
import { index, next, prev } from '../../features/product/productSlice'
import PaginationHook from '../../hooks/PaginationHook'

const Pagination = () => {
  const { page, count, limit } = useSelector((state) => state.product)

  return (
    <div>
      <PaginationHook
        page={page}
        count={count}
        limit={limit}
        prev={prev}
        next={next}
        index={index}
      />
    </div>
  )
}

export default Pagination
