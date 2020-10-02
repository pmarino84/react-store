import splitActionType from './utils/splitActionType'

function handlersToReducer(handlers) {
  const keys = Object.keys(handlers)
  const reducers = keys.reduce((map, key) => {
    const actionTypes = splitActionType(key)
    actionTypes.forEach(type => map[type] = handlers[key])
    return map
  }, {})
  return (state, action) => {
    const reducer = reducers[action.type]
    return reducer ? reducer(state, action) : state
  }
}

export default function handleActions(handlers /* Map<actionTypes, handler> */, defaultState) {
  const reducer = handlersToReducer(handlers)
  return (state = defaultState, action) => reducer(state, action)
}
