import React from 'react';

const Input = (props) => (
  <input
    maxLength={props.maxlength}
    size={props.size}
    placeholder={props.placeholder}
    type={props.type}
    pattern={props.pattern}
    title={props.title}
    name={props.name}
    onChange={props.onChange}
    className={props.className}
  />
);

export default Input;
