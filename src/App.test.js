import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import { checkElement } from "../test/testUtils";
/**
 * @function setup
 * @param  {Object} initialState={} - The initial state we would like to test with.
 * @returns {ShallowWrapper} - THe component wrapper.
 */
const setup = (initialState = {}) => {
  return shallow(<App {...initialState} />);
};

describe("app render", () => {
  test("renders without error", () => {
    const wrapper = setup();
    checkElement(wrapper, "app-component");
  });
});
