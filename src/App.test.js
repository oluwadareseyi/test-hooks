import React from "react";
import { mount } from "enzyme";
import App from "./App";
import { checkElement } from "../test/testUtils";
import hookActions from "./actions/hookActions";

// create a mock globally for all the tests.
const mockGetSecretWord = jest.fn();
/**
 * @function setup
 * @param  {Object} initialState={} - The initial state we would like to test with.
 * @returns {ShallowWrapper} - THe component wrapper.
 */
const setup = (initialState = {}) => {
  // clear the mock function before any call to make sure we don't have a mock already running.
  mockGetSecretWord.mockClear();

  // replace the getSecretWord action with the mock.
  hookActions.getSecretWord = mockGetSecretWord;

  // use mount instead of shallow iuntil enzyme fixes the issue of useEffect not running on shallow     render.
  // https://github.com/enzymejs/enzyme/issues/2086
  return mount(<App {...initialState} />);
};

describe("app render", () => {
  test("renders without error", () => {
    const wrapper = setup();
    checkElement(wrapper, "app-component");
  });
});

describe("getSecretWord calls", () => {
  test("getSecretWord gets called on App mount", () => {
    // run the setup function, we don't even need to save an instance. We just run to mount the component.
    setup();

    // expect mockSecretWord to be called.
    expect(mockGetSecretWord).toHaveBeenCalled();
  });
});
