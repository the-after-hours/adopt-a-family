import React from 'react';
import PropTypes from 'prop-types';

import options from '../constants/options';

const optionKeys = Object.keys(options);

const Select = (props) => {
  const {
    animate,
    form,
    label,
    menuType
  } = props;

  const dropdownItems = options[props.menuType].map(optionItem => {
    return (
      <option key={optionItem.toLowerCase()} value={optionItem.toLowerCase()}>
        {optionItem}
      </option>
    );
  });

  return (
    <div className="select-wrapper form-item">
      {animate &&
        <label className="input-label">{label}</label>
      }

      <select
        form={form}
        name={menuType}
      >
        {dropdownItems}
      </select>
    </div>
  );
};

Select.propTypes = {
  animate: PropTypes.bool,
  form: PropTypes.string,
  label: PropTypes.string,
  menuType: PropTypes.oneOfType([
    PropTypes.oneOf(optionKeys),
    PropTypes.string
  ]),
  optionItem: PropTypes.string
};

export default Select;