import React from "react";
import PropTypes from "prop-types";

/**
 * @function Input
 * @param  {Object} props - Props passed from parent component.
 * @returns {JSX.Element} - Jsx.
 */
const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState("");

  const submitHandler = () => {
    // TODO: update guessedWords
    // TODO: check against secretWord and update success if needed.
    // setCurrentGuess("");
  };
  return (
    <div data-test="input-component">
      <form className="form-inline">
        <input
          data-test="input-box"
          value={currentGuess}
          className="mb-2 mx-sm-3"
          type="text"
          placeholder="Enter guess"
          onChange={(e) => {
            setCurrentGuess(e.target.value);
          }}
        />
        <button
          data-test="submit-button"
          onClick={submitHandler}
          className="btn btn-primary mb-2"
          type="submit"
        >
          Submit Guess
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
