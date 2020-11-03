import React, { useCallback } from "react";
import { useDispatch } from "../store";
import { completeTodo, removeTodo } from "../store/todos/actions";
import './Todo.css';

export default function Todo({ id, text, completed }) {
  const dispatch = useDispatch();
  const handleRemoveTodo = useCallback(() => dispatch(removeTodo(id)), [dispatch, id]);
  const handleCompleteTodo = useCallback(() => dispatch(completeTodo(id)), [dispatch, id]);

  return (
    <li className="todo">
      <input className="todo-complete-checkbox" type="checkbox" value={completed} onChange={handleCompleteTodo} /> {text}{" "}
      <button className="btn btn--remove-todo" onClick={handleRemoveTodo}>x</button>
    </li>
  );
}
