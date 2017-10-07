import React from 'react';
import PropTypes from 'prop-types';

const Select = (props) => {
  return (
    <select name={props.name}>
      <option value="donator">Donator</option>
      <option value="family">Family</option>
      <option value="organizer">Organizer</option>
    </select>
  );
};

Select.propTypes = {
  name: PropTypes.string
};

export default Select;