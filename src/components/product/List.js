import React from 'react'
import { useSelector } from 'react-redux'
import ProductDesign from './ProductDesign'

const List = () => {
  const { list, isLoading } = useSelector((state) => state.product)
  if (isLoading) {
    return (
      <div>
        <div className='title'>Loading...</div>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <div>
      <div className='product-holder'>
        {list.map((item, index) => {
          return <ProductDesign key={item._id} item={item} />
        })}
      </div>
    </div>
  )
}

export default List
