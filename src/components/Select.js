import React from 'react';
import PropTypes from 'prop-types';

const Select = (props) => (
  <select name={props.name} onChange={props.onChange}>
    <option value="donor">Donor</option>
    <option value="family">Family</option>
    <option value="organizer">Organizer</option>
  </select>
);

Select.propTypes = {
  name: PropTypes.string,
};

export default Select;
