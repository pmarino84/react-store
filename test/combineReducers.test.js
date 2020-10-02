import combineReducers from '../src/combineReducers'

describe('combineReducers', () => {
  test('return a function', () => {
    expect(combineReducers()).toEqual(expect.any(Function))
  })
  
  test('return a function', () => {
    const prevState = {}
    const action = { type: 'action', payload: 1 }
    const nextState = { one: { data: 1 } }
    const reducerOne = jest.fn((state, action) => ({ ...state, data: action.payload }))

    const rootReducer = combineReducers({ one: reducerOne })

    expect(rootReducer(prevState, action)).toEqual(expect.objectContaining(nextState))
  })
})