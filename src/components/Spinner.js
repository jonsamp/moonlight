import React from 'react'

const Spinner = (props) => {
  const fill = props.fill || '#444444';
  const size = props.size || '50px';
  return (
    <div className='uil-ring-css' style={{
      boxShadow: `0 3px 0 0 ${fill}`,
      height: size,
      width: size,
      borderRadius: size
    }}>
      <div></div>
    </div>
  )
}

export default Spinner
