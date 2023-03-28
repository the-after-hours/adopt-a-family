import React from 'react';

const Select = (props) => (
  <select name={props.name}>
    <option value="donator">Donator</option>
    <option value="family">Family</option>
    <option value="organizer">Organizer</option>
  </select>
);

export default Select;
