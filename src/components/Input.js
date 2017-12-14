import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOnBlur(e) {
    e.target.classList.remove('selected');
  }

  handleOnClick(e) {
    e.target.classList.add('selected');
  }

  handleOnChange(e) {
    const classList = e.target.classList;
    const hasText = e.target.value;

    hasText ? classList.add('has-text') : classList.remove('has-text');
  }


  render() {
    const {
      animate = true,
      label,
      maxLength,
      name,
      pattern,
      size,
      title,
      type = 'text'
    } = this.props;

    return (
      <div className="input-wrapper form-item">
        <input
          animate={animate}
          maxLength={maxLength}
          name={name}
          onBlur={this.handleOnBlur.bind(this)}
          onChange={this.handleOnChange.bind(this)}
          onClick={this.handleOnClick.bind(this)}
          pattern={pattern}
          placeholder={!animate ? label : null}
          size={size}
          title={title}
          type={type}
        />

        {animate &&
          <label className="input-label">{label}</label>
        }
      </div>
    );
  }
}

Input.propTypes = {
  animate: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  pattern: PropTypes.string,
  size: PropTypes.number,
  title: PropTypes.string,
  type: PropTypes.string
};

export default Input;