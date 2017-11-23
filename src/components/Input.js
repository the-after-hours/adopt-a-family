import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: ''};
  }

  handleOnBlur(e) {
    this.setState({selected: ''});
  }

  handleOnClick(e) {
    this.setState({selected: 'selected'});
  }

  handleOnChange(e) {
    let state = Object.assign({}, this.state);

    console.log(state);
  }

  render() {
    const {
      animate = true,
      className = '',
      label,
      maxLength,
      name,
      pattern,
      size,
      title,
      type = 'text'
    } = this.props;

    console.log(className);
    // Need to figure out how to assign classes to input

    return (
      <div className="input-wrapper form-item">
        <span className="highlight" />
        <input
          animate={animate}
          className={this.state.selected}
          maxLength={maxLength}
          name={name}
          onClick={this.handleOnClick.bind(this)}
          onBlur={this.handleOnBlur.bind(this)}
          onChange={this.handleOnChange.bind(this)}
          pattern={pattern}
          placeholder={!animate ? label : null}
          size={size}
          title={title}
          type={type}
        />

        {animate &&
          <span className="input-label">{label}</span>
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

// Handle state too

export default Input;