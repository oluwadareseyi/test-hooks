/**
 * @method getLetterMatchCount
 * @param  {String} guessedWord - Guessed Word
 * @param  {String} secretWord - Secret Word
 * @returns {Number} Number of letters matched
 */
export const getLetterMatchCount = (guessedWord, secretWord) => {
  const secretLetterSet = new Set(secretWord.split(""));
  const guessedLetterSet = new Set(guessedWord.split(""));
  return [...secretLetterSet].filter((letter) => guessedLetterSet.has(letter))
    .length;
};
