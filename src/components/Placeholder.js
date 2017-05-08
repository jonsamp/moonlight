import React from 'react';

const Placeholder = (props) => {
  return (
    <p className="placeholder">{props.text || 'Not Available'}</p>
  );
};

export default Placeholder;
