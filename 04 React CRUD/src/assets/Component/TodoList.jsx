import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TodoList = () => {
  const [todos, setTodo] = useState([{ task: "", id: uuidv4() }]);
  const [currTask, setCurrTask] = useState("");
  const [editId, setEditId] = useState(null);

  function addNewTask() {
    if (editId) {
      setTodo((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editId ? { ...todo, task: currTask } : todo
        )
      );
      setEditId(null);
    } else {
      setTodo([...todos, { task: currTask, id: uuidv4() }]);
    }
    setCurrTask("");
  }
  function deleteTodo(id) {
    // console.log(id);
    setTodo((prevTodos) => todos.filter((prevTodos) => prevTodos.id != id));
  }
  function EditTodo(id) {
    const TaskEdit = todos.find((task) => task.id === id);
    if (TaskEdit) {
      setCurrTask(TaskEdit.task);
      setEditId(id);
    }
  }

  return (
    <div>
      <input
        type="text"
        id="task-inp"
        placeholder="Add a task"
        value={currTask}
        onChange={(e) => {
          setCurrTask(e.target.value);
        //   console.log(e.target.value);
        }}
      />
      <br />
      <br />
      <button id="add-btn" onClick={addNewTask}>
        Add task
      </button>

      <br />
      <br />
      <hr />
      <h4>Task Todo</h4>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.task}</span> <br />
            <button
              onClick={() => {
                EditTodo(todo.id);
              }}
            >
              Edit
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
