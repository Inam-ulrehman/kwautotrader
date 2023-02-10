import { useLoadScript } from '@react-google-maps/api'
import usePlacesAutocomplete, { getGeocode } from 'use-places-autocomplete'
import { useRef } from 'react'
import styled from 'styled-components'

// This is outcome from address

const GooglePlacesHook = ({ state, setState }) => {
  // Load your script first
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // library is must
    libraries: ['places'],
  })

  if (!isLoaded) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <>
      <div className='places-container'>
        <PlacesAutocomplete state={state} setState={setState} />
      </div>
    </>
  )
}
// We have this approach because this component must load after isLoaded useLoadScript
const PlacesAutocomplete = ({ state, setState }) => {
  const inputWithRef = useRef()
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
      componentRestrictions: { country: ['ca'] },
    },
    debounce: 300,
  })

  const handleSelect = async (address) => {
    setValue(address, false)
    clearSuggestions()

    const results = await getGeocode({ address })
    // This code below is only get useful values and put in state it has nothing to do with functionality.

    // state code=======Start
    const addressDetails = results[0]
    const { address_components } = addressDetails
    const length = address_components.length
    const startLength = address_components.length - 5
    // We Slice because last 5 values are important also some times array is not returning same values.
    const lastAddress = address_components.slice(startLength, length)
    setState({
      ...state,
      house: address_components[0]?.long_name,
      street: address_components[1]?.long_name,
      city: lastAddress[0]?.long_name,
      region: lastAddress[1]?.long_name,
      province: lastAddress[2]?.long_name,
      country: lastAddress[3]?.long_name,
      postalCode: lastAddress[4]?.long_name,
    })
  }
  // state code=======End
  return (
    <Wrapper>
      <label className='form-label' htmlFor='address'>
        Search your address
      </label>
      <input
        ref={inputWithRef}
        type='text'
        value={value?.target?.input}
        onChange={(e) => setValue(e.target.value)}
        className='form-input'
        placeholder='TYPE HERE'
        disabled={!ready}
      />
      {status === 'OK' && (
        <ul style={{ width: `${inputWithRef.current.clientWidth}px` }}>
          {data.map((item, index) => {
            return (
              <li key={index} onClick={() => handleSelect(item.description)}>
                {item.description}
              </li>
            )
          })}
        </ul>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  input {
    position: relative;
  }

  ul {
    position: absolute;
    background-color: var(--white);
    margin: 0;
    box-shadow: var(--shadow-2);

    li {
      padding: 5px 10px;

      :hover {
        cursor: pointer;
        background-color: var(--grey-1);
      }
    }
  }
`

export default GooglePlacesHook
