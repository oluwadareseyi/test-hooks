import React from "react";
import { mount } from "enzyme";
import App from "./App";
import { checkElement } from "../test/testUtils";
import hookActions from "./actions/hookActions";

// create a mock globally for all the tests.
const mockGetSecretWord = jest.fn();
/**
 * @function setup
 * @param {String} secretWord="party" - The desired secretWordState we want to test with.
 * @returns {ReactWrapper} - THe component wrapper.
 */
const setup = (secretWord) => {
  // clear the mock function before any call to make sure we don't have a mock already running.
  mockGetSecretWord.mockClear();

  // replace the getSecretWord action with the mock.
  hookActions.getSecretWord = mockGetSecretWord;

  // we mock the useReducer hook to have the secretWord as part of our test. Remeber thet useReducer returns an array with the state and a dispatch function. So we mock the return value with an array of those items.
  const mockUseReducer = jest.fn().mockReturnValue([{ secretWord }, jest.fn()]);

  // Replace the component's useReducer function with our mock.
  React.useReducer = mockUseReducer;

  // use mount instead of shallow iuntil enzyme fixes the issue of useEffect not running on shallow     render.
  // https://github.com/enzymejs/enzyme/issues/2086
  return mount(<App />);
};

describe("app render", () => {
  test("renders without error", () => {
    const wrapper = setup();
    checkElement(wrapper, "spinner");
  });
});

describe("getSecretWord calls", () => {
  test("getSecretWord gets called on App mount", () => {
    // run the setup function, we don't even need to save an instance. We just run to mount the component.
    setup();

    // expect mockSecretWord to be called.
    expect(mockGetSecretWord).toHaveBeenCalled();
  });

  test("secretWord does not update on app update", () => {
    const wrapper = setup();

    // clear the mock to reset the App component after initial mount.
    mockGetSecretWord.mockClear();
    wrapper.setProps();

    expect(mockGetSecretWord).not.toHaveBeenCalled();

    // const mockUseEffect = jest.fn();

    // React.useEffect = mockUseEffect;

    // mockUseEffect.mockClear();
    // wrapper.setProps();
  });
});

describe("secretWord not null", () => {
  let wrapper;

  beforeEach(() => (wrapper = setup("party")));

  test("renders app when secretWord not null", () => {
    const appComponent = wrapper.find("[data-test='app-component']");
    expect(appComponent.exists()).toBe(true);
  });

  test("does not render spinner when secretWors is not null", () => {
    const spinnerComponent = wrapper.find("[data-test='spinner']");
    expect(spinnerComponent.exists()).toBe(false);
  });
});

describe("secretWord is null", () => {
  let wrapper;

  beforeEach(() => (wrapper = setup(null)));

  test("renders spinner when secretWord is null", () => {
    const spinnerComponent = wrapper.find("[data-test='spinner']");
    expect(spinnerComponent.exists()).toBe(true);
  });

  test("does not render App component when secretWord is null", () => {
    const appComponent = wrapper.find("[data-test='app-component']");
    expect(appComponent.exists()).toBe(false);
  });
});
