import React from "react";
import { shallow } from "enzyme";
import { checkElement, checkProps } from "../test/testUtils";
import Input from "./Input";
/**
 * @param  {String} secretWord="party"
 * @returns {ShallowWrapper}
 */
const setup = (secretWord = "party") => {
  return shallow(<Input secretWord={secretWord} />);
};

describe("Input component", () => {
  test("Renders without crashing", () => {
    const wrapper = setup();
    checkElement(wrapper, "input-component");
  });

  test("has correct prop type for secretWord", () => {
    const initialState = { secretWord: "party" };
    checkProps(Input, initialState);
  });
});

describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  beforeEach(() => {
    // Create a mock function for the setCurrentGuess function that updates the state.
    mockSetCurrentGuess.mockClear();

    // Set up useState using React, it is a function that accepts one parameter and returns an array of two items: The initial State and a function to update it. So we make it a mock function that takes in an anonymous function and returns an Array with the same items, initial state and function.
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

    // So we then setup a wrapper with our shallow wrapper method/
    wrapper = setup();
  });
  test("state updates with value of input box", () => {
    // we find the input box
    const inputBox = wrapper.find("[data-test='input-box']");

    // create a mock event to apply to the input.
    const mockEvent = { target: { value: "party" } };

    // simulate a change listener and apply the mock event target to the simulation.
    inputBox.simulate("change", mockEvent);

    // we expect the state update function to have been called with the right value of train.
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("party");
  });

  test("state is cleared on button click", () => {
    const button = wrapper.find("[data-test='submit-button']");

    // simulate a button click and add a dummy preventDefault function so no error is thrown.
    button.simulate("click", { preventDefault() {} });

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});
