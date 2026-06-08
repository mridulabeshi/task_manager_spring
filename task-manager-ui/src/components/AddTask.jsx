import { useState } from "react";

function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      title,
      description,
      completed: false,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">
        Add Task
      </button>
    </form>
  );
}

export default AddTask;