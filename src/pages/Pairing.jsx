// Page to connect familes with donators

import React from 'react';

const Pairing = (props) => (
  <div>
    <h1>Pairing page</h1>
    <p>A collection of potential people that you can pair with</p>
    <ul>
      <li>
        personA{' '}
        <span style={{ align: 'right', marginLeft: '3em' }}>
          <button>PAIR</button>
        </span>
      </li>
      <li>
        personB{' '}
        <span style={{ align: 'right', marginLeft: '3em' }}>
          <button>PAIR</button>
        </span>
      </li>
      <li>
        personC{' '}
        <span style={{ align: 'right', marginLeft: '3em' }}>
          <button>PAIR</button>
        </span>
      </li>
      <li>
        personD{' '}
        <span style={{ align: 'right', marginLeft: '3em' }}>
          <button>PAIR</button>
        </span>
      </li>
    </ul>
  </div>
);

export default Pairing;
