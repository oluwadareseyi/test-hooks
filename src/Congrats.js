import React from "react";
import PropTypes from "prop-types";

/**
 * Functional react component for congrtulatory message
 * @function Congrats
 * @param {object} props - React Props
 * @returns {JSX.Element} - Rendered Component
 */

const Congrats = ({ success, giveUp }) => {
  return success ? (
    <div data-test="component-congrats" className="alert alert-success">
      <span data-test="congrats-message">
        Congratulations!! You guessed the word!!
      </span>
    </div>
  ) : (
    <div data-test="component-congrats"></div>
  );
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default Congrats;
