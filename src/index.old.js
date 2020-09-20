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

const makeUseStoreSelector = useStore => (selector) => {
  const [state, dispatch] = useStore()
  return [selector(state), dispatch]
}

const makeUseOnlyState = useStore => () => useStore()[0]

const makeUseOnlyDispatch = useStore => () => useStore()[1]

const createProvider = (Store, reducer, initialState) => ({ children }) => {
  const init = initialArgs => reducer(initialArgs, storeInitAction())
  return <Store.Provider value={useReducer(reducer, initialState, init)}>{children}</Store.Provider>
}

export default function createStore(reducer, initialState) {
  const Store = createContext()
  const StoreProvider = createProvider(Store, reducer, initialState)
  const useStore = makeUseStore(Store)
  const useStoreSelector = makeUseStoreSelector(useStore)
  const useOnlyState = makeUseOnlyState(useStore)
  const useOnlyDispatch = makeUseOnlyDispatch(useStore)
  return {
    Store,
    StoreProvider,
    useStore,
    useStoreSelector,
    useOnlyState,
    useOnlyDispatch
  }
}
