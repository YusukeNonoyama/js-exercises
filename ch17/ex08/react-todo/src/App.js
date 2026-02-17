import {useState} from 'react';

export default function Todo() {
  // state変数を定義（ToDoのId、インプットボックスのテキスト、ToDoのリスト）
  const [id, setId] = useState(0);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = text.trim();
    if (trimmed === '') return;

    // todosを追加
    setTodos([
      {
        id,
        name: trimmed,
        completed: false,
      },
      ...todos,
    ]);

    // todoを追加したらtextはデフォルトに戻す
    setText('');

    setId((id) => id + 1);
  }

  // トグル変更の関数を定義（あとでpropとして渡す）
  function toggleTodo(id) {
    setTodos(todos.map((todo) => (todo.id === id ? {...todo, completed: !todo.completed} : todo)));
  }

  // アイテム削除の関数を定義（あとでpropとして渡す）
  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <>
      <form id="new-todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={text}
          // textを入力内容に応じて更新
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul id="todo-list">
        {todos.map((todo) => (
          // TodoItemをレンダ
          <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
        ))}
      </ul>
    </>
  );
}

function TodoItem({todo, onToggle, onDelete}) {
  return (
    <li>
      <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
      <label
        style={{
          textDecorationLine: todo.completed ? 'line-through' : 'none',
        }}
      >
        {todo.name}
      </label>
      <button onClick={() => onDelete(todo.id)}>❌</button>
    </li>
  );
}
