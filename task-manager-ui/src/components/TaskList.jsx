function TaskList({ tasks, onDelete, onEdit, onToggle, editingId }) {
  if (tasks.length === 0) {
    return <div className="task-list-empty">No tasks yet — add one above.</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={[
            "task-item",
            task.completed ? "done" : "",
            editingId === task.id ? "editing" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <button
            className={`task-checkbox ${task.completed ? "checked" : ""}`}
            onClick={() => onToggle(task)}
            aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
            title={task.completed ? "Mark incomplete" : "Mark complete"}
          >
            {task.completed ? "✓" : ""}
          </button>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="task-title">{task.title}</div>
            {task.description && (
              <div className="task-description">{task.description}</div>
            )}
          </div>

          <span className={`priority-badge ${task.completed ? "low" : "medium"}`}>
            {task.completed ? "Done" : "Pending"}
          </span>

          <div className="task-actions">
            <button
              className="icon-btn"
              onClick={() => onEdit(task)}
              aria-label="Edit task"
              title="Edit"
            >
              ✎
            </button>
            <button
              className="icon-btn delete"
              onClick={() => onDelete(task.id)}
              aria-label="Delete task"
              title="Delete"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;