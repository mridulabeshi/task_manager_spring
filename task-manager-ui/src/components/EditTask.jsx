import { useState } from "react";

function EditTask({ task, onUpdate, onCancel }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onUpdate({ ...task, title: title.trim(), description: description.trim(), completed });
  };

  return (
    <div className="edit-task">
      <h3 style={{ marginBottom: "14px" }}>Edit task</h3>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional"
          />
        </div>

        <div className="field" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            id={`completed-${task.id}`}
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            style={{ width: "auto" }}
          />
          <label htmlFor={`completed-${task.id}`} style={{ marginBottom: 0 }}>
            Mark as completed
          </label>
        </div>

        <div className="edit-actions">
          <button type="submit" className="primary">Save</button>
          {onCancel && (
            <button type="button" onClick={onCancel}>Cancel</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EditTask;