import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { createContext, useContext, useReducer } from 'react';
export var createAction = function createAction(type) {
  return function (payload) {
    return {
      type: type,
      payload: payload
    };
  };
};
export var STORE_INIT = '@@STORE_INIT';
export var storeInitAction = createAction(STORE_INIT);
export var combineReducers = function combineReducers(reducers
/* Map<key, reducer> */
) {
  return function (state, action) {
    var newState = {};

    for (var key in reducers) {
      var reducer = reducers[key];
      var part = state && state[key];
      newState[key] = reducer(part, action, state);
    }
    /* TODO: temporaneo per gli sviluppi */


    if (process.env.NODE_ENV === 'development') console.log("NEW STATE: ", newState);
    return newState;
  };
};

var makeUseStore = function makeUseStore(Store) {
  return function () {
    return useContext(Store);
  };
};

var makeUseStoreSelector = function makeUseStoreSelector(useStore) {
  return function (selector) {
    var _useStore = useStore(),
        _useStore2 = _slicedToArray(_useStore, 2),
        state = _useStore2[0],
        dispatch = _useStore2[1];

    return [selector(state), dispatch];
  };
};

var makeUseOnlyState = function makeUseOnlyState(useStore) {
  return function () {
    return useStore()[0];
  };
};

var makeUseOnlyDispatch = function makeUseOnlyDispatch(useStore) {
  return function () {
    return useStore()[1];
  };
};

var createProvider = function createProvider(Store, reducer, initialState) {
  return function (_ref) {
    var children = _ref.children;

    var init = function init(initialArgs) {
      return reducer(initialArgs, storeInitAction());
    };

    return /*#__PURE__*/React.createElement(Store.Provider, {
      value: useReducer(reducer, initialState, init)
    }, children);
  };
};

export default function createStore(reducer, initialState) {
  var Store = createContext();
  var StoreProvider = createProvider(Store, reducer, initialState);
  var useStore = makeUseStore(Store);
  var useStoreSelector = makeUseStoreSelector(useStore);
  var useOnlyState = makeUseOnlyState(useStore);
  var useOnlyDispatch = makeUseOnlyDispatch(useStore);
  return {
    Store: Store,
    StoreProvider: StoreProvider,
    useStore: useStore,
    useStoreSelector: useStoreSelector,
    useOnlyState: useOnlyState,
    useOnlyDispatch: useOnlyDispatch
  };
}