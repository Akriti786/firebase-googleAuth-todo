import { useState } from "react";
import { useTodo } from "../context/TodoContext";

const TodoItem = ({ todo }) => {
  const {
    deleteTodo,
    toggleTodo,
    updateTodo,
  } = useTodo();

  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleUpdate = () => {
    updateTodo(todo.id, newTitle);
    setEditMode(false);
  };

  return (
    <div className="todo-item">
      {editMode ? (
        <>
          <input
            value={newTitle}
            onChange={(e) =>
              setNewTitle(e.target.value)
            }
          />

          <button onClick={handleUpdate}>
            Save
          </button>
        </>
      ) : (
        <>
          <span
            style={{
              textDecoration: todo.completed
                ? "line-through"
                : "none",
            }}
          >
            {todo.title}
          </span>

          <div>
            <button
              onClick={() =>
                toggleTodo(todo.id, todo.completed)
              }
            >
              ✓
            </button>

            <button
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>

            <button
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;