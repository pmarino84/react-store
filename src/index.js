import React, { createContext, useContext, useReducer } from 'react'
import { STORE_INIT } from './constants'
import createAction from './createAction'

const storeInitAction = createAction(STORE_INIT)

const makeUseStore = Store => () => useContext(Store)

const makeUseStoreSelector = useStore => (selector) => {
  const [state, dispatch] = useStore()
  return [selector(state), dispatch]
}

const makeUseDispatch = useStore => () => useStore()[1]

const createProvider = (StoreProvider, reducer, initialState) => ({ children }) => {
  const initializer = initialArgs => reducer(initialArgs, storeInitAction())
  return <StoreProvider value={useReducer(reducer, initialState, initializer)}>{children}</StoreProvider>
}

export default function createStore(reducer, initialState /* optional */) {
  const Store = createContext()
  const Provider = createProvider(Store.Provider, reducer, initialState)
  const useStore = makeUseStore(Store)
  const useStoreSelector = makeUseStoreSelector(useStore)
  const useDispatch = makeUseDispatch(useStore)
  return {
    // Store,
    Provider,
    Consumer: Store.Consumer,
    useStore,
    useSelector: useStoreSelector,
    useDispatch
  }
}
