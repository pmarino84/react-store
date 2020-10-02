import createAction from '../src/createAction'
import PayloadFactoryShouldBeAFunctionError from '../src/errors/PayloadFactoryShouldBeAFunctionError'
import ShouldGiveActionTypeError from '../src/errors/ShouldGiveActionTypeError'

describe('createAction', () => {
  test('throw error: Should give action type', () => {
    expect(() => createAction()).toThrowError('Should give action type')
  })

  test('throw error: ShouldGiveActionTypeError', () => {
    expect(() => createAction()).toThrowError(ShouldGiveActionTypeError)
  })

  test('throw error: PayloadFactoryShouldBeAFunctionError', () => {
    expect(() => createAction('azione', 3)).toThrowError(PayloadFactoryShouldBeAFunctionError)
  })

  test('return a function with only give action type', () => {
    expect(createAction('azione')).toEqual(expect.any(Function))
  })

  test('return a function with custom payload factory', () => {
    const payloadFactory = jest.fn()
    const action = createAction('azione', payloadFactory)
    action(10)
    expect(payloadFactory).toHaveBeenCalled()
  })

  test('result of the action call is defined', () => {
    const action = createAction('azione')
    expect(action(10)).toBeDefined()
  })

  test('call action "azione" with payload 10', () => {
    const action = createAction('azione')
    expect(action(10)).toEqual(expect.objectContaining({
      type: 'azione',
      payload: 10
    }))
  })
})