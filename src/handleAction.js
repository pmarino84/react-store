import ArgumentsLengthError from './errors/ArgumentsLengthError'
import ReducerShouldBeAFunctionError from './errors/ReducerShouldBeAFunctionError'
import splitActionType from './utils/splitActionType'

export default function handleAction(type, reducer, defaultState) {
  if(arguments.length !== 3) throw new ArgumentsLengthError(3)
  if(typeof reducer !== 'function') throw new ReducerShouldBeAFunctionError()
  const actionTypes = splitActionType(type)
  return (state = defaultState, action) => actionTypes.includes(action.type) ? reducer(state, action) : state
}
