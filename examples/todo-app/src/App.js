import React from "react";
import "./App.css";
import { Provider as StoreProvider } from "./store";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

function App() {
  return (
    <div className="todo-app">
      <StoreProvider>
        <header className="todo-app__header">
          <h1 className="todo-app__title">Yes another todo app</h1>
        </header>
        <main className="todo-app__main">
          <AddTodo />
          <TodoList />
        </main>
      </StoreProvider>
    </div>
  );
}

export default App;
