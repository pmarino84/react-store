import React, { createContext, useContext, useReducer } from 'react'
import { STORE_INIT } from './constants'
import createAction from './createAction'

const storeInitAction = createAction(STORE_INIT)

function createUseStoreSelector (useStore) {
  return function useStoreSelector (selector) {
    const [state, dispatch] = useStore();
    return [selector(state), dispatch];
  }
}

function createProvider (StoreProvider, reducer, initialState) {
  return function Provider({ children }) {
    const initializer = (initialArgs) =>
      reducer(initialArgs, storeInitAction());
    return (
      <StoreProvider value={useReducer(reducer, initialState, initializer)}>
        {children}
      </StoreProvider>
    )
  }
}

export default function createStore(reducer, initialState /* optional */) {
  const Store = createContext()
  const Provider = createProvider(Store.Provider, reducer, initialState)
  function useStore () { return useContext(Store) }
  function useDispatch () { return useStore()[1] }
  const useSelector = createUseStoreSelector(useStore)
  return {
    Provider,
    Consumer: Store.Consumer,
    useStore,
    useDispatch,
    useSelector: useSelector
  }
}
