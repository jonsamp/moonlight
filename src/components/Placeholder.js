import React from 'react';

const Placeholder = (props) => (
  <span className="placeholder">{props.text || 'Not Available'}</span>
  );

export default Placeholder;
