import handlerTypeToActionTypes from './utils/handlerTypeToActionTypes'

function handlersToReducer(handlers) {
  const keys = Object.keys(handlers)
  const reducers = keys.reduce((map, key) => {
    const actionTypes = handlerTypeToActionTypes(key)
    actionTypes.forEach(type => map[type] = handlers[key])
    return map
  }, {})
  return (state, action, globalState) => {
    const reducer = reducers[action.type]
    return reducer ? reducer(state, action, globalState) : state
  }
}

export default function handleActions(handlers /* Map<actionTypes, handler> */, defaultState) {
  const reducer = handlersToReducer(handlers)
  return (state = defaultState, action, globalState) => reducer(state, action, globalState)
}
