import React from "react";
import "./App.css";
import hookActions from "./actions/hookActions";
import Input from "./Input";

/**
 * @function reducer - Function to update state based on the action argumnent type.
 * @param  {Object} state - The Initial State.
 * @param  {Object} action - The action we dispatch to update the state. Contains 'type' and 'payload'
 *                           properties. e.g. {type: "setSecretWord", payload: "party"}
 * @returns {Object} - The updated state.
 */
const reducer = (state, action) => {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };

    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

/**
 * @function App
 * @returns {JSX.Element} - Jsx.
 */

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, { secretWord: null });

  const setSecretWord = (secretWord) => {
    dispatch({ type: "setSecretWord", payload: secretWord });
  };

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  return !state.secretWord ? (
    <div className="container" data-test="spinner">
      <div className="spinner-border" role="status">
        <span className="sr-only">loading...</span>
      </div>
      <p>Loading secret word.</p>
    </div>
  ) : (
    <div data-test="app-component" className="container">
      <Input secretWord={state.secretWord} />
    </div>
  );
};

export default App;
