import React, { createContext, useContext, useReducer } from 'react'

export const createAction = type => payload => ({ type, payload })

export const STORE_INIT = '@@STORE_INIT'

export const storeInitAction = createAction(STORE_INIT)

export const combineReducers = (reducers /* Map<key, reducer> */) => (state, action) => {
  let newState = {}
  for (let key in reducers) {
    let reducer = reducers[key]
    const part = state && state[key]
    newState[key] = reducer(part, action)
  }
  console.log("NEW STATE: ", newState)
  return newState
}

const makeUseStore = Store => () => useContext(Store)

const makeUseState = Store => () => {
  const { state } = useContext(Store)
  return state
}

const makeUseDispatch = Store => () => {
  const { dispatch } = useContext(Store)
  return dispatch
}

/* const makeDispatchAction = Store => action => {
  const { dispatch } = useContext(Store)
  dispatch(action)
} */

function useInitializer(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState, initialArgs => reducer(initialArgs, storeInitAction()))
  return { state, dispatch }
}

const createProvider = (Store, reducer, initialState) => ({ children }) => {
  return <Store.Provider value={useInitializer(reducer, initialState)}>{children}</Store.Provider>
}

export default function createStore(reducer, initialState) {
  const Store = createContext()
  const StoreProvider = createProvider(Store, reducer, initialState)
  const useStore = makeUseStore(Store)
  const useOnlyState = makeUseState(Store)
  const useOnlyDispatch = makeUseDispatch(Store)
  // const dispatchAction = makeDispatchAction(Store)
  return {
    Store,
    StoreProvider,
    useStore,
    useOnlyState,
    useOnlyDispatch
    // dispatchAction
  }
}
