import handlerTypeToActionTypes from './utils/handlerTypeToActionTypes'

export default function handleAction(type, reducer, defaultState) {
  const actionTypes = handlerTypeToActionTypes(type)
  return (state = defaultState, action, globalState) => actionTypes.includes(action.type) ? reducer(state, action, globalState) : state
}
