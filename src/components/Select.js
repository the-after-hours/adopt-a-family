import React from 'react';
import PropTypes from 'prop-types';

import options from '../constants/options';

const Select = (props) => {
  const {menuType} = props;

  const dropdownItems = options[menuType].map(
    (optionItem) => {
      return (
        <option
          key={optionItem}
          name={optionItem}
          value={optionItem}
        >
          {optionItem}
        </option>
      );
    }
  );

  return <select>{ dropdownItems }</select>;
};

Select.propTypes = {
  optionItem: PropTypes.string,
  menuType: PropTypes.string.isRequired
};

export default Select;