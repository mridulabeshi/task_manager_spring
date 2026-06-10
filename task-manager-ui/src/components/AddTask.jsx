import { useState } from "react";

function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), description: description.trim(), completed: false });
    setTitle("");
    setDescription("");
  };

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="primary">+ Add</button>
    </form>
  );
}

export default AddTask;