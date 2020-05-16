import React from "react";
import { shallow } from "enzyme";
import GuessedWords from "./GuessedWords";
import { checkElement, checkProps } from "../test/testUtils";

const defaultProps = {
  guessedWords: [{ guessedWord: "train", letterMatchCount: 3 }],
};

/**
 * @function setup
 * @param  {Object=} props
 * @returns {ShallowWrapper}
 */

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessedWords {...setupProps} />);
};

test("proptypes doesn't throw an error", () => {
  checkProps(GuessedWords, defaultProps);
});

describe("if there are no words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });
  test("renders without error", () => {
    checkElement(wrapper, "component-guessed-words");
  });

  test("shows instruction to guess a word", () => {
    const instructions = wrapper.find("[data-test='guess-instructions']");
    expect(instructions.text().length).not.toBe(0);
  });
});

describe("if there are words guessed", () => {
  let wrapper;
  const guessedWords = [
    { guessedWord: "train", letterMatchCount: 3 },
    { guessedWord: "agile", letterMatchCount: 1 },
    { guessedWord: "party", letterMatchCount: 5 },
  ];
  beforeEach(() => {
    wrapper = setup({ guessedWords });
  });

  test("renders without error", () => {
    checkElement(wrapper, "component-guessed-words");
  });

  test("renders guessed words section", () => {
    checkElement(wrapper, "guessed-words");
  });

  test("correct number of guessed words", () => {
    const guessedWordNodes = wrapper.find("[data-test='guessed-word']");
    expect(guessedWordNodes.length).toBe(guessedWords.length);
  });
});
