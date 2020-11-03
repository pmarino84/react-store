import createStore from "@pm/reactjs-store/build";
import rootReducer from "./rootReducer";

export const {
  Provider,
  Consumer,
  useStore,
  useSelector,
  useDispatch
} = createStore(rootReducer);

export const useTodosSelector = () => useSelector(state => state.todos);