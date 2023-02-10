import React from 'react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import List from '../../components/product/List'
import Pagination from '../../components/product/Pagination'
import ProductCategory from '../../components/product/ProductCategory'
import Search from '../../components/product/Search'
import { getAllProductsThunk } from '../../features/product/productSlice'
const Products = () => {
  const dispatch = useDispatch()
  const { product } = useSelector((state) => state)
  const { searchTitle, searchCategory, page, limit, count, sort, feature } =
    product

  // ==== handle Category button

  useEffect(() => {
    dispatch(
      getAllProductsThunk({
        searchTitle,
        searchCategory,
        page,
        limit,
        count,
        sort,
        feature,
      })
    )
    // eslint-disable-next-line
  }, [searchCategory, searchTitle, page, limit, count, sort, feature])
  return (
    <Wrapper>
      <Helmet>
        <title>Products</title>
        <meta
          name='description'
          content='Shop online thousands of products. '
        />
        <link rel='canonical' href='/product' />
      </Helmet>
      <ProductCategory />
      <div className='h1'>
        <h1 className='title'>Find your favorite product</h1>
        <div className='title-underline'></div>
      </div>
      <Search />
      <List />
      <Pagination />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: calc(100vh - 61px);
  .h1 {
    margin-bottom: 5px;
    margin-top: -18px;
    background-color: var(--grey-2);
    h1 {
      margin-top: 0px;
      font-size: 2rem;
      color: var(--grey-5);
    }
  }
  /* ====Product */
  .product-holder {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .btn {
    background: var(--primary-8);
    :hover {
      background: var(--primary-5);
    }
  }
  .active {
    background: var(--primary-5);
  }
  @media (max-width: 600px) {
    .category-holder {
      padding-right: 0rem;
    }
  }
`
export default Products
