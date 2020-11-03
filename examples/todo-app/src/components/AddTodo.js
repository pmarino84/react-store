import React, { useCallback, useState } from "react";
import { useDispatch } from "../store";
import { addTodo } from "../store/todos/actions";
import createTodo from "../utils/createTodo";
import "./AddTodo.css";

export default function AddTodo() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleTextChange = useCallback(({ target }) => setText(target.value), []);

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();
    if (text) {
      const todoToAdd = createTodo(text);
      setText("");
      dispatch(addTodo(todoToAdd));
    }
  }, [dispatch, text]);

  return (
    <div className="add-todo-container">
      <form className="add-todo-form" onSubmit={handleSubmit}>
        <label className="add-todo-label" htmlFor="add-todo-text">new todo:</label>
        <input id="add-todo-text" className="add-todo-text" type="text" value={text} onChange={handleTextChange} />
        <input className="btn btn--add-todo" type="submit" value="+" />
      </form>
    </div>
  );
}
