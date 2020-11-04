# reactjs-store

A modern, simple, useful and powerful [React.js](https://reactjs.org/) store made with [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext) and [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) like [reduxjs](https://redux.js.org/) with [redux-actions plugin](https://redux-actions.js.org/) support.

It is made to create a ready-to-go store in a moment by writing less code by calling just a createStore function.

Like redux the initial state is created by the reducers registered by you, the library call them with the `@@PM_REACT_STORE_INIT` action.

## Installation

Inside of your project install the library with the following command:

```bash
npm install --save @pm/reactjs-store
```

or

```bash
yarn add @pm/reactjs-store
```

## How to use

Create the actions with the `createAction` function, like this:

```javascript
import createAction from "@pm/reactjs-store/createAction";

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

export const increment = createAction(INCREMENT);
export const increment = createAction(DECREMENT);
```

Now, you have three method to create all reducer you need:

1. write it, for example:

  ```javascript
    const INITIAL_STATE = { value: 0 };

    export default function myReducer(state = INITIAL_STATE, action) {
      let newState = null;
      const payload = action.payload;
      switch(action.type) {
        case 'increment':
          newState = { value: state.value++ };
          break;
        case 'decrement':
          newState = { value: state.value-- };
          break;
        default:
          newState = state;
      }
      return newState;
    }
  ```

2. if the reducer only handles an action you can create it by calling the built-in function called `handleAction`:

  ```javascript
  import handleAction from "@pm/reactjs-store/handleAction";
  
  const INITIAL_STATE = { value: 0 };

  const myReducer = handleAction('increment', (state, action) => {
    return { value: state.value++ };
  }, INITIAL_STATE);

  export default myReducer;
  ```

3. to avoid using the switch you can use the `handleActions` function:

  ```javascript
  import handleActions from "@pm/reactjs-store/handleActions";
  
  const INITIAL_STATE = { value: 0 };
  
  function increment(state, action) {
    return { value: state.value++ };
  }

  function decrement(state, action) {
    return { value: state.value++ };
  }

  const myReducer = handleActions({
    'increment': increment,
    'decrement': decrement
  }, INITIAL_STATE);

  export default myReducer;
  ```

Finally, you can create the store and some utilities you need with `createStore` function.
This function create for you:

* the Provider component

* the Consumer component

* useStore hook to use state and the dispatcher within your functional component 

  ```javascript
  const [state, dispatch] = useStore();
  ```

* useSelector hook to extract a portion of the state

  ```javascript
  const [state, dispatch] = useSelector(state => state['key']);
  ```

* useDispatch hook to extract only the dispatcher from useStore, if help you

  ```javascript
  const dispatch = useDispatch();
  ```

So, with **only one line of code** you can create them all, like this:

```javascript
  import createStore from "@pm/reactjs-store";

  export const {
    Provider,
    Consumer,
    useStore,
    useSelector,
    useDispatch
  } = createStore(myReducer);
```

Last but not least, for example we use the store created above, in your application:

App.js

```javascript
import React from "react";
import { Provider } from "wherever you have created your store";

export default function App () {
  return (
    <Provider>
      <Counter />
    </Provider>
  );
}
```

Counter.js

```javascript
import React from "react";
import { useStore } from "wherever you have created your store";
import { increment, decrement } from "wherever you have created your actions";

export default function Counter () {
  const [state, dispatch] = useStore();
  const incrementCount = dispatch(increment());
  const decrementCount = dispatch(decrement());

  return (
    <div className="counter">
      <div>
        Count: <span>${state.value}</span>
      </div>
      <div className="counter-actions">
        <button onClick={incrementCount}>+</button>
        <button onClick={decrementCount}>-</button>
      </div>
    </div>
  );
}
```

## Advanced uses

You can combine actions to simplify the reducers:

```javascript
import handleActions from "@pm/reactjs-store/handleActions";
import combineActions from "@pm/reactjs-store/combineActions";

const INITIAL_STATE = { value: 0 };

function increment(state, action) {
  return { value: state.value++ };
}

function decrement(state, action) {
  return { value: state.value++ };
}

function reset(state, action) {
  return { value: 0 };
}

const myReducer = handleActions({
  'increment': increment,
  'decrement': decrement,
  [combineActions("reset", "setZero")]: reset
}, INITIAL_STATE);

export default myReducer;
```

Combine reducers to a root reducer, like this:

```javascript
import combineReducers from "@pm/reactjs-store/combineReducers";

const reducerOne = (state, action) => {};
const reducerTwo = (state, action) => {};
const reducerThree = (state, action) => {};

const rootReducer = combineReducers({
  'one': reducerOne,
  'two': reducertwo,
  'three': reducerThree
});

import createStore from "@pm/reactjs-store";

export const {
  Provider,
  Consumer,
  useStore,
  useSelector,
  useDispatch
} = createStore(myReducer);

// useful selectors
export const useOneSelector = () => useSelector(state => state['one']);
export const useTwoSelector = () => useSelector(state => state['two']);
export const useThreeSelector = () => useSelector(state => state['three']);
```

## Examples

Inside the [examples](./examples) folder you can find a [todo-app](./examples/todo-app) example that use this library.

## License

@pm/reactjs-store is [MIT licensed](./LICENSE).
