import React from 'react';

export function respectLineBreaks(input) {
  if (input) {
    return (
      <div>
        {input.split('\n').map((item, key) => (
          <span key={key}>
            {item}
            <br />
          </span>
          ))}
      </div>
    );
  }

  return null;
}
