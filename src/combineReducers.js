const clone = (obj) => JSON.parse(JSON.stringify(obj))

const NODE_ENV = process.env.NODE_ENV

const LOG_MSG_PREFIX = '[@pm/reactjs-store] - '

/* Logga il messaggio passato solo nell'ambiente di sviluppo */
const devLog = (msg, obj) => (NODE_ENV === 'development') && console.log(LOG_MSG_PREFIX + msg, clone(obj))

export default function combineReducers(reducers /* Map<key, reducer> */) {
  return function combinedReducer(state, action) {
    devLog('handle action: ', clone(action))
    let newState = {}
    for (let key in reducers) {
      let reducer = reducers[key]
      const part = state && state[key]
      newState[key] = reducer(part, action)
    }
    devLog('new state: ', clone(newState))
    return newState
  }
}
