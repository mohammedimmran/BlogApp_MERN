import React from 'react'
import {css} from '@emotion/react'
import RiseLoader from 'react-spinners/CircleLoader'

const override = css`display: block; margin:20% auto ;border-color:blue;`;
function Loading() {
  return (
    <RiseLoader color='blue' loading={true} css={override}></RiseLoader>
  )
}

export default Loading