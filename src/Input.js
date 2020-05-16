import React from "react";
import PropTypes from "prop-types";

/**
 * @function Input
 * @param  {Object} props - Props passed from parent component.
 * @returns {JSX.Element} - Jsx.
 */
const Input = ({ secretWord }) => {
  return (
    <div data-test="input-component">
      <div />
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
