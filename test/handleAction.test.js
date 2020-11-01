import ArgumentsLengthError from '../src/errors/ArgumentsLengthError'
import ReducerShouldBeAFunctionError from '../src/errors/ReducerShouldBeAFunctionError'
import handleAction from '../src/handleAction'

describe('handleAction', () => {
  test('throw error: You should pass 3 arguments', () => {
    expect(() => handleAction()).toThrowError('You should pass 3 arguments')
  })

  test('throw error: ArgumentsLengthError', () => {
    expect(() => handleAction('azione', '')).toThrowError(ArgumentsLengthError);
  })

  test('throw error: ReducerShouldBeAFunctionError', () => {
    expect(() => handleAction('azione', '', '')).toThrowError(ReducerShouldBeAFunctionError)
  })

  test('return a function', () => {
    expect(handleAction('azione', () => {}, '')).toEqual(expect.any(Function))
  })
})