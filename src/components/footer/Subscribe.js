import { useRef } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'

const Subscribe = () => {
  const emailInput = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    let email = emailInput.current.value
    try {
      const result = await customFetch.post('/subscribeEmail', { email })
      toast.success(result.statusText)
      emailInput.current.value = ''
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.msg)
    }
  }

  return (
    <Wrapper className='boxDesign'>
      <div className='title'>News letter</div>
      <p>Receive updates on the latest news and Offers.</p>
      <form className='subscribe-form' onSubmit={handleSubmit}>
        <input type='text' ref={emailInput} />
        <button className='btn' type='submit'>
          Subscribe
        </button>
      </form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .title {
    font-size: 2rem;
  }
  p,
  h3 {
    padding: 0 1rem;
    margin: 0;
  }

  .subscribe-form {
    padding: 5px;
    input {
      cursor: pointer;
      border: transparent;
      padding: 4px;
      margin-right: 5px;
    }
  }
`
export default Subscribe
