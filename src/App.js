import React, { useState, useEffect } from "react";
import debounce from "lodash/debounce";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    const currentTodos = localStorage.getItem("todos");

    if (currentTodos) {
      setTodos(JSON.parse(currentTodos));
    }
  }, []);

  const localTodos = () => {
    const localTodos = localStorage.getItem("todos");
    return JSON.parse(localTodos);
  };

  const handleAddTask = (payload) => {
    const id = new Date().getTime();
    const tempTodos = [...localTodos()];

    tempTodos.push({
      ...payload,
      id: id,
    });

    setIsSearch(false);
    setTodos(tempTodos);
    localStorage.setItem("todos", JSON.stringify(tempTodos));
  };

  const handleUpdateTask = (payload) => {
    const tempTodos = [...localTodos()];
    const index = tempTodos.findIndex((todo) => todo.id === payload.id);

    if (index !== -1) {
      tempTodos[index] = {
        ...payload,
      };
    }

    setIsSearch(false);
    setTodos(tempTodos);
    localStorage.setItem("todos", JSON.stringify(tempTodos));
  };

  const handleDeleteTask = (id) => {
    const tempTodos = [...localTodos()];
    const newTodos = tempTodos.filter((todo) => todo.id !== id);

    setIsSearch(false);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleDeleteBulk = (listId) => {
    let tempTodos = [...localTodos()];

    listId.forEach((id) => {
      tempTodos = tempTodos.filter(
        (todo) => todo.id.toString() !== id.toString()
      );
    });

    setIsSearch(false);
    setTodos(tempTodos);
    localStorage.setItem("todos", JSON.stringify(tempTodos));
  };

  const handleSortTodos = () => {
    let tempTodos = [...todos];

    if (!tempTodos.length) return tempTodos;

    return tempTodos.sort(function (a, b) {
      return new Date(a.due_date) - new Date(b.due_date);
    });
  };

  const handleSearch = debounce((value) => {
    const localTodos = localStorage.getItem("todos");
    let tempTodos = [...todos];

    setIsSearch(true);

    if (value) {
      tempTodos = tempTodos.filter((todo) =>
        todo.name.toLowerCase().includes(value.toLowerCase())
      );
      setTodos(tempTodos);
    } else {
      setTodos(JSON.parse(localTodos));
    }
  }, 500);

  return (
    <div className="page__wrap">
      <div className="page__content">
        <div className="page__content--left">
          <div className="page__content-wrap">
            <h3 className="text-center">New Task</h3>
            <TodoForm onSubmit={handleAddTask} />
          </div>
        </div>

        <div className="page__content--right">
          <div className="page__content-wrap">
            <h3 className="text-center">ToDo List</h3>
            <TodoList
              todos={handleSortTodos()}
              onDelete={handleDeleteTask}
              onUpdate={handleUpdateTask}
              onDeleteBulk={handleDeleteBulk}
              onSeach={handleSearch}
              isSearch={isSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
