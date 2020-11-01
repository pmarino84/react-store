import ArgumentsLengthError from '../src/errors/ArgumentsLengthError'
import handleActions from '../src/handleActions'

describe('handleActions', () => {
  test('throw error: You should pass 2 arguments', () => {
    expect(() => handleActions()).toThrowError('You should pass 2 arguments')
  })

  test('throw error: ArgumentsLengthError', () => {
    expect(() => handleActions()).toThrowError(ArgumentsLengthError);
  })

  test('return a function', () => {
    expect(handleActions({}, '')).toEqual(expect.any(Function))
  })
})