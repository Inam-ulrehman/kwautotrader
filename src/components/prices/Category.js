import React from 'react'
import styled from 'styled-components'
import SubCategory from './SubCategory'

const Category = ({ category, products }) => {
  const filterSubCategory = products.filter(
    (item) => item.category === category
  )
  const data = filterSubCategory.map((item) => item.subCategory)
  const uniqueSubCategory = [...new Set(data)]
  return (
    <Wrapper>
      {uniqueSubCategory.map((item, index) => {
        return <SubCategory key={index} item={item} products={products} />
      })}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  @media (max-width: 792px) {
  }
`
export default Category
