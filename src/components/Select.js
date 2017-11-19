import React from 'react';
import PropTypes from 'prop-types';

import options from '../constants/options';

const Select = props => {
  const dropdownItems = options[props.menuType].map(optionItem => {
    return (
      <option key={optionItem.toLowerCase()} value={optionItem.toLowerCase()}>
        {optionItem}
      </option>
    );
  });

  return (
    <select form={props.form} name={props.menuType}>
      {dropdownItems}
    </select>
  );
};

Select.propTypes = {
  form: PropTypes.string,
  menuType: PropTypes.string,
  optionItem: PropTypes.string
};

export default Select;