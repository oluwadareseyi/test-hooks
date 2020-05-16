import React from "react";
import { shallow } from "enzyme";
import { checkElement } from "../test/testUtils";
import Input from "./Input";

const setup = (initialState = {}) => {
  return shallow(<Input {...initialState} />);
};

describe("Input component", () => {
  test("Renders without crashing", () => {
    const wrapper = setup();
    checkElement(wrapper, "input-component");
  });
});
