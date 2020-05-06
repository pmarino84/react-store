import React, { createContext, useContext, useReducer } from 'react'

export const createAction = type => payload => ({ type, payload })

export const STORE_INIT = '@@STORE_INIT'

export const storeInitAction = createAction(STORE_INIT)

export const combineReducers = (reducers /* Map<key, reducer> */) => (state, action) => {
  let newState = {}
  for (let key in reducers) {
    let reducer = reducers[key]
    const part = state && state[key]
    newState[key] = reducer(part, action, state)
  }
  /* TODO: temporaneo per gli sviluppi */ if (process.env.NODE_ENV === 'development') console.log("NEW STATE: ", newState)
  return newState
}

const makeUseStore = Store => () => useContext(Store)

const makeUseOnlyState = Store => () => useContext(Store)[0]

const makeUseOnlyDispatch = Store => () => useContext(Store)[1]

// const makeDispatchAction = Store => action => {
//   const { dispatch } = useContext(Store)
//   dispatch(action)
// }

const createProvider = (Store, reducer, initialState) => ({ children }) => {
  const init = initialArgs => reducer(initialArgs, storeInitAction())
  return <Store.Provider value={useReducer(reducer, initialState, init)}>{children}</Store.Provider>
}

export default function createStore(reducer, initialState) {
  const Store = createContext()
  const StoreProvider = createProvider(Store, reducer, initialState)
  const useStore = makeUseStore(Store)
  const useOnlyState = makeUseOnlyState(Store)
  const useOnlyDispatch = makeUseOnlyDispatch(Store)
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
