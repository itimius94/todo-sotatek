import React, { useState, useEffect } from "react";
import moment from "moment";

const listPriority = ["low", "normal", "high"];

export default function TodoForm(props) {
  const { onSubmit, onUpdate, todo } = props;
  const [taskName, setTaskName] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState(moment().format("YYYY-MM-DD"));
  const [priority, setPriority] = useState("normal");

  useEffect(() => {
    if (todo) {
      setTaskName(todo.name);
      setDesc(todo.description);
      setDueDate(todo.due_date);
      setPriority(todo.priority);
    }
  }, [todo]);

  const handleChangeTaskName = (e) => {
    setTaskName(e.target.value);
  };

  const handleChangeDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleChangeDueDate = (e) => {
    setDueDate(e.target.value);
  };

  const handleChangePriority = (e) => {
    setPriority(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: taskName,
      description: desc,
      due_date: dueDate,
      priority: priority,
    };

    if (todo) {
      onUpdate(payload);
    } else {
      onSubmit(payload);
    }

    setTaskName("");
    setDesc("");
    setDueDate(moment().format("YYYY-MM-DD"));
    setPriority("normal");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control__wrap">
        <input
          placeholder="Add new task ..."
          type="string"
          required
          value={taskName}
          onChange={handleChangeTaskName}
        />
      </div>

      <div className="form-control__wrap">
        <label>Description</label>
        <textarea value={desc} onChange={handleChangeDesc} />
      </div>

      <div className="form-row">
        <div className="form-row--left">
          <div className="form-control__wrap">
            <label>Due date</label>
            <input
              type="date"
              required
              min={moment().format("YYYY-MM-DD")}
              value={dueDate}
              onChange={handleChangeDueDate}
            />
          </div>
        </div>

        <div className="form-row--right">
          <div className="form-control__wrap">
            <label>Priority</label>
            <select value={priority} onChange={handleChangePriority}>
              {listPriority.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button className="btn btn--block btn--success">
        {todo ? "Update" : "Add"}
      </button>
    </form>
  );
}
