import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  return (
      <input
        maxlength={props.maxlength}
        size={props.size}
        placeholder={props.placeholder}
        type={props.type}
        pattern={props.pattern}
        title={props.title}
      />
    )
}

Input.propTypes = {
  maxlength: PropTypes.string,
  size: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  pattern: PropTypes.string,
  title: PropTypes.string
};

export default Input;