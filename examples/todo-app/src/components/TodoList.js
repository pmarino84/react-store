import React from 'react';
import { useTodosSelector } from '../store';
import Todo from './Todo';
import './TodoList.css';

export default function TodoList() {
  const [todos] = useTodosSelector();
  return (
    <ul className="todo-list">
      {todos && todos.map(todo => <Todo key={todo.id} {...todo} />)}
    </ul>
  )
}
