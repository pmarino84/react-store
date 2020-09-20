import React, { createContext, useContext, useReducer } from 'react'
import { STORE_INIT } from './constants'
import createAction from './createAction'

const storeInitAction = createAction(STORE_INIT)

const makeUseStore = Store => () => useContext(Store)

const makeUseStoreSelector = useStore => (selector) => {
  const [state, dispatch] = useStore()
  return [selector(state), dispatch]
}

const makeUseOnlyState = useStore => () => useStore()[0]

const makeUseOnlyDispatch = useStore => () => useStore()[1]

const createProvider = (Store, reducer, initialState) => ({ children }) => {
  const initializer = initialArgs => reducer(initialArgs, storeInitAction())
  return <Store.Provider value={useReducer(reducer, initialState, initializer)}>{children}</Store.Provider>
  // return <Store.Provider value={initialState ? useReducer(reducer, initialState) : useReducer(reducer, undefined, initializer)}>{children}</Store.Provider>
}

export default function createStore(reducer, initialState /* optional */) {
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
