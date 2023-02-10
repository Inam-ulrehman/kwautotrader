import React from 'react'
import styled from 'styled-components'

const url =
  'https://res.cloudinary.com/inam6530/video/upload/v1673612029/aryanaspa/Aryana_Spa_y2igcz.mp4'
const LandingPageVideo = () => {
  return (
    <Wrapper className='container'>
      <div
        className='video'
        dangerouslySetInnerHTML={{
          __html: `
        <video
          loop
          muted
          autoplay
          playsinline
          src="${url}"
          class=""
        />,
      `,
        }}
      ></div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  overflow: hidden;
  min-height: calc(100vh - 3.2rem);
  display: grid;
  .video {
    position: relative;
    width: 100vw;
  }

  video {
    overflow: hidden;
    width: 100%;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
  }
  @media (max-width: 768px) {
    min-height: 50vh;
  }
  @media (max-width: 500px) {
    min-height: 30vh;
  }
  @media (max-width: 400px) {
  }
`
export default LandingPageVideo
