import React from 'react'
import styled from 'styled-components'
import SubCategoryHolder from './SubCategoryHolder'

const SubCategory = ({ item, products }) => {
  const subCategoryProducts = products.filter(
    (items) => items.subCategory === item
  )

  return (
    <Wrapper>
      <div className='title-head title'>{item}</div>
      {/* sub category holder */}
      <SubCategoryHolder subCategoryProducts={subCategoryProducts} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .title-head {
    text-transform: capitalize;
    border-top: 2px solid var(--grey-2);
    margin-bottom: 0;
    color: var(--grey-5);
  }
`
export default SubCategory
