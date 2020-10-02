import splitActionType from './utils/splitActionType'

export default function handleAction(type, reducer, defaultState) {
  const actionTypes = splitActionType(type)
  return (state = defaultState, action) => actionTypes.includes(action.type) ? reducer(state, action) : state
}
