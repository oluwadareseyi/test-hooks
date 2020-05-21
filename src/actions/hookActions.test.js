import moxios from "moxios";
import { getSecretWord } from "./hookActions";

describe("moxios tests", () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  test("calls getSecetWord call back on axios response", async () => {
    const secretWord = "party";

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord,
      });
    });

    // create a mock function for setSecretWord and pass it to getSecretWord.
    const mockSetSecretWord = jest.fn();

    await getSecretWord(mockSetSecretWord);

    // check if the mock function is called with the secretWord recieved.

    expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord);
  });
});
