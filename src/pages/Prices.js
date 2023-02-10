import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Category } from '../components/prices'

const Prices = () => {
  const { initialProductList: products } = useSelector((state) => state.product)

  const uniqueValues = (product, value) => {
    const result = products
      .map((item) => item[value])
      .filter((item) => item !== '')
    return [...new Set(result)]
  }
  const category = uniqueValues(products, 'category')

  return (
    <Wrapper>
      <Helmet>
        <title>Prices</title>
        <meta name='description' content='Price List of our products.' />
        <link rel='canonical' href='/about' />
      </Helmet>
      <div className='h1'>
        <h1 className='title'>Product's Price list</h1>
      </div>
      <div className='title-underline'></div>
      {category.map((item, index) => {
        return (
          <div className='container' key={index}>
            <div className='title header'> {item}</div>

            <Category category={item} products={products} />
          </div>
        )
      })}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: grid;
  .h1 {
    background-color: var(--grey-2);
    h1 {
      font-size: 2rem;
      margin-top: 0px;
      color: var(--grey-5);
    }
  }
  .container {
    margin: 1rem;
    background-color: var(--grey-2);
    box-shadow: var(--shadow-2);
    border-radius: var(--radius);
    color: var(--grey-6);

    .header {
      text-transform: uppercase;
      font-size: 1.2rem;
      margin-bottom: 10;
    }
  }

  @media (max-width: 792px) {
    grid-template-columns: 1fr;
  }
`
export default Prices
