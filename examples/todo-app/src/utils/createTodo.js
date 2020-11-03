import shortid from "shortid";

export default function createTodo(text, completed /* optional */) {
  return { id: shortid.generate(), text, completed: !!completed };
}
