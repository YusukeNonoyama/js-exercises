import {useState} from 'react';

export default function Todo() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = text.trim();
    if (trimmed === '') return;

    // todosを更新
    setTodos([
      {
        // アイテム名称の重複は許しているから適当なIDを設定
        id: crypto.randomUUID(),
        name: trimmed,
        completed: false,
      },
      ...todos,
    ]);

    // todoを更新したらtextはデフォルトに戻す
    setText('');
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
      {/* Todoコンポーネントで定義されたtodosのトグル更新を含める */}
      <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
      <label
        style={{
          textDecorationLine: todo.completed ? 'line-through' : 'none',
        }}
      >
        {todo.name}
      </label>
      {/* Todoコンポーネントで定義されたtodosの削除を含める */}
      <button onClick={() => onDelete(todo.id)}>❌</button>
    </li>
  );
}
