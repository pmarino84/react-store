import combineReducers from "@pietro-marino/reactjs-store/combineReducers";
import todosReducer from "./todos/reducer";

const rootReducer = combineReducers({
  todos: todosReducer
});

export default rootReducer;
