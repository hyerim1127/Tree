// Button.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './button.css';
const Button = ({ onClick, label, style }) => {
  return (
    <button className="btn-mod-del" onClick={onClick} style={style}>
      {label}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  style: PropTypes.object
};

export default Button;