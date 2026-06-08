import { useState } from "react";

function EditTask({ task, onUpdate }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(
    task.description
  );
  const [completed, setCompleted] = useState(
    task.completed
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdate({
      ...task,
      title,
      description,
      completed,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Task</h2>

      <input
        type="text"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <input
        type="text"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <label>
        Completed
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) =>
            setCompleted(e.target.checked)
          }
        />
      </label>

      <button type="submit">
        Update
      </button>
    </form>
  );
}

export default EditTask;