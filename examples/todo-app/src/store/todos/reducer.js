import handleActions from "@pietro-marino/reactjs-store/handleActions";
import { ADD_TODO, COMPLETE_TODO, REMOVE_TODO } from "./actions";

function addTodo(state, action) {
  return [...state, action.payload];
}

function removeTodo(state, action) {
  return state.filter((todo) => todo.id !== action.payload);
}

function completeTodo(state, action) {
  const todoId = action.payload;
  return state.reduce((list, todo) => {
    const itemToInsert = { ...todo };
    if (todo.id === todoId) {
      itemToInsert.completed = true;
    }
    list.push(itemToInsert);
    return list;
  }, []);
}

const todosReducer = handleActions({
  [ADD_TODO]: addTodo,
  [REMOVE_TODO]: removeTodo,
  [COMPLETE_TODO]: completeTodo,
}, []);

export default todosReducer;
