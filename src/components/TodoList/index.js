import React, { useState, useEffect } from "react";

import TodoForm from "../TodoForm";

export default function TodoList(props) {
  const { todos, isSearch, onDelete, onUpdate, onDeleteBulk, onSeach } = props;
  const [checkedItems, setCheckedItems] = useState([]);
  const [idSelected, setIdSelected] = useState("");
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (!isSearch) {
      setSearchValue('')
    }
  }, [isSearch])

  const handleChange = (e) => {
    const { value } = e.target;
    const temp = [...checkedItems];
    const index = temp.findIndex((item) => item === value);

    if (index === -1) {
      temp.push(value);
    } else {
      temp.splice(index, 1);
    }

    setCheckedItems(temp);
  };

  const handleChangeIdSelected = (id) => {
    setIdSelected(id !== idSelected ? id : "");
  };

  const onUpdateTodo = (payload) => {
    onUpdate({
      ...payload,
      id: idSelected
    });
    setIdSelected("");
  };

  const handleDeleteBulk = () => {
    onDeleteBulk(checkedItems)
    setCheckedItems([])
  }

  const handleChangeSearch = (e) => {
    onSeach(e.target.value)
    setSearchValue(e.target.value)
  }

  return (
    <div>
      <div className="form-control__wrap">
        <input
            placeholder="Search ..."
            type="string"
            required
            value={searchValue}
            onChange={handleChangeSearch}
          />
      </div>

      <ul className="todo__list">
        {todos.map((todo) => (
          <li className="todo__item" key={todo.id}>
            <div className="d-sm-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="checkbox-custom">
                  <input
                    hidden
                    type="checkbox"
                    id={todo.id}
                    value={todo.id}
                    onChange={handleChange}
                  />
                  <label htmlFor={todo.id}>checkbox</label>
                </div>
                <div>{todo.name}</div>
              </div>
              <div className="todo__item-action">
                <button
                  className="btn btn--primary mr-10"
                  onClick={() => handleChangeIdSelected(todo.id)}
                >
                  Detail
                </button>
                <button
                  className="btn btn--danger"
                  onClick={() => onDelete(todo.id)}
                >
                  Remove
                </button>
              </div>
            </div>

            {idSelected === todo.id && (
              <TodoForm
                todo={todo}
                onSubmit={() => {}}
                onUpdate={onUpdateTodo}
              />
            )}
          </li>
        ))}
      </ul>

      {!!checkedItems.length && (
        <div className="d-flex align-items-center justify-content-between bulk-action__wrap">
          <div>Bulk Action</div>

          <div>
            <button className="btn btn--primary mr-10" disabled>
              Done
            </button>
            <button className="btn btn--danger" onClick={() => handleDeleteBulk()}>Remove</button>
          </div>
        </div>
      )}
    </div>
  );
}
