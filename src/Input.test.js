import React from "react";
import { shallow } from "enzyme";
import { checkElement, checkProps } from "../test/testUtils";
import Input from "./Input";

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
